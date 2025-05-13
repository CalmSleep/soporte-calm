import { HandleViewContainer, IconNewModule } from "./styled";
import { HandleViewProps } from "./types";
import Text from "@/components/Atoms/Typography/Text";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import Tooltip from "@/components/Atoms/Tooltip/Tooltip";
import { useState } from "react";

const HandleView = ({
    handlePreconfigView,
    title,
    description,
    icon,
    isNewModal,
    disabled,
    tooltip,
    hoverIcon
}: HandleViewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Tooltip text={tooltip} disabled={!tooltip}>
      <HandleViewContainer 
        onClick={!disabled ? handlePreconfigView : undefined}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        $isNewModal={isNewModal}
        style={{ 
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1
        }}
      >
          <div>
            <Text
              fontSize={isNewModal ? "20px" : "18px"}
              font="bold"
              color={isNewModal ? "lead" : "brilliantLiquorice"}
              lineHeight="130%"
              cursor={disabled ? 'not-allowed' : 'pointer'}
              letterSpacing="-0.6px"
            >
              {title}
            </Text>
         
            <Margin margin="5px 0 0 0" />

            <div>
              <Text
                fontSize={isNewModal ? "16px" : "14px"}
                font={isNewModal ? "regular" : "miniBold"}
                color={isNewModal ? "lead" : "wildViolet"}
                lineHeight={isNewModal ? "100%" : "130%"}
                letterSpacing={isNewModal ? "-0.54px" : "-0.48px"}
                textDecoration={isNewModal ? "none" : "underline"}
                cursor={disabled ? 'not-allowed' : 'pointer'}
              >
                {description}
              </Text>
            </div>
          </div>

          {
              isNewModal ? (
                  <IconNewModule $isHovered={isHovered}>
                      {(isHovered && hoverIcon )? hoverIcon : icon}
                  </IconNewModule>
              ) : (
                  <div>
                  {(isHovered && hoverIcon) ? hoverIcon : icon}
                  </div>
              )
          }
        </HandleViewContainer>
    </Tooltip>
  );
};

export default HandleView;
