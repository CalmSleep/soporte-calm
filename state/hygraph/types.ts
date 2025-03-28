export interface IHygraphState {
    bigBanners?: IPlainImageSlide[] | null
    bannerAndCucarda?: IBannerAndCucarda[]
    componentsData?: IComponentData[]
    headBanners?: IHeaderBanner[]
    pillsData?: IPillsData[]
    bannerSidecart?: {
        show: boolean;
        colorText: string;
        colorBackground: string;
        textBanner: string;
    }
    tycPromotion?: {
        promo: {
            html: string
        }[]
    }
    tyc?: {
        textOffer: {
            html: string;
        }[]
    }
    popup?: IPopUp
    clearCache?: boolean
    revalidate?: boolean
}

export interface IBannerAndCucarda {
    id: string,
    banner?: string,
    cucarda?: string
    cupon?: string
    categoria?: string
    promoFija?: string[]
    idProductoFijo?: string
    promo?: string
}

export interface IComponentData {
    id: string
    schema: string
    data: any
}

export interface IHeaderBanner {
    id: string;
    categoria: string;
    comienzoUltimosDias: string;
    comienzoUltimoDia: string;
    comienzoExtendimos: string;
    ultimosDiasExtendimos: string;
    utimoDiaExtendimos: string;
    textoInferior: { 
        html: string
    }
    textoUltimosDias: {
        html: string
    }
    textoUltimoDia: {
        html: string
    }
}

export interface IPillsData {
    texto: string;
    categoria: string;
    colorFondo: string;
}

export interface IPopUp {
    comienzo: string;
    final: string;
    imagenMobile: string
    imagenDesktop: string;
    titulo: {
        html: string
    };
    descripcion: {
        html: string
    };
    textoRemarcado?: string;
    cupon?: string;
    botonEmailTexto?: string;
    botonColorFondo?:{
        hex : string
    };
    botonTextoColor?:{
        hex : string
    };
    botonHoverFondo?:{
        hex : string
    };
    contador?: string
    landingsMostrar?: string
    textoInferior?: {
        html : string
    };
}


export interface IPlainImageSlide {
    titulo: string
    cucarda: string
/*     template: number */
    order: number
    subtitulo: {
        html : string
    }
    botonTexto: string
    botonColorFondo: {
        hex : string
    }
    botonTextoColor: {
        hex : string
    },
    botonHoverFondo: {
        hex : string
    },
    redireccionBoton: string
    videoDesktop?: string
    videoMobile?: string
    imagenMobile: string
    imagenDesktop: string
    textoSuperior: {
        html : string
    }
    botonTextoSecundario: string
    redireccionSecundario: string
    templateDesktop: string;
    templateMobile: string;
}