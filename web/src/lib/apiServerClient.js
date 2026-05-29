const apiServerClient = {
  fetch: (path, options = {}) => {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    return fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  },
};

export default apiServerClient;
