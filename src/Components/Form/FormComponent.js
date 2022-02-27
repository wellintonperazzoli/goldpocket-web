import { Component } from "react";
import { ErrorMessages } from "../../Services/ValidationService";
import { isEmpty } from "../../Utils/Utils";

export default class FormComponent extends Component {
    getFormData = (data = {}) => {
        this.formData = {};
        this.validations = {};
        this.errors = { default: "" };
        this.getFields(data);
    }

    getFields = (data = {}, errors = {}) => {
        let [newformData, newvalidations, newerrors] = this.generateData(data, this.fields, errors)
        this.formData = newformData;
        this.validations = newvalidations;
        this.errors = newerrors;
    }

    generateData = (data = {}, fields = this.fields, e = {},) => {
        let formData = {};
        let errors = {};
        let validations = {};
        fields.forEach(regex => {
            let regexArr = regex.split(":");
            let nameComponent = regexArr[0];
            let nameArr = nameComponent.split("|")
            let name = nameArr[0]
            let list = nameArr[1]
            let isList = !isEmpty(list)

            if (!isList) {
                formData[name] = isEmpty(data[name]) ? "" : data[name];
                validations[name] = regexArr[1];
                errors[name] = "";
            }
            else {
                if (isEmpty(data[name])) data[name] = [{}];
                formData[name] = [];
                validations[name] = [];
                errors[name] = [];

                let innerList = this[list];

                data[name].forEach(i => {
                    let [fd, val, fe] = this.generateData(i, innerList, errors[data])
                    formData[name] = formData[name].concat([fd]);
                    validations[name] = validations[name].concat([val]);
                    errors[name] = errors[name].concat([fe]);
                })

            }


        })

        return [formData, validations, errors]
    }

    updateValue = (name, value, data, validations, errors) => {
        let nameSplit = name.split(".")
        Object.keys(data).forEach(k => {
            if (nameSplit[0] === k) {
                if (!isEmpty(nameSplit[1])) {
                    nameSplit.splice(0, 1)
                    this.updateValue(nameSplit.join("."), value, data[k], validations[k], errors[k])
                }
                else {
                    data[k] = value;
                    errors[k] = ErrorMessages(k, value, validations[k]);
                }
            }
        })
    }

    updateFormData = (name, value) => {
        let data = this.state.formData;
        let validations = this.state.validations
        let errors = this.state.errors

    
        this.updateValue(name, value, data, validations, errors);

        this.setState({
            formData: data,
            errors: errors,
            validations: validations,
        })
    }

    genValidationTree = (validations, data) => {
        let validationTree = [];
        if (typeof validations !== "object") return [];
        Object.keys(validations).forEach(k => {
            if (Array.isArray(validations[k])) {
                validations[k].forEach((ak, aky) => {
                    let innerSuffix = `${k}.${aky}.`;
                    let innerLabels = this.genValidationTree(ak, data[k][aky]);
                    for(let i = 0; i < innerLabels.length; i++){
                        validationTree.push({
                            name: innerSuffix + innerLabels[i].name,
                            value: innerLabels[i].value
                        })
                    }
                })
            }
            else {
                validationTree.push({
                    name: k,
                    value: data[k]
                })
            }
        })
        return validationTree;
    }

    

    hasError = (errors) => {
        let keys = Object.keys(errors);
        for(let i = 0; i < keys.length; i++){
            if(Array.isArray(errors[keys[i]])){
                for(let j = 0; j < errors[keys[i]].length; j++) {
                    let innerError = this.hasError(errors[keys[i]][j])
                    if(innerError === true) {
                        return true;
                    }
                }
            }
            else if (!isEmpty(errors[keys[i]])) {
                return true;
            }
        }
        
        return false;
    }

    isValid = () => {
        let validationTree = this.genValidationTree(this.state.validations, this.state.formData)
        validationTree.forEach(v => {
            this.updateFormData(v.name, v.value)
        })

        return !this.hasError(this.state.errors);
    }
}