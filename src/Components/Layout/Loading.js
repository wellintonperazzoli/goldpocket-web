import { Component } from "react";

export default class Loading extends Component {
    render() {
        return (
            <div className={`loading-box ${this.props.className === undefined? "" : this.props.className}`}>
                <div className="loading"></div>
            </div>
        )
    }
}