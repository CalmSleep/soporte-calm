import ShelfBuilder from "@/components/Molecules/ShelfBuilder/ShelfBuilder";
import { 
    CombinationsModalContainer,
    ButtonCloseDiv,
    ConfigImage,
    ConfigGrid,
    ContainerBuilder,
    ContainerSelector,
    ButtonsContainer,
    DesktopContainer,
    MobileContainer
} from "./styled";
import Text from '@/components/Atoms/Typography/Text';
import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";
import { useEffect, useState } from "react";
import Separator from "@/components/Atoms/Separator/Separator";
import Button from "@/components/Atoms/Buttons/Button";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import Images from "@/components/Atoms/Images/Images";
import { IProps } from "./types";
import { generateConfigurations } from "../ShelfConfigurator/utils";

export const preConfigImages = [
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/bb26eef2-f169-40f1-5a21-a60d7fac6400/fit=cover",
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/57f9b7a1-2a74-480c-a458-43ed9d6adc00/fit=cover",
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/a210c7f0-58ec-44e8-2bc6-3ec479c4cc00/fit=cover",
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/a394a1eb-af50-43d3-18b0-04f90206c500/fit=cover",
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/bf845cb3-1ccc-43c9-c8f9-fe2d5368e400/fit=cover",
   "https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/7e48d1e9-d5ff-4617-762a-77de71903000/fit=cover",
];

type PredefinedConfig = string[];

const predefinedConfigs: PredefinedConfig[] = [
    ["MOBESTNOD100002", "MOBESTNOD060004", "MOBESTNOD060004"],
    ["MOBESTNOD180002", "MOBESTNOD100005"],
    ["MOBESTNOD180000", "MOBESTNOD180003"],
    ["MOBESTNOD100002", "MOBESTNOD100005"],
    ["MOBESTNOD180002", "MOBESTNOD180005"],
    ["MOBESTNOD180002", "MOBESTNOD100004", "MOBESTNOD100007", "MOBESTNOD180002"]
  ];

const CombinationsModal = ({handleModal, handleConfigurationChange, children, propsNames, setIsShelfConfigChanged} : IProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shelfConfigurations, setShelfConfigurations] = useState<ShelfData[]>([]);
    const [availableConfigs, setAvailableConfigs] = useState<ShelfData[][]>([]);
    const [selectedConfig, setSelectedConfig] = useState<ShelfData[]>(availableConfigs[0]);

    const handleConfigSelect = (index: number) => {
        setSelectedIndex(index);
        setSelectedConfig(availableConfigs[index]);
        setIsShelfConfigChanged(true);
    };

    useEffect(() => {
        setShelfConfigurations(selectedConfig);
    }, [selectedConfig]);

    useEffect(() => {
        if (children) {
          const configs = generateConfigurations(children, predefinedConfigs);
          setAvailableConfigs(configs);
          setSelectedConfig(configs[selectedIndex]);
        }
      }, [children]);

    return (
        <CombinationsModalContainer>
            <ButtonCloseDiv onClick={handleModal}>
                <Text
                fontSize="1.4rem"
                color="black"
                >
                &times;
                </Text>
            </ButtonCloseDiv>

            <MobileContainer>
                <Text
                font="miniBold"
                fontSize="24px"
                color="lead"
                lineHeight="100%"
                letterSpacing="-0.72px"
                responsiveMobile={{
                    fontSize:"18px"
                }}
                >
                    Estantería Modular Nodo
                </Text>

                <Margin margin="4px 0 0 0" />

                <Text
                font="regular"
                fontSize="16px"
                color="brilliantLiquorice"
                lineHeight="130%"
                letterSpacing="-0.48px"
                responsiveMobile={{
                    fontSize:"14px"
                }}
                >
                    Selecciona la configuración que mas se adapte a tu a vos, podes modificarla a tu gusto.
                </Text>

                <Separator
                margin="14px 0"
                color="yellowCalm"
                />
            </MobileContainer>

            <ContainerBuilder>
                <ShelfBuilder
                    shelfConfigurations={shelfConfigurations}
                    maxRows={5}
                    maxColumns={5}
                    propsNames={propsNames}
                />
            </ContainerBuilder>
           
            <ContainerSelector>
                <DesktopContainer>
                    <Text
                    font="miniBold"
                    fontSize="24px"
                    color="lead"
                    lineHeight="100%"
                    letterSpacing="-0.72px"
                    >
                        Estantería Modular Nodo
                    </Text>

                    <Margin margin="4px 0 0 0" />

                    <Text
                    font="regular"
                    fontSize="16px"
                    color="brilliantLiquorice"
                    lineHeight="130%"
                    letterSpacing="-0.48px"
                    >
                        Selecciona la configuración que mas se adapte a tu a vos, podes modificarla a tu gusto.
                    </Text>

                    <Separator
                    margin="14px 0"
                    color="yellowCalm"
                    />
                </DesktopContainer>
                

                <Text
                font="regular"
                fontSize="20px"
                color="lead"
                lineHeight="130%"
                letterSpacing="-0.6px"
                responsiveMobile={{
                    fontSize:"16px"
                }}
                >
                    Elegí el tipo de módulo
                </Text>

                <ConfigGrid>
                    {preConfigImages.map((image, index) => (
                        <ConfigImage 
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
                            />
                        </ConfigImage>
                    ))}
                </ConfigGrid>

                <ButtonsContainer>
                    <Button
                    backgroundColor="white"
                    backgroundColorHover="lead"
                    textColor="lead"
                    textColorHover="white"
                    borderRadius="1000px"
                    onClick={handleModal}
                    height="55px"
                    size="none"
                    >
                        Cerrar
                    </Button>

                    <Button
                    backgroundColor="lead"
                    backgroundColorHover="white"
                    textColor="white"
                    textColorHover="lead"
                    borderRadius="1000px"
                    borderColor="lead"
                    onClick={() => {
                        handleConfigurationChange(selectedConfig);
                        handleModal();
                    }}
                    height="55px"
                    size="none"
                    responsiveMobile={{
                        fontSize:"13px"
                    }}
                    >
                        Aplicar configuración
                    </Button>
                </ButtonsContainer>
            </ContainerSelector>
        </CombinationsModalContainer>
    )
}   

export default CombinationsModal;
