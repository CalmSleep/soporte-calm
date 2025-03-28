export const productURLRedirectionByEnv = (url: string) => {
    const redirection = !process.env.NEXT_PUBLIC_REDIRECT_URL_BASE ? url : process.env.NEXT_PUBLIC_REDIRECT_URL_BASE + url;
    return redirection || "https://calmessimple.com.ar";
}