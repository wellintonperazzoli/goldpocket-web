import React, { Component } from "react";


export const modalContext = React.createContext()
export default class ModalProvider extends Component {
    constructor(props) {
        super(props)
        this.yesClass = "btn btn-success";
        this.noClass = "btn btn-danger";
        this.state = {
            class: "modal",
            message: "",
            yesClass: this.yesClass,
            noClass: this.noClass,
            type: "warning",
            showModal: this.showModal,
            action: () => { }
        }
    }

    showModal = (message, action = () => { }, type = "warning", inverse = false) => {
        let yes = inverse ? this.noClass : this.yesClass;
        let no = inverse ? this.yesClass : this.noClass;
        this.setState({
            message: message,
            class: "modal show",
            yesClass: yes,
            noClass: no,
            action: action
        })
    }

    hideModal = () => {
        this.setState({
            class: "modal"
        })
    }

    doAction = () => {
        if (typeof this.state.action === "function")
            this.state.action()

        this.hideModal();
    }

    getIco = () => {
        return (
            <span><i className="fas fa-exclamation-triangle"></i></span>
        )
    }


    render() {
        return (
            <modalContext.Provider value={this.state}>
                <div className={this.state.class}>
                    <div className="modal-box">
                        <div className="modal-body">
                            <div className="modal-content">
                                <h2>{this.state.message}</h2>
                            </div>
                            <div className="modal-actions">
                                <button className={this.state.yesClass} onClick={this.doAction}>Yes</button>
                                <button className={this.state.noClass} onClick={this.hideModal}>No</button>
                            </div>
                        </div>
                        <div className="modal-ico">
                            {this.getIco()}
                        </div>
                    </div>
                </div>
                {this.props.children}
            </modalContext.Provider>
        );
    }
}