import {
  DivAlert,
  DivImgAlert,
  DivCloseIcon,
  DivInfo
} from "./styled"
import Button from "@/components/Atoms/Buttons/Button"
import { CloseIcon } from "@/components/Organisms/MainBlock/mainBlockicons"
import Images from "@/components/Atoms/Images/Images"
import Titles from "@/components/Atoms/Typography/Titles"
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import { SizeInfoWindowProps } from "./types"

const SizeInfoWindow = ({ setIsSizeInfoOpen }: SizeInfoWindowProps) => {
  return (
    <>
      <DivCloseIcon>
        <Button onClick={() => setIsSizeInfoOpen(false)}>
          <CloseIcon />
        </Button>
      </DivCloseIcon>

      <DivInfo>
        <Titles
          titleTag="h2"
          fontSize="2.3em"
          font="light"
          color="offBlack"
          boldTitle="de ensueño"
        >
          entrega <br />
        </Titles>
        <Text fontSize="1em" color="offBlack" font="bold">
          Sobre el servicio
        </Text>
        <Margin margin="10px" />
        <Titles titleTag="h3" fontSize="0.9em" color="offBlack" font="light">
          Nos encargamos de todo el proceso de armado de tu cama para que no
          tengas que preocuparte por nada. <br />
        </Titles>
        <Margin margin="20px" />
        <Titles titleTag="h3" fontSize="0.9em" color="offBlack" font="light">
          Nuestros expertos van a abrir los productos, instalarlos, deshacerse
          de los envoltorios y siempre que vos quieras, se pueden llevar tu
          ex-colchón.
        </Titles>
        <Margin margin="20px" />
        <DivAlert>
          <DivImgAlert>
            <Images
              width="60%"
              src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/1b0595b8-94ac-4c62-0275-d49fb540c000/thumbnail"
              alt="alert"
              isLazy
            />
          </DivImgAlert>
          <Text font="medium" fontSize="0.8em" color="offBlack">
            Este servicio esta limitado a algunas zonas de Buenos Aires, ingresá
            tu CP para saber si está disponible en tu domicilio
          </Text>
        </DivAlert>
        <Text
          color="yellowCalm"
          textTag="a"
          link="https://calmessimple.com.ar/producto/entrega-de-ensueno/"
          font="extraBold"
        >
          Ver más detalles
        </Text>
      </DivInfo>
    </>
  )
}

export default SizeInfoWindow