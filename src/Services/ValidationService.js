import { isEmpty } from "../Utils/Utils";


export const ErrorMessages = (field, value, validation) => {
    if(isEmpty(validation)) return;
    let validations = validation.split("|");
    for (let i = 0; i < validations.length; i++) {
        switch (validations[i]) {
            case "required":
                if (isEmpty(value?.toString()))
                    return `Please inform a ${field.toLowerCase()}.`;
                break;
            case "number":
                if(isNaN(parseFloat(value)))
                    return `${field} must be a valid number.`
                break;
            default:
                break;
        }
    }
}


export const HasErrors = (errors) => {
    let error = false;
    Object.keys(errors).forEach(k => {
        if(!isEmpty(errors[k])) error = true;
    })
    console.log(error)
    return true;
}