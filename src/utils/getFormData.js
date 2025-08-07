export const getFormData = (data, isUpdate = false) => {
    const fileData = new FormData();

    Object.keys(data).forEach((key) => {
        if(Array.isArray(data[key])){
            if(key !== 'images'){
                data[key].forEach((item) => {
                    fileData.append(`${key}[]`, JSON.stringify(item));
                });
            } 
            
            data[key].forEach((image) => {
                if(!image.file) return;

                fileData.append('images[]', image.file);
                fileData.append('imagesInfo[]', JSON.stringify({
                    name: image.file.name,
                    is_primary: image.is_primary
                }));
            });
        }else if(typeof data[key] === 'object' && data[key] !== null){
            fileData.append(key, JSON.stringify(data[key]));
        }else{
            fileData.append(key, data[key]);
        }
    });

    if(isUpdate) fileData.append('_method', 'PUT');

    return { fileData };
}