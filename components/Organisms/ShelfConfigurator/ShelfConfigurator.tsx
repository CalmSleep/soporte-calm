import React, { useEffect, useState, useRef } from "react";
import {
  ConfiguratorContainer,
  ControlsContainer,
  PersonalizedContainer,
} from "./styled";
import { ShelfConfiguratorProps, ShelfConfig, ShelfData } from "./types";
import {
  PlusModule,
  PlusModuleWhite,
  /*   PlusModuleWhite, */
  PreConfigIcon,
} from "./iconsEstanterias";
import ShelfModule from "@/components/Organisms/ShelfConfigurator/ShelfModule";
import HandleView from "@/components/Molecules/HandleView/HandleView";
import { generateConfigurations, updateModuleConfig } from "./utils";
import { onSendSlackMessage } from "@/state/user/userActions";
import { useDispatch } from "react-redux";
import { theme } from "@/utils/Theme";
import { toast } from "react-toastify";
import PreCombinations from "@/components/Molecules/PreCombinations/PreCombinations";
import { searchAttribute } from "@/utils/productsFunctios";

const nombresModulos = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];

const ShelfConfigurator: React.FC<ShelfConfiguratorProps> = ({
  setShelfConfigurations,
  shelfConfigurations,
  handlePreconfigView,
  children,
  openModuleId,
  setOpenModuleId,
  propsNames,
  addToCartEnabled,
  setShelfConfigChanged,
  isPreConfigModalOpen,
  setIsPreConfigModalOpen,
  setIsShelfConfigChanged,
}) => {
  const dispatch = useDispatch();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [shelfError, setShelfError] = useState(false);
  const hasInitialized = useRef(false);

  let arrValuesAttr = searchAttribute(children);

  useEffect(() => {
    if (
      hasInitialized.current ||
      !children?.length ||
      shelfConfigurations.length > 0
    ) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const altura = urlParams.get("altura");
    const configuracion = urlParams.get("configuracion");

    if (!altura || !configuracion) {
      hasInitialized.current = true;
      return;
    }

    const validAlturas = ["alta", "media", "baja"];
    const validConfiguraciones = ["estante", "cabinet", "nicho"];

    if (
      !validAlturas.includes(altura) ||
      !validConfiguraciones.includes(configuracion)
    ) {
      hasInitialized.current = true;
      return;
    }

    const matchingModule = children.find(
      (child) =>
        child.attributes?.[propsNames.alto] === altura &&
        child.attributes?.[propsNames.configuracion] === configuracion
    );

    if (matchingModule) {
      const newConfig = [
        {
          moduleId: 1,
          children: matchingModule,
          position: {
            row: 1,
            column: 1,
          },
        },
      ];

      setShelfConfigurations(newConfig);
      setShelfConfigChanged(true);
    }

    hasInitialized.current = true;
  }, [children, propsNames, setShelfConfigurations, setShelfConfigChanged]);

  const getHeightValue = (height: "alta" | "media" | "baja"): number => {
    switch (height) {
      case "alta":
        return 3;
      case "media":
        return 2;
      case "baja":
        return 1;
      default:
        return 0;
    }
  };

  const evaluateModulePosition = (
    shelf: ShelfData,
    prevModule: ShelfData | null,
    nextModule: ShelfData | null
  ): "base" | "extension" | "sanguchito" => {
    const moduleHeight = getHeightValue(
      shelf.children?.attributes[propsNames.alto] as "alta" | "media" | "baja"
    );
    const currentIndex = shelfConfigurations.indexOf(shelf);
    const isFirstModule = !prevModule;
    const isLastModule = !nextModule;

    if (shelfConfigurations.length === 1) {
      return "base";
    }

    if (shelfConfigurations.length === 2) {
      if (isFirstModule) {
        const nextHeight = getHeightValue(
          nextModule!.children?.attributes[propsNames.alto] as
            | "alta"
            | "media"
            | "baja"
        );
        return moduleHeight >= nextHeight ? "base" : "extension";
      }
      const prevHeight = getHeightValue(
        prevModule!.children?.attributes[propsNames.alto] as
          | "alta"
          | "media"
          | "baja"
      );
      return moduleHeight > prevHeight ? "base" : "extension";
    }

    const evaluateThreeModules = (startIndex: number) => {
      const firstHeight = getHeightValue(
        shelfConfigurations[startIndex].children?.attributes[
          propsNames.alto
        ] as "alta" | "media" | "baja"
      );
      const middleHeight = getHeightValue(
        shelfConfigurations[startIndex + 1].children?.attributes[
          propsNames.alto
        ] as "alta" | "media" | "baja"
      );
      const lastHeight = getHeightValue(
        shelfConfigurations[startIndex + 2].children?.attributes[
          propsNames.alto
        ] as "alta" | "media" | "baja"
      );

      if (currentIndex === startIndex + 1) {
        if (middleHeight < firstHeight && middleHeight < lastHeight) {
          return "sanguchito";
        }
        if (middleHeight > firstHeight && middleHeight > lastHeight) {
          return "base";
        }
        return "extension";
      }

      if (currentIndex === startIndex) {
        if (middleHeight < moduleHeight && middleHeight < lastHeight) {
          return "base";
        }
        if (middleHeight > moduleHeight && middleHeight > lastHeight) {
          return "extension";
        }
        if (moduleHeight === lastHeight) {
          return "base";
        }
        return moduleHeight > lastHeight ? "base" : "extension";
      }

      if (currentIndex === startIndex + 2) {
        if (middleHeight < firstHeight && middleHeight < moduleHeight) {
          return "base";
        }
        if (middleHeight > firstHeight && middleHeight > moduleHeight) {
          return "extension";
        }
        return moduleHeight > firstHeight ? "base" : "extension";
      }

      return "extension";
    };

    if (shelfConfigurations.length === 3) {
      return evaluateThreeModules(0);
    }

    if (shelfConfigurations.length === 4) {
      if (currentIndex === 3) {
        return "extension";
      }
      if (currentIndex < 3) {
        return evaluateThreeModules(0);
      }
    }

    if (shelfConfigurations.length === 5) {
      if (currentIndex === 3 || currentIndex === 4) {
        return "extension";
      }

      if (currentIndex < 3) {
        return evaluateThreeModules(0);
      }
    }

    return "extension";
  };

  const determineModulePosition = (
    shelfsConfigurations: ShelfData[]
  ): ShelfData[] => {
    const totalWalls = shelfsConfigurations.length + 1;

    const updatedConfigs = shelfsConfigurations.map((shelf, index) => {
      const prevModule = index > 0 ? shelfsConfigurations[index - 1] : null;
      const nextModule =
        index < shelfsConfigurations.length - 1
          ? shelfsConfigurations[index + 1]
          : null;

      const decidedPosition = evaluateModulePosition(
        shelf,
        prevModule,
        nextModule
      );

      const matchingChildren = children.find(
        (child) =>
          child.attributes[propsNames.posicion] === decidedPosition &&
          child.attributes[propsNames.configuracion] ===
            shelf.children.attributes[propsNames.configuracion] &&
          child.attributes[propsNames.alto] ===
            shelf.children.attributes[propsNames.alto]
      );

      if (!matchingChildren) {
        console.error(
          `No se encontró un children que coincida con: posicion=${decidedPosition}, configuracion=${
            shelf.children.attributes[propsNames.configuracion]
          }, alto=${shelf.children.attributes[propsNames.alto]}`
        );
        dispatch(
          onSendSlackMessage(
            "#errores-estanterias",
            "Error en estanterias - Children no encontrado",
            ":warning:",
            `No se encontró children para: ${JSON.stringify({
              posicion: decidedPosition,
              configuracion:
                shelf.children.attributes[propsNames.configuracion],
              alto: shelf.children.attributes[propsNames.alto],
            })}
                    shelfsConfigurations: ${JSON.stringify(
                      shelfsConfigurations
                    )}`
          )
        );
        setShelfError(true);
        throw new Error("Children no encontrado");
      }

      return {
        ...shelf,
        children: matchingChildren,
      };
    });

    if (shelfsConfigurations.length === 5) {
      const module3 = updatedConfigs[2];
      const module4 = updatedConfigs[3];
      const module5 = updatedConfigs[4];

      const height3 = getHeightValue(
        module3.children?.attributes[propsNames.alto] as
          | "alta"
          | "media"
          | "baja"
      );
      const height4 = getHeightValue(
        module4.children?.attributes[propsNames.alto] as
          | "alta"
          | "media"
          | "baja"
      );
      const height5 = getHeightValue(
        module5.children?.attributes[propsNames.alto] as
          | "alta"
          | "media"
          | "baja"
      );

      const pos3 = module3.children?.attributes[propsNames.posicion];

      if (
        (pos3 === "base" || pos3 === "extension") &&
        height4 < height3 &&
        height4 < height5
      ) {
        const matching4 = children.find(
          (child) =>
            child.attributes[propsNames.posicion] === "sanguchito" &&
            child.attributes[propsNames.configuracion] ===
              module4.children?.attributes[propsNames.configuracion] &&
            child.attributes[propsNames.alto] ===
              module4.children?.attributes[propsNames.alto]
        );

        const matching5 = children.find(
          (child) =>
            child.attributes[propsNames.posicion] === "base" &&
            child.attributes[propsNames.configuracion] ===
              module5.children?.attributes[propsNames.configuracion] &&
            child.attributes[propsNames.alto] ===
              module5.children?.attributes[propsNames.alto]
        );

        if (matching4) {
          updatedConfigs[3] = {
            ...module4,
            children: matching4,
          };
        }

        if (matching5) {
          updatedConfigs[4] = {
            ...module5,
            children: matching5,
          };
        }
      }
    }

    const wallsCovered = updatedConfigs.reduce((total, m) => {
      const pos = m.children?.attributes[propsNames.posicion];
      if (pos === "base") return total + 2;
      if (pos === "extension") return total + 1;
      return total;
    }, 0);

    if (wallsCovered !== totalWalls) {
      console.error(
        `Error: Paredes suplidas (${wallsCovered}) no coinciden con las necesarias (${totalWalls})`
      );
      dispatch(
        onSendSlackMessage(
          "#errores-estanterias",
          "Error en estanterias",
          ":warning:",
          `Error en estanterias ${JSON.stringify(shelfsConfigurations)}`
        )
      );
      setShelfError(true);
    }

    return updatedConfigs;
  };

  useEffect(() => {
    if (shelfError) {
      toast.error(
        "Hubo un error con tu combinacion de estanterias, Se reiniciara la pagina, si persiste comuniqeuse con nosotros",
        {
          position: "top-right",
          autoClose: 4000,
          toastId: "stockError",
          icon: false,
          pauseOnFocusLoss: false,
          hideProgressBar: true,
          style: {
            backgroundColor: "#BA0000",
            color: "white",
            borderRadius: "0.5rem",
            fontFamily: `${theme.fonts.bold}`,
          },
        }
      );

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }, [shelfError]);

  useEffect(() => {
    if (shelfConfigurations.length > 0) {
      const updatedShelfConfigurations =
        determineModulePosition(shelfConfigurations);

      const hasPositionChanges = updatedShelfConfigurations.some(
        (shelf, index) =>
          shelf.children?.attributes[propsNames.posicion] !==
          shelfConfigurations[index].children?.attributes[propsNames.posicion]
      );
      if (hasPositionChanges) {
        setShelfConfigurations(updatedShelfConfigurations);
      }
    }
  }, [
    shelfConfigurations
      .map(
        (s) =>
          `${s.children?.attributes[propsNames.alto]}-${
            s.children?.attributes[propsNames.configuracion]
          }`
      )
      .join(","),
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdownId !== null &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId]?.contains(e.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openDropdownId]);

  const addModule = () => {
    const lastPosition = Math.max(
      ...shelfConfigurations.map((m) => m.position?.column || 0)
    );
    if (lastPosition >= 5) return;

    const newShelf: ShelfData = {
      moduleId: Date.now(),
      children: children?.[4],
      position: {
        row: 1,
        column: lastPosition + 1,
      },
    };

    setShelfConfigurations([...shelfConfigurations, newShelf]);
    setOpenModuleId(newShelf.moduleId);
    setShelfConfigChanged(true);
  };

  const handleUpdateModuleConfig = (
    moduleId: number,
    updates: {
      height?: "alta" | "media" | "baja";
      type?: string;
      position?: "base" | "extension" | "sanguchito";
    }
  ) => {
    setShelfConfigChanged(true);
    const updatedConfigs = updateModuleConfig(
      shelfConfigurations,
      moduleId,
      updates,
      propsNames,
      children
    );
    setShelfConfigurations(updatedConfigs);
  };

  const toggleModule = (moduleId: number) => {
    setOpenModuleId(openModuleId === moduleId ? undefined : moduleId);
  };

  return (
    <PersonalizedContainer>
      <ConfiguratorContainer>
        <ControlsContainer>
          {shelfConfigurations.map((module, index) => (
            <ShelfModule
              key={module.moduleId}
              arrConfig={arrValuesAttr.configuracion}
              module={shelfConfigurations[index]}
              updateModuleConfig={handleUpdateModuleConfig}
              index={index}
              title={`${nombresModulos[index]} Módulo`}
              shelfConfigurations={shelfConfigurations}
              setShelfConfigurations={setShelfConfigurations}
              arrOptions={arrValuesAttr.alto}
              openModuleId={openModuleId}
              setOpenModuleId={setOpenModuleId}
              toggleModule={toggleModule}
              propsNames={propsNames}
            />
          ))}
        </ControlsContainer>
      </ConfiguratorContainer>

      {shelfConfigurations.length < 5 && (
        <HandleView
          handlePreconfigView={addModule}
          title="Nuevo módulo"
          description="Agrandá tu estantería"
          icon={PlusModule()}
          hoverIcon={PlusModuleWhite()}
          isNewModal
          disabled={!addToCartEnabled}
          tooltip={
            !addToCartEnabled
              ? "El módulo previo no tiene stock. Cambie para continuar"
              : undefined
          }
        />
      )}

      <HandleView
        handlePreconfigView={handlePreconfigView}
        title="No hace falta empezar de cero."
        description="Usá una base prearmada y ajustala a tu medida."
        icon={PreConfigIcon()}
      />

      <PreCombinations
        handleConfigurationChange={setShelfConfigurations}
        isPreConfigModalOpen={isPreConfigModalOpen}
        setIsPreConfigModalOpen={setIsPreConfigModalOpen}
        propsNames={propsNames}
        children={children}
        setIsShelfConfigChanged={setIsShelfConfigChanged}
      />
    </PersonalizedContainer>
  );
};
export default ShelfConfigurator;
