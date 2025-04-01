import Images from "@/components/Atoms/Images/Images";
import Titles from "@/components/Atoms/Typography/Titles";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import SocialNetworks from "@/components/Molecules/SocialNetworks/SocialNetworks";
import React from "react";
import { Container, ContainerHero } from "./styled";

const HeroForm = () => {
  return (
    <ContainerHero $flexDirection="column">
      <Images
        src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/f5f47804-787a-4b3e-9132-8ff21ada0600/fit=cover"
        alt="logo"
        height="404px"
        objectFit="cover"
      />

      <Container>
        <Titles
          align="center"
          fontSize="107.331px"
          fontWeight={600}
          letterSpacing="-3.22px"
          color="white"
          responsiveMobile={{
            fontSize: "48px",
            lineHeight: "55.2px",
            letterSpacing: "-1.44px",
          }}
        >
          Soporte
        </Titles>
      </Container>

      <SectionHeader
        sectionHeaderStyles={{
          $backgroundColor: "whiteEdgar",
          $padding: "40px 150px",
          $gap: "24px",
          $responsiveMobile: {
            padding: "24px 16px",
            gap: "24px",
          },
        }}
        title="¿Tuviste algún inconveniente con tu compra?"
        paragraph={`No te preocupes que acá estamos para solucionarlo. 🙌\n
          Te vamos a pedir algunos datos para identificar tu pedido y revisar tu caso. Una vez que completes el formulario, nuestro equipo se pondrá en acción y en 48 hs hábiles recibirás una respuesta por mail. 📩\n
          Si te surge alguna duda en el proceso, podés escribirnos por el canal de contacto que prefieras.`}
        titleStyles={{
          color: "lead",
          titleTag: "h2",
          align: "left",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "40px",
          letterSpacing: "-1.2px",
          responsiveMobile: {
            fontSize: "24px",
            lineHeight: "24px",
            letterSpacing: "-0.72px",
          },
        }}
        paragraphStyles={{
          color: "brilliantLiquorice",
          width: 75,
          align: "left",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "26px",
          letterSpacing: "-0.6px",
        }}
      >
        <SocialNetworks />
      </SectionHeader>
    </ContainerHero>
  );
};

export default HeroForm;
