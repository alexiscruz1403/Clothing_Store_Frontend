const BASE_URL = 'https://clothingstorebackend-production-8f6e.up.railway.app';

export const getImgSrc = (imageUrl) => {
    return imageUrl ? `${BASE_URL}${imageUrl}` : `${BASE_URL}/storage/default.png`;
}