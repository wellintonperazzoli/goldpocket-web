import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import Loading from "../../../Layout/Loading";
import List from "./LocationsList";

const url = RequestUrl.Locations;
const name = "Locations"
export default class LocationsIndex extends Component {
    state = { loading: true }

    componentDidMount = () => this.loadAll()

    loadAll = () => {
        this.setState({ loading: true })
        RequestService.get(url, null, (response) =>
            this.setState({ loading: false, data: response.data }))
    }

    render = () =>
        <div className="widget">
            <div className="widget__title">
                {name} List
            </div>
            {
                this.state.loading ?
                    <Loading className="margin-center mt-1 mb-1" /> :
                    <List data={this.state.data} />
            }
        </div>
}