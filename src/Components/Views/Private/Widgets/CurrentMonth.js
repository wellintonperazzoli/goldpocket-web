import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import Loading from "../../../Layout/Loading";

export default class CurrentMonth extends Component {
    state = {
        value: (<Loading className="d-inline-block"/>)
    }

    componentDidMount() {
        RequestService.get(RequestUrl.currentMonth, null, (response) => {
            this.setState({
                value: response.data
            })
        })
    }

    render = () => (
        <div className="widget col-xs-12">
            <div className="widget__title">
                Current month: <span className="primary">{this.state.value}</span>
            </div>
        </div>
    )

}