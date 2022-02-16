import { Component } from "react";
import WidgetList from "../../../Layout/WidgetList";

export default class LocationsList extends Component {
    title = 'Locations'
    url = '/Locations/'
    headers = [
        "Name",
        "Expenses",
        "Items",
    ];
    headerTypes = [
        "string",
        "number",
        "number"
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.id,
                [this.headers[0]]: x.name,
                [this.headers[1]]: x.expenseCount,
                [this.headers[2]]: x.itemCount,
            }
        })

        return (
            <WidgetList 
                title={this.title}  
                data={data} 
                headers={this.headers} 
                url={this.url} 
                tableheadertypes={this.headerTypes} 
                deletable={false} 
                create={false}
            />
        )
    }
}