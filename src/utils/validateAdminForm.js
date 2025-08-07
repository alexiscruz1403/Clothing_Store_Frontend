import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, minValue, helpers } from '@vuelidate/validators'

export const validate = (inputs, imagesInfo = null, errors) => {
    const inputsValue = getInputsValue(inputs);
    const rules = getValidationRules(inputs);
    const v$ = useVuelidate(rules, inputsValue);
    v$.value.$touch();

    let isValid = !v$.value.$invalid;
    let validationErrors = v$.value.$errors;

    if(imagesInfo && !imagesInfo.hasPrimaryImage){
        isValid = false;
        validationErrors.push({
            $validator: 'hasPrimaryImage',
            $message: 'Deber seleccionar una imagen principal.'
        });
    }

    setErrors(validationErrors, errors);

    return {
        isValid: isValid,
        inputs: inputsValue,
    }
}

const getInputsValue = (inputs) => {
    return Object.keys(inputs).reduce((acc, key) => {
        acc[key] = inputs[key].value || '';
        return acc;
    }, {});
}

const getValidationRules = (inputs) => {
    const rules = {};
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        switch(input.type) {
            case 'text':
                rules[key] = { maxLength: maxLength(255) };
                break;
            case 'textarea':
                rules[key] = { maxLength: maxLength(500) };
                break;
            case 'number':
                rules[key] = { minValue: minValue(1) };
                break;
            case 'password':
                rules[key] = { minLength: minLength(8) };
                break;
            case 'select':
                rules[key] = { required };
                break;
            case 'stocks':
                rules[key] = { $each: helpers.forEach({ product_size: { required, maxLength: maxLength(255) }, stock_quantity: { required, minValue: minValue(1) }})};
                break;
        }
        if(input.required) rules[key].required = required;
    });
    return rules;
}

const setErrors = (validationErrors, errorsHandler) => {
    validationErrors.forEach(error => {
        switch(error.$validator) {
            case 'required':
                errorsHandler.value[error.$property] = 'Este campo es obligatorio.';
                break;
            case 'minLength':
                errorsHandler.value[error.$property] = `El campo debe tener al menos ${error.$params.min} caracteres.`;
                break;
            case 'maxLength':
                errorsHandler.value[error.$property] = `El campo no puede exceder los ${error.$params.maxLength} caracteres.`;
                break;
            case 'minValue':
                errorsHandler.value[error.$property] = `El campo debe tener al menos ${error.$params.minValue} caracteres.`;
                break;
            case 'hasPrimaryImage':
                errorsHandler.value.images = 'Debe haber una imagen principal.';
                break;
            default:
                errorsHandler.value[error.$property] = 'Error de validación.';
        }
    });
}