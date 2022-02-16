import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import DoughnutChart from "../../../Layout/DoughnutChart";

export default class Expenses extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        RequestService.get(RequestUrl.expenseDoughnut, null, (response) => {
            this.setState({
                data: response.data
            })
        })
    }
    render = () => (
            <DoughnutChart
                data={this.state.data}
                title={"Expenses"}
                className={this.props.className} />
        )
}


