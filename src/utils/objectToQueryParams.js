export const objectToQueryParams = (obj) => {
    const params = new URLSearchParams();

    const keys = Object.keys(obj);

    keys.forEach((key) => {
        if(obj[key] !== undefined && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach(value => {
                    params.append(`${key}[]`, value);
                });
            } else {
                params.append(key, obj[key]);
            }
        }
    });
    
    return params.toString();
}