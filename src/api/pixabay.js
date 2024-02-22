import axios from 'axios';

const pixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

pixabay.interceptors.request.use(config => {
  config.params = {
    key: '27839370-99dd6ddd44ecd058cc6f2562b',
    image_type: 'photo',
    orientation: 'horizontal',
    ...config.params,
  };
  return config;
});

const getImages = async params => {
  const { data } = await pixabay.get('', { params });
  return data;
};

export default getImages;
