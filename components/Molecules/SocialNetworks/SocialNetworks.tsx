import Icons from "@/components/Atoms/Icons/Icons";
import React from "react";
import { Container, SocialNetworkA } from "./styled";
import { arraySocial } from "./array";

const SocialNetworks = () => {
  return (
    <Container $gap="10px" $responsiveMobile={{ gap: "5.421px" }}>
      {arraySocial.map((item) => (
        <SocialNetworkA
          key={item.id}
          $width="39.223px"
          $height="39.223px"
          $borderSize="1px"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons
            width={item.width}
            height={item.height}
            padding={item.padding}
            isCenter
          >
            {item.icon}
          </Icons>
        </SocialNetworkA>
      ))}
    </Container>
  );
};

export default SocialNetworks;
