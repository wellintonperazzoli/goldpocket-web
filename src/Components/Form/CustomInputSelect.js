import React, { Component } from "react";
import { isEmpty } from "../../Utils/Utils";
import CustomInput from "./CustomInput";

export default class CustomInputSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            open: false,
            selected: '',
        }

        this.ref = [];
        this.props.options.forEach((o, k) => {
            this.ref[k] = React.createRef();
        })

        this.action = {
            ArrowDown: (e) => {
                this.show()
                var current = this.props.value;
                var options = this.props.options;
                let name = this.props.name;
                let elementId = 0;
                for (let i = 0; i < options.length; i++) {
                    if (options[i] === current) {
                        let id = i + 1;
                        let opt = options[id]
                        elementId = i;
                        if (i < options.length - 1) {
                            this.props.onChange(name, opt)
                            this.setState({
                                selected: opt
                            })
                        }
                        break;
                    }
                }

                this.ref[elementId < options.length - 1 ? elementId + 1 : elementId].current.scrollIntoView()
            },
            ArrowUp: (e) => {
                this.show()
                var current = this.props.value;
                var options = this.props.options;
                let name = this.props.name;
                let elementId = 0;
                for (let i = options.length - 1; i > 0; i--) {
                    if (options[i] === current) {
                        elementId = i;
                        if (i > 0) {
                            let id = i - 1;
                            let opt = options[id]
                            this.props.onChange(name, opt)
                            this.setState({
                                selected: opt
                            })
                        }
                        break;
                    }
                }
                this.ref[elementId > 0 ? elementId - 1 : elementId].current.scrollIntoView()
            },
            Enter: (e) => {
                this.toggleSelect()
            }
        }
    }

    componentDidMount() {
        let selected = this.props.options.find(o => o === this.props.value);
        if (isEmpty(selected)) selected = this.props.options[0];

        this.setState({
            loading: false,
            selected: isEmpty(selected) ? "" : selected.label
        })

    }

    toggleSelect = (e) => {
        this.setState({
            open: !this.state.open
        })
    }

    select = (e) => {
        this.setState({
            open: false,
        })
        let name = this.props.name;
        let option = this.props.options.find(o => o === e.target.innerText);
        this.props.onChange(name, option)
    }

    hide = (e) => {
        this.setState({
            open: false
        })
    }

    show = (e) => {
        this.setState({
            open: true
        })
    }

    changeOption = (e) => {
        if (this.action[e.key]) {
            this.action[e.key](e);
            e.preventDefault();
        }

    }

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
        let hasError = !isEmpty(this.props.error);

        return this.state.loading ?
            (
                <CustomInput name={this.props.name} label={this.props.label} disabled={true} />
            ) :
            (
                <div className="form__group">
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    <div className={this.state.open ? "form__group--select show" : "form__group--select"} >
                        <input name={this.props.name}  className={hasError ? "input-validation-error" : ""} id={this.props.name} value={this.props.value} onMouseDown={this.toggleSelect} onFocus={this.show} onBlur={this.hide} onKeyDown={this.changeOption} onChange={this.onChange} />
                        <div className="selectoptions">
                            {
                                this.props.options?.map((o, k) => {
                                    let hide = o.trim().toUpperCase().includes(this.props.value.trim().toUpperCase()) ? "" : "d-none";
                                    let selected = this.props.value === o? "selected": "";
                                    return (
                                        <div ref={this.ref[k]} key={"div" + o + k} id={"div" + o + k} className={`${hide} ${selected}`} onMouseDown={this.select}>
                                            {o}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {this.errorMessage()}
                </div>
            )
    }
}