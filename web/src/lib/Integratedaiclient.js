const BASE_URL = import.meta.env.VITE_API_URL || '';

export const integratedAiClient = {
  stream: async (path, { body, signal, images = [] } = {}) => {
    const formData = new FormData();
    formData.append('message', JSON.stringify(body?.message || []));
    images.forEach((img, i) => formData.append(`image_${i}`, img));

    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      body: formData,
      signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response;
  },
};

export default integratedAiClient;
