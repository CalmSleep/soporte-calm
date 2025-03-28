export const getEdeId = (): number => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE;
    
    if (endpoint === 'https://hipno.com.ar/lab/headless-localhost' || 
        endpoint === 'https://hipno.com.ar/lab/headless') {
      return 55050;
    }
    
    return 2024353;
  };