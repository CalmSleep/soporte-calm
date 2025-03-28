export const isHipno = () => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE;
    return endpoint === 'https://hipno.com.ar/lab/headless-localhost' || 
           endpoint === 'https://hipno.com.ar/lab/headless';
}
