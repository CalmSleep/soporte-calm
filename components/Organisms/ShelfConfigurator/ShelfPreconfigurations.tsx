import Text from "@/components/Atoms/Typography/Text";
import { PersoConfigIcon, PersoConfigIconWhite } from "./iconsEstanterias";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import { useState, useEffect } from "react";
import { ShelfConfig, ShelfData, ShelfPreconfigurationsProps } from "./types";
import {
  ModuleContainer,
  TitleAndDelete,
  PreConfigImage,
  PreConfigContainer,
  Checkbox,
  ErrorToolTip,
} from "./styled";
import { ConfigGrid } from "../CombinationsModal/styled";
import Images from "@/components/Atoms/Images/Images";
import ShelfModule from "@/components/Organisms/ShelfConfigurator/ShelfModule";
import HandleView from "@/components/Molecules/HandleView/HandleView";
import { generateConfigurations, updateModuleConfig } from "./utils";
import Titles from "@/components/Atoms/Typography/Titles";
import { searchAttribute } from "@/utils/productsFunctios";
import SelectorQuantity from "@/components/Molecules/SelectorAttributes/SelectorQuantity";

const preConfigImages = [
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/bb26eef2-f169-40f1-5a21-a60d7fac6400/fit=cover",
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/57f9b7a1-2a74-480c-a458-43ed9d6adc00/fit=cover",
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/a210c7f0-58ec-44e8-2bc6-3ec479c4cc00/fit=cover",
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/a394a1eb-af50-43d3-18b0-04f90206c500/fit=cover",
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/bf845cb3-1ccc-43c9-c8f9-fe2d5368e400/fit=cover",
  "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/7e48d1e9-d5ff-4617-762a-77de71903000/fit=cover",
];

const ShelfPreconfigurations: React.FC<ShelfPreconfigurationsProps> = ({
  setShelfConfigurations,
  children,
  shelfConfigurations,
  handlePreconfigView,
  propsNames,
  setShelfConfigChanged,
}) => {
  type PredefinedConfig = string[];

  const [availableConfigs, setAvailableConfigs] = useState<ShelfData[][]>([]);

  const predefinedConfigs: PredefinedConfig[] = [
    ["MOBESTNOD100002", "MOBESTNOD060004", "MOBESTNOD060004"],
    ["MOBESTNOD180002", "MOBESTNOD100005"],
    ["MOBESTNOD180000", "MOBESTNOD180003"],
    ["MOBESTNOD100002", "MOBESTNOD100005"],
    ["MOBESTNOD180002", "MOBESTNOD180005"],
    [
      "MOBESTNOD180002",
      "MOBESTNOD100004",
      "MOBESTNOD100007",
      "MOBESTNOD180002",
    ],
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preconfigIndex = urlParams.get("preconfig");

    if (availableConfigs.length > 0) {
      toggleView("preconfig");

      if (preconfigIndex) {
        const index = parseInt(preconfigIndex) - 1;
        if (index >= 0 && index < availableConfigs.length) {
          setShelfConfigurations(availableConfigs[index]);
          setSelectedIndex(index);
          setShelfConfigChanged(true);
        }
      }
    }
  }, [availableConfigs]);

  useEffect(() => {
    if (children) {
      const configs = generateConfigurations(children, predefinedConfigs);
      setAvailableConfigs(configs);
    }
  }, [children]);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [activeView, setActiveView] = useState<"single" | "preconfig">(
    "preconfig"
  );

  let arrValuesAttr = searchAttribute(children);

  const handleConfigSelect = (index: number) => {
    setSelectedIndex(index);
    setShelfConfigurations(availableConfigs[index]);
    setShelfConfigChanged(true);
  };

  const toggleView = (view: "single" | "preconfig") => {
    if (view === "single" && children) {
      setActiveView(view);
      setShelfConfigurations([
        {
          moduleId: 1,
          children: children?.[0],
          position: {
            row: 1,
            column: 1,
          },
        },
      ]);
    } else {
      const config1 = availableConfigs[1];
      const config1HasStock = config1.every(
        (module) =>
          module.children.stock > 0 || module.children.backorder === true
      );

      if (config1HasStock) {
        setActiveView(view);
        setShelfConfigurations(config1);
        setSelectedIndex(1);
      } else {
        const availableConfig = availableConfigs.find((config) =>
          config.every(
            (module) =>
              module.children.stock > 0 || module.children.backorder === true
          )
        );

        if (availableConfig) {
          setActiveView(view);
          setShelfConfigurations(availableConfig);
          setSelectedIndex(availableConfigs.indexOf(availableConfig));
        } else {
          setActiveView(view);
          setShelfConfigurations(config1);
          setSelectedIndex(1);
        }
      }
    }
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
    if (children) {
      const updatedConfigs = updateModuleConfig(
        shelfConfigurations,
        moduleId,
        updates,
        propsNames,
        children
      );
      setShelfConfigurations(updatedConfigs);
    }
  };

  const handleModuleClick = (id: number) => {
    toggleView("single");
    setShelfConfigChanged(true);
  };

  const hasStock = () => {
    return activeView === "preconfig"
      ? shelfConfigurations.every(
          (config) => config.children?.stock > 0 || config.children?.backorder
        )
      : true;
  };

  return (
    <PreConfigContainer>
      {shelfConfigurations && shelfConfigurations.length > 0 && (
        <ShelfModule
          onModuleClick={handleModuleClick}
          propsNames={propsNames}
          isOpenConfig={activeView === "single"}
          activeView={activeView}
          arrConfig={arrValuesAttr.configuracion}
          module={shelfConfigurations[0]}
          updateModuleConfig={handleUpdateModuleConfig}
          index={0}
          title="Módulo suelto"
          isPreconfig
          shelfConfigurations={shelfConfigurations}
          setShelfConfigurations={setShelfConfigurations}
          arrOptions={arrValuesAttr.alto}
        />
      )}

      <ModuleContainer
        onClick={() => activeView === "single" && toggleView("preconfig")}
        $isOpen={activeView === "preconfig"}
        $hasError={!hasStock()}
      >
        {!hasStock() && <ErrorToolTip data-tooltip="Sin Stock" />}

        <TitleAndDelete $isPreconfig>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Checkbox
              type="checkbox"
              checked={activeView === "preconfig"}
              onChange={() => toggleView("preconfig")}
            />
            <div>
              <Titles
                titleTag="h2"
                fontSize="17px"
                font="bold"
                color="lead"
                lineHeight="130%"
                cursor={activeView === "preconfig" ? "default" : "pointer"}
                letterSpacing="-0.6px"
                responsiveMobile={{
                  fontSize: "16px",
                }}
              >
                Combinaciones prearmadas
              </Titles>
              <Text
                fontSize="17px"
                font="regular"
                color="brilliantLiquorice"
                lineHeight="130%"
                cursor={activeView === "preconfig" ? "default" : "pointer"}
                letterSpacing="-0.6px"
                responsiveMobile={{
                  fontSize: "16px",
                }}
              >
                Diseños ya definidos.
              </Text>
            </div>
          </div>
        </TitleAndDelete>

        {activeView === "preconfig" && (
          <>
            <Margin margin="10px 0 0 0" />
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
              Elegí una combinación ya armada
            </Text>
            <Margin margin="5px 0 0 0" />

            <ConfigGrid>
              {preConfigImages.map((image, index) => (
                <PreConfigImage
                  $isSelected={selectedIndex === index}
                  onClick={() => handleConfigSelect(index)}
                  key={index}
                >
                  <Images
                    src={image}
                    alt="Configuración"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    isLazy
                  />
                </PreConfigImage>
              ))}
            </ConfigGrid>
          </>
        )}
      </ModuleContainer>

      {/* <HandleView
        handlePreconfigView={handlePreconfigView}
        title="¿Nada se ajusta a tu espacio?"
        description="Personalizá tu estantería, 100% a tu medida"
        icon={PersoConfigIcon()}
      /> */}
    </PreConfigContainer>
  );
};

export default ShelfPreconfigurations;
