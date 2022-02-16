import { Component } from "react";
import AlertProvider, { alertContext } from "./AlertProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider, { modalContext } from "./ModalProvider";

export default class ProviderManager extends Component {
    render() {
        return (
            <AlertProvider>
                <ModalProvider>
                    <alertContext.Consumer>
                        {(alertContext) => (
                            <modalContext.Consumer>
                                {(modalContext) => (
                                    <AuthProvider alertContext={alertContext} modalContext={modalContext}>
                                        {this.props.children}
                                    </AuthProvider>
                                )}
                            </modalContext.Consumer>
                        )}
                    </alertContext.Consumer>
                </ModalProvider>
            </AlertProvider>
        )
    }
}