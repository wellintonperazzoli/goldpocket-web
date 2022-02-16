import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import Loading from "../../../Layout/Loading";
import List from "./ExpenseList";
import { alertContext } from "../../../../Providers/AlertProvider";
import ExpensesByCategory from "../Charts/ExpensesByCategory";
import ItemsByCategory from "../Charts/ItemsByCategory";
import RequestService from "../../../../Services/RequestService";

const url = RequestUrl.Expenses;
const name = "Expense"
export default class ExpensesIndex extends Component {
    static contextType = alertContext

    state = { loading: true }

    componentDidMount = () => this.loadAll()

    loadAll = () => {
        this.setState({ loading: true })
        RequestService.get(url, null, (response) => 
            this.setState({ loading: false, data: response.data }))
    }

    deleteAction = (item) => RequestService.delete(url + item.id, (response) => {
        this.context.newAlert("alert-success", (<p>{name} {item.Name} deleted</p>))
        this.loadAll()
    })

    render = () => 
        <>
            <div className="widget">
                <div className="widget__title">
                    {name} List
                </div>
                {
                    this.state.loading ?
                        <Loading className="margin-center mt-1 mb-1" /> :
                        <List data={this.state.data} deleteAction={this.deleteAction} />
                }
            </div>
            <ExpensesByCategory className={"col-md-6"} />
            <ItemsByCategory className={"col-md-6"} />
        </>
}