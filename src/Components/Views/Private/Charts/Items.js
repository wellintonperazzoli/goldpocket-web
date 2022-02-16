import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import DoughnutChart from "../../../Layout/DoughnutChart";

export default class Items extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        RequestService.get(RequestUrl.itemDoughnut, null, (response) => {
            this.setState({
                data: response.data
            })
        })
    }
    render = () => (
            <DoughnutChart
                data={this.state.data}
                title={"Items"}
                className={this.props.className} />
        )
}


