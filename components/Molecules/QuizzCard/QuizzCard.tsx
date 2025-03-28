import { Container, ImageContainer, TextQuizzContainer, CardImage } from "./styled"
import Images from '@/components/Atoms/Images/Images';
import Margin from '@/components/Atoms/Spacing/Margin/Margin';
import Text from '@/components/Atoms/Typography/Text';
import { IProps } from "./types"
import { useEffect, useState } from "react";
    
const QuizzUnit = ({isfromNavBar, quizzHandle, src, text, id } : IProps) => {
    const [render, setRender] = useState(false)
    
    useEffect(() => {
      setTimeout(() => {
        setRender(true)
      }, 2000)
    }, [])

    return(
    <Container onClick={() => quizzHandle(id)} $isfromNavBar={isfromNavBar}>
      {
        isfromNavBar && 
        <>
          <CardImage>
            <ImageContainer $isfromNavBar={isfromNavBar}>
              {
                render &&
                <Images 
                  src={src}
                  alt="quiz"
                  width="200px"
                  height="125px"
                  borderRadius='10px'
                  isLazy
                  responsiveMobile={{
                    'width': '175px',
                    'height' : '110px'
                  }}
                />
              }
            
            </ImageContainer>
            <TextQuizzContainer>
            <Margin margin="0 0 5px 0" marginMobile="0">
              <Text
                  textTag="p" 
                  color="offBlack"
                  font="extraBold"
                  fontSize="16px"
                  textDecoration="none"
                  > {text}  
                </Text>
              </Margin>
                <Text
                  fontSize="14px" font="light" color="brilliantLiquorice"
                  >Test de 5 minutos
                </Text>
                </TextQuizzContainer>
          </CardImage>
          </> 
        }
        
        {
          !isfromNavBar && (
            <>
              <Margin margin="10px" />
  
              <Text
              font='bold'
              color='offBlack'
              fontSize='1.1em'
              align='left'
              responsiveMobile={{
                  fontSize:"1.4em"
              }}>
                {text}
              </Text>
              <Text
                font='regular'
                fontSize='0.7em'
                color='millionGray'
                align='left'
                responsiveMobile={{
                    fontSize:"1em"
              }}>No te va a llevar más de 5 minutos</Text>
            </>
          )
        }
    </Container>
    )
  }
  
export default QuizzUnit;