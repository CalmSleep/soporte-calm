import { StyledBanner, MarqueeContainer, MarqueeWrapperDesktop, MarqueeWrapperMobile, CyberText } from "./styled";
import { useState, useEffect, useRef } from "react";
import { IProps } from "./types";
import Countdown from "@/components/Organisms/CountDown/CountDown";
import parse from 'html-react-parser';
import Text from "@/components/Atoms/Typography/Text"
import { useRouter } from "next/router";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import { useSelector } from "react-redux";
import { IStore } from "@/state/types";
import { getHeadBanner } from "@/state/hygraph/hygraphSelector";

const HeadBanner = ({bannerId}: IProps) => {
    const router = useRouter();
    const headBanner = useSelector((state: IStore) => getHeadBanner(state, bannerId ?? ""))
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [marqueeActivate, setMarqueeActivate] = useState<boolean>(false)
   const today = new Date()
    const [ spacing , setSpacing] = useState<number>(0);
   const [ showCountDown , setShowCountDown] = useState<boolean>(false);
    const [ bannerText, setBannerText] = useState<string>("")
    const [ isBases, setIsBases] = useState(false)
    const [countDownInit, setCountDownInit] = useState<Date | undefined>(undefined)
    const [countDownFinish, setCountDownFinish] = useState<Date | undefined>(undefined)
    const [render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        },2000)
    }, [])

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (container && content) {
        if (content.scrollWidth > container.clientWidth ) {
            setMarqueeActivate(true)
        }
        if (content && content.scrollWidth !== 0) {
                setSpacing(content.scrollWidth * 0.25)
            }
        }
       /*  if ((router.pathname === "/producto/sommier-calm") || (router.pathname === "/producto/base-de-cama")) {
            setIsBases(true)
        } else {
            setIsBases(false)
        } */
    }, [contentRef, bannerText, router, showCountDown])

    useEffect(() => {
        if (countDownFinish && countDownInit){
            setShowCountDown(countDownInit < today && countDownFinish >= today)
        }
    }, [countDownFinish])
    
    useEffect(() => {
        if (headBanner) {
        const currentDate = new Date();
        const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
        const comienzoUltimosDias = headBanner.comienzoUltimosDias != null ? new Date(headBanner.comienzoUltimosDias) : nextYear;
        const comienzoUltimoDia = headBanner.comienzoUltimoDia != null ? new Date(headBanner.comienzoUltimoDia) : nextYear ;
        const comienzoExtendimos = headBanner.comienzoExtendimos != null ? new Date(headBanner.comienzoExtendimos) : nextYear;
        const ultimosDiasExtendimos = headBanner.ultimosDiasExtendimos != null ? new Date(headBanner.ultimosDiasExtendimos) : nextYear ;
        const utimoDiaExtendimos = headBanner.utimoDiaExtendimos != null ? new Date(headBanner.utimoDiaExtendimos) : nextYear ;
        let text
            if (currentDate > comienzoExtendimos) {
                if (currentDate > utimoDiaExtendimos) {
                    text = headBanner.textoUltimoDia.html != null ? headBanner.textoUltimoDia.html : 'El colchón mejor puntuado.';
                } else if (currentDate > ultimosDiasExtendimos) {
                    text = headBanner.textoUltimosDias.html != null ? headBanner.textoUltimosDias.html : 'El colchón mejor puntuado.';
                } else {
                    text = headBanner.textoInferior.html != null ? headBanner.textoInferior.html : 'El colchón mejor puntuado.';

                    text = headBanner.textoInferior.html != null 
                        ? `Extendimos ${headBanner.textoInferior.html}`
                        : 'El colchón mejor puntuado.';
                }
            } else if(headBanner.comienzoUltimosDias !== null && headBanner.comienzoUltimoDia !== null){

                if (currentDate > comienzoUltimosDias && currentDate < comienzoUltimoDia) {
                    text = headBanner.textoUltimosDias.html != null ? headBanner.textoUltimosDias.html : 'El colchón mejor puntuado.' ;
                } else if (currentDate > comienzoUltimoDia) {
                    text = headBanner.textoUltimoDia.html != null ? headBanner.textoUltimoDia.html : 'El colchón mejor puntuado.';
                } else {
                    text = headBanner.textoInferior.html != null ? headBanner.textoInferior.html : 'El colchón mejor puntuado.';
                }
            } else {
                text = headBanner.textoInferior.html;
            }

          /*   const basesCoupon = " ● 10% OFF EXTRA en tu Base o Sommier al llevar Colchón ";
              
            if (isBases) {
                setBannerText(`${text.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/gi, '')}` + basesCoupon)
            } else  */if (text /* && !isBases */) {
                setBannerText(text.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/gi, ''))
            }

            if (currentDate > comienzoExtendimos) {
                setCountDownInit(new Date(headBanner.ultimosDiasExtendimos))
                const endDate = new Date(headBanner.utimoDiaExtendimos)
                endDate.setHours(23, 59, 59, 999);
                setCountDownFinish(endDate)
            } else if (currentDate > comienzoUltimosDias) {
                setCountDownInit(new Date(headBanner.comienzoUltimosDias))
                const endDate = new Date(headBanner.comienzoUltimoDia)
                endDate.setHours(23, 59, 59, 999);
                setCountDownFinish(endDate)
            }
        }
    }, [headBanner]);

    return (
        <StyledBanner>
            <MarqueeContainer ref={containerRef} $isMarqueeActivate={marqueeActivate}>
                <MarqueeWrapperDesktop 
                    ref={contentRef} 
                    $isMarqueeActivate={marqueeActivate}
                    $margin={spacing}
                > 
                 {/*    <Text
                    font="regular"
                    fontSize=".8rem"
                    color="white"
                    hasStrong
                    > */}
                        {parse(bannerText)} 
                  {/*   </Text> */}

                    {
                        showCountDown && countDownFinish &&
                        <> 
                            <Margin margin=" 0 0 0 6px">
                                <Text textTag="span" color="white"> ● </Text>
                            </Margin>
                            <Countdown endPromotionDate={new Date(countDownFinish)} isHeadbanner/> 
                        </> 
                    }
                </MarqueeWrapperDesktop>
                
                {
                    marqueeActivate &&
                    <MarqueeWrapperMobile 
                    $isMarqueeActivate={marqueeActivate}
                    $margin={spacing}
                    $isSecondText
                    >
                      {/*   <Text
                        font="regular"
                        fontSize=".8rem"
                        color="white"
                        hasStrong
                        > */}
                             {parse(bannerText)} 
                     {/*    </Text> */}
                        
                        { 
                            showCountDown && countDownFinish && 
                            <> 
                                <Text textTag="span" color="white">● </Text>
                                <Countdown endPromotionDate={new Date(countDownFinish)} isHeadbanner/>
                            </> 
                        } 
                    </MarqueeWrapperMobile>
                }
            </MarqueeContainer>
        </StyledBanner>
    )
}
 
export default HeadBanner;

