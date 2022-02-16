import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import BarChart from "../../../Layout/BarChart";

export default class ItemsByCategory extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        RequestService.get(RequestUrl.itemsCategoryChart, null, (response) => {
            this.setState({
                data: response.data
            })
        })
    }
    render = () => (
            <BarChart
                data={this.state.data}
                title={"Items Graph"}
                className={this.props.className} />
        )
}


