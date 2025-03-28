import axios from 'axios';

export const getPillsData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };

  try {
    const response = await axios.get(
      `/api/hygraph/pills_data`,
      requestConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getBigBannersData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/bigbanners`,
    requestConfig
  );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getHeadBannersData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/head_banners_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProductAndCategorySEOData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/category_seo_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getSidecartData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/sidecart_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getStaticSEOData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/other_static_seo_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getTYCContentData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/tyc_content_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getTYCPromoContentData = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/tyc_promotion_content_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getPopup = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/popup_data`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getBannerAndCucarda = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/banner_and_cucarda`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getBannerAndCucardaFijos = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };
  try {
  const response = await axios.get(
    `/api/hygraph/banner_and_cucarda_fijos`,
    requestConfig
  );
  return response.data;
  } catch (error) {
    throw error;
  }
}

export const getClearCache = async (urls: string[]) => {
  try {
    const response = await fetch('/api/clearCache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ urls })
    });

    const data = await response.json();

    if (data.success) {
      console.log('Cache purged successfully');
      return data.success;
    } else {
      console.error('Failed to purge cache:', data.message);
      return data;
    }
  } catch (error) {
    console.error('Error purging cache:', error);
    throw error;
  }
};

export const getRevalidate = async (path: string) => {
  try {
    const response = await fetch(`/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: 'NNiMvgSRPEo0gsUeixp6g0aLOYu35N9o', 
      }),
    });

    const data = await response.json();

    if (data.revalidated) {
      console.log('Revalidación exitosa');
      return data.revalidated;
    } else {
      console.error('Fallo en la revalidación:', data.error);
      return data;
    }
  } catch (error) {
    console.error('Error en la revalidación:', error);
    throw error;
  }
};
