import { Component } from "react";
import { toCurrency, toDate } from "../../../../Utils/Utils";
import WidgetList from "../../../Layout/WidgetList";

export default class SavingsList extends Component {
    title = 'Savings'
    url = '/Savings/'
    headers = [
        "Date",
        "Value",
    ];
    headerTypes = [
        "date",
        "currency",
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.id,
                [this.headers[0]]: toDate(x.dateTime),
                [this.headers[1]]: toCurrency(x.value),
            }
        })

        return (
            <WidgetList 
                title={this.title}  
                data={data} 
                headers={this.headers} 
                url={this.url} 
                tableheadertypes={this.headerTypes} 
                deletable={this.props.deletable}
                deleteAction={this.props.deleteAction}
                create={this.props.create}
            />
        )
    }
}