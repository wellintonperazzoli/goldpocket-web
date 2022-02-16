import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import BarChart from "../../../Layout/BarChart";

export default class ExpensesByCategory extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        RequestService.get(RequestUrl.expenseCategoryChart, null, (response) => {
            this.setState({
                data: response.data
            })
        })
    }
    render = () => (
        <BarChart
            data={this.state.data}
            title={"Expenses Graph"}
            className={this.props.className} />
    )
}


