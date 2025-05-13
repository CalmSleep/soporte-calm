import {
  ModuleContainer,
  ButtonGroup,
  ConfigImage,
  ConfigImageContainer,
  TitleAndDelete,
  ModuleContent,
  TitleToolTip,
  ToolTip,
  ErrorToolTip,
  IconContainer,
  TitleIcon,
  Resume,
} from "./styled";
import Text from "@/components/Atoms/Typography/Text";
import {
  estanteAlto,
  cabinetAlto,
  cabinetAbiertoAlto,
  estanteMedio,
  cabinetMedio,
  cabinetAbiertoMedio,
  estanteBajo,
  cabinetBajo,
  cabinetAbiertoBajo,
  PlusModule,
  DeleteModule,
  EditModule,
  PreConfigIcon,
  TooltipIcon,
  EditModuleWhite,
} from "@/components/Organisms/ShelfConfigurator/iconsEstanterias";
import { ShelfModuleProps } from "../../Molecules/ShelfModule/types";
import {
  Arrow,
  DropdownContainer,
  DropdownList,
  DropdownListContainer,
  ListItem,
} from "../MainBlock/styled";
import { TextSelected } from "@/components/Molecules/SelectorAttributes/styled";
import { ArrowQuantity } from "../MainBlock/mainBlockicons";
import { Checkbox } from "@/components/Organisms/ShelfConfigurator/styled";
import { useEffect, useRef, useState } from "react";
import estanterias_text from "@/utils/estanterias_text";
import { ShelfConfig, ShelfData } from "./types";
import ShelfBuilder from "@/components/Molecules/ShelfBuilder/ShelfBuilder";
import Titles from "@/components/Atoms/Typography/Titles";

const ShelfModule = ({
  arrConfig,
  module,
  updateModuleConfig,
  index,
  title,
  isPreconfig,
  shelfConfigurations,
  setShelfConfigurations,
  arrOptions,
  onModuleClick,
  isOpenConfig,
  activeView,
  openModuleId,
  setOpenModuleId,
  toggleModule,
  propsNames,
}: ShelfModuleProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [previewConfigs, setPreviewConfigs] = useState<ShelfData[][]>([]);

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

  useEffect(() => {
    if (setOpenModuleId) {
      if (!openModuleId && shelfConfigurations.length > 0) {
        setOpenModuleId(shelfConfigurations[0].moduleId);
      } else if (
        openModuleId &&
        !shelfConfigurations.some((module) => module.moduleId === openModuleId)
      ) {
        const previousConfig = shelfConfigurations;
        const deletedIndex = previousConfig.findIndex(
          (module) => module.moduleId === openModuleId
        );

        if (deletedIndex === previousConfig.length) {
          setOpenModuleId(previousConfig[deletedIndex - 1].moduleId);
        } else if (shelfConfigurations[deletedIndex]) {
          setOpenModuleId(shelfConfigurations[deletedIndex].moduleId);
        } else {
          setOpenModuleId(
            shelfConfigurations[shelfConfigurations.length - 1].moduleId
          );
        }
      }
    }
  }, [shelfConfigurations, openModuleId, setOpenModuleId]);

  const removeModule = (moduleId: number) => {
    const filteredModules = shelfConfigurations.filter(
      (m) => m.moduleId !== moduleId
    );
    const updatedModules = filteredModules.map((module, index) => ({
      ...module,
      position: {
        row: 1,
        column: index + 1,
      },
    }));
    setShelfConfigurations(updatedModules);
  };

  const toggleDropdown = (moduleId: number) => {
    setOpenDropdownId((current) => (current === moduleId ? null : moduleId));
  };

  const isOpen = isPreconfig ? isOpenConfig : openModuleId === module.moduleId;

  useEffect(() => {
    const configs = [...arrConfig]
      .sort((a, b) => {
        const order = { estante: 0, cabinet: 1, nicho: 2 };
        return order[a as keyof typeof order] - order[b as keyof typeof order];
      })
      .map((type) => {
        const configCopy = [...shelfConfigurations];
        if (configCopy.length > 0) {
          configCopy[configCopy.length - 1] = {
            ...configCopy[configCopy.length - 1],
            children: {
              ...configCopy[configCopy.length - 1].children,
              attributes: {
                ...configCopy[configCopy.length - 1].children?.attributes,
                [propsNames.configuracion]: type as
                  | "estante"
                  | "cabinet"
                  | "nicho",
              },
            },
          };
        }
        return configCopy;
      });
    setPreviewConfigs(configs as unknown as ShelfData[][]);
  }, [shelfConfigurations, arrConfig]);

  const hasStock = (() => {
    const skuCount = shelfConfigurations.filter(
      (config) => config.children?.sku === module.children?.sku
    ).length;

    return (
      Number(module.children?.stock) >= skuCount || module.children?.backorder
    );
  })();

  const hasError = () => {
    if (isPreconfig) {
      if (isOpen) {
        return !hasStock;
      } else {
        return false;
      }
    }
    return !hasStock;
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ModuleContainer
      key={module.moduleId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        isPreconfig
          ? onModuleClick && !isOpenConfig && onModuleClick(module.moduleId)
          : openModuleId !== module.moduleId &&
            toggleModule &&
            toggleModule(module.moduleId)
      }
      $isOpen={isOpen}
      $hasError={hasError()}
    >
      {hasError() && <ErrorToolTip data-tooltip="Sin Stock" />}
      <Resume>
        <TitleIcon>
          {isPreconfig ? (
            <TitleAndDelete $isPreconfig $isOpen={isOpen}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Checkbox
                  type="checkbox"
                  checked={activeView === "single"}
                  onChange={() =>
                    onModuleClick && onModuleClick(module.moduleId)
                  }
                />
                <div>
                  <Titles
                    titleTag="h2"
                    fontSize="17px"
                    font="bold"
                    color="lead"
                    cursor={activeView === "single" ? "default" : "pointer"}
                    lineHeight="130%"
                    letterSpacing="-0.6px"
                    responsiveMobile={{
                      fontSize: "16px",
                    }}
                  >
                    Módulo suelto
                  </Titles>
                  <Text
                    fontSize="17px"
                    cursor={activeView === "single" ? "default" : "pointer"}
                    font="regular"
                    color="brilliantLiquorice"
                    lineHeight="130%"
                    letterSpacing="-0.6px"
                    responsiveMobile={{
                      fontSize: "16px",
                    }}
                  >
                    Piezas individuales para usar por separado.
                  </Text>
                </div>
              </div>
            </TitleAndDelete>
          ) : (
            <TitleAndDelete>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Text
                  fontSize="17px"
                  font="bold"
                  color="lead"
                  cursor={
                    openModuleId === module.moduleId ? "default" : "pointer"
                  }
                  lineHeight="130%"
                  letterSpacing="-0.6px"
                  responsiveMobile={{
                    fontSize: "16px",
                  }}
                >
                  {title}
                </Text>
              </div>
            </TitleAndDelete>
          )}

          {!isPreconfig && openModuleId !== module.moduleId && (
            <Text
              fontSize="14px"
              font="regular"
              color="brilliantLiquorice"
              lineHeight="130%"
              letterSpacing="-0.48px"
              cursor="pointer"
            >
              Seleccionaste Estantería{" "}
              <Text textTag="span" font="bold" cursor="pointer">
                {module.children?.attributes[propsNames.alto]},{" "}
                {module.children?.attributes[propsNames.configuracion] ===
                "estante"
                  ? "estantes"
                  : module.children?.attributes[propsNames.configuracion] ===
                    "cabinet"
                  ? "cabina"
                  : module.children?.attributes[propsNames.configuracion] ===
                      "nicho" && "cabina abierta"}
              </Text>
            </Text>
          )}
        </TitleIcon>
        {!isPreconfig &&
          (openModuleId === module.moduleId ? (
            index > 0 && (
              <div
                onClick={() => removeModule(module.moduleId)}
                style={{ cursor: "pointer" }}
              >
                {DeleteModule()}
              </div>
            )
          ) : (
            <IconContainer $isHovered={isHovered}>
              {isHovered ? EditModuleWhite() : EditModule()}
            </IconContainer>
          ))}
      </Resume>

      <ModuleContent $isOpen={isOpen}>
        <TitleToolTip>
          <Text
            fontSize="16px"
            font="regular"
            color="lead"
            lineHeight="130%"
            letterSpacing="-0.6px"
            responsiveMobile={{
              fontSize: "16px",
            }}
          >
            Elegí la altura del módulo
          </Text>

          <ToolTip data-tooltip="La altura define cuántos niveles tiene tu módulo.">
            {TooltipIcon()}
          </ToolTip>
        </TitleToolTip>

        <DropdownContainer
          $isSize
          onClick={() => toggleDropdown(module.moduleId)}
          ref={(el) => (dropdownRefs.current[module.moduleId] = el)}
        >
          <div>
            {module.children?.attributes[propsNames.alto] && (
              <TextSelected>
                <Text
                  font={"medium"}
                  align="center"
                  cursor="pointer"
                  responsiveMobile={{
                    width: "auto",
                    fontSize: "0.85rem",
                  }}
                >
                  {
                    estanterias_text[
                      module.children?.attributes[
                        propsNames.alto
                      ] as keyof typeof estanterias_text
                    ]
                  }
                </Text>
              </TextSelected>
            )}
          </div>

          <Arrow $isOpen={openDropdownId === module.moduleId}>
            {ArrowQuantity()}
          </Arrow>

          {openDropdownId === module.moduleId && (
            <DropdownListContainer>
              <DropdownList>
                {arrOptions &&
                  arrOptions.length > 0 &&
                  [...arrOptions]
                    .sort((a, b) => {
                      const order = { alta: 0, media: 1, baja: 2 };
                      return (
                        order[a as keyof typeof order] -
                        order[b as keyof typeof order]
                      );
                    })
                    .map((option, index) => (
                      <ListItem
                        key={index}
                        $isSelected={
                          module.children?.attributes[propsNames.alto] ===
                          option
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          updateModuleConfig(module.moduleId, {
                            height: option as "alta" | "media" | "baja",
                          });
                          setOpenDropdownId(null);
                        }}
                        $isLast={index === arrOptions.length - 1}
                        $isFirst={index === 0}
                      >
                        {option && (
                          <TextSelected>
                            <Text
                              font={"medium"}
                              align="left"
                              cursor="pointer"
                              responsiveMobile={{
                                width: "auto",
                                fontSize: "0.85rem",
                              }}
                            >
                              {
                                estanterias_text[
                                  option as keyof typeof estanterias_text
                                ]
                              }
                            </Text>
                          </TextSelected>
                        )}
                      </ListItem>
                    ))}
              </DropdownList>
            </DropdownListContainer>
          )}
        </DropdownContainer>

        <TitleToolTip>
          <Text
            fontSize="16px"
            font="regular"
            color="lead"
            lineHeight="130%"
            letterSpacing="-0.6px"
            responsiveMobile={{
              fontSize: "16px",
            }}
          >
            Elegí el tipo de módulo
          </Text>

          <ToolTip data-tooltip="¿Querés guardar, exhibir o combinar? Cambiá el tipo según el uso que le vas a dar.">
            {TooltipIcon()}
          </ToolTip>
        </TitleToolTip>

        <ButtonGroup>
          {previewConfigs.map((configs, idx) => {
            const type = arrConfig[idx] as "estante" | "cabinet" | "nicho";
            return (
              <ConfigImageContainer key={idx}>
                <ConfigImage
                  onClick={() => {
                    const orderedTypes = [...arrConfig].sort((a, b) => {
                      const order = { estante: 0, cabinet: 1, nicho: 2 };
                      return (
                        order[a as keyof typeof order] -
                        order[b as keyof typeof order]
                      );
                    });
                    const selectedType = orderedTypes[idx];
                    updateModuleConfig(module.moduleId, { type: selectedType });
                  }}
                  $isSelected={
                    module.children?.attributes[propsNames.configuracion] ===
                    type
                  }
                >
                  <ShelfBuilder
                    shelfConfigurations={configs}
                    maxRows={5}
                    maxColumns={5}
                    isCart={false}
                    editingModuleId={openModuleId}
                    isCard
                    propsNames={propsNames}
                    isPreConfigView={isPreconfig}
                  />
                </ConfigImage>

                <Text
                  fontSize="14px"
                  font="regular"
                  color="lead"
                  lineHeight="130%"
                  letterSpacing="-0.42px"
                >
                  {type === "estante"
                    ? "Estantes"
                    : type === "cabinet"
                    ? "Cabinet"
                    : "Cabinet abierto"}
                </Text>
              </ConfigImageContainer>
            );
          })}
        </ButtonGroup>
      </ModuleContent>
    </ModuleContainer>
  );
};

export default ShelfModule;
