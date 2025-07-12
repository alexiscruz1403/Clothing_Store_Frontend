const BASE_URL = 'http://127.0.0.1:8000/storage/products/';

export const getImgSrc = (imageUrl) => {
    if (!imageUrl) return `${BASE_URL}default.png`; 
    return `${BASE_URL}${imageUrl}`;
}