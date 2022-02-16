import { Component } from "react";
import { toCurrency, toDate } from "../../../../Utils/Utils";
import WidgetList from "../../../Layout/WidgetList";

export default class ExpensesList extends Component {
    title = 'Expenses'
    url = '/Expenses/'
    headers = [
        "Location",
        "Date",
        "Total",
        "Description",
    ];
    headerTypes = [
        "string",
        "date",
        "currency",
        "string"
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.id,
                [this.headers[0]]: x.location,
                [this.headers[1]]: toDate(x.dateTime),
                [this.headers[2]]: toCurrency(x.totalValue),
                [this.headers[3]]: x.description
            }
        })

        return (
            <WidgetList 
                title={this.title}  
                data={data} 
                headers={this.headers} 
                url={this.url} 
                tableheadertypes={this.headerTypes} 
                deletable={true} 
                deleteAction={this.props.deleteAction}
                create={this.props.create}
            />
        )
    }
}