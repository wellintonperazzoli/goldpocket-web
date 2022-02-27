import { Component } from "react";
import Loading from "../../../Layout/Loading";
import { alertContext } from "../../../../Providers/AlertProvider";
import RequestUrl from "../../../../Config/RequestUrl";
import List from "./SavingsList";
import RequestService from '../../../../Services/RequestService';

const url = RequestUrl.Savings;
const name = "Saving"
export default class SavingsIndex extends Component {
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
        <div className="widget">
            <div className="widget__title">
                {name} List
            </div>
            {
                this.state.loading ?
                    <Loading className="margin-center mt-1 mb-1" /> :
                    <List data={this.state.data} 
                        deleteAction={this.deleteAction} 
                        deletable={true} 
                        />
            }
        </div>
}