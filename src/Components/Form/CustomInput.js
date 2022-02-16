import { Component } from "react";
import { isEmpty } from "../../Utils/Utils";

export default class CustomInput extends Component {

    onChange = (e) => {
        this.props.onChange(this.props.name, e.target.value)
    }

    errorMessage = () => {
        let hasError = !isEmpty(this.props.error);
        let showError = this.props.showError === undefined ? true : this.props.showError;
        if(showError) {
            return (
                <span className={hasError ? "danger field-validation-error" : "d-none"} data-valmsg-for="Name" data-valmsg-replace="true">
                    <span id={this.props.name + "-error"} >{this.props.error}</span>
                </span>
            )
        }

        return (<></>)
    }

    render() {
        var hasError = !isEmpty(this.props.error);
        var type = this.props.type? this.props.type : "text";
        return (
            <div className="form__group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input className={hasError ? "input-validation-error" : ""} autoComplete="off" type={type} id={this.props.name} name={this.props.name} value={this.props.value} disabled={this.props.disabled === true} onChange={this.onChange} />
                {this.errorMessage()}
            </div>
        )
    }
}