import { Component } from "react";
import WidgetList from "../../../Layout/WidgetList";

export default class ItemsList extends Component {
    title = 'Item'
    url = '/Items/'
    headers = [
        "Name",
        "Category",
        "Recent Price",
        "Average Price"
    ];
    headerTypes = [
        "string",
        "string",
        "string",
        "string",
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.id,
                [this.headers[0]]: x.name,
                [this.headers[1]]: x.categoryName,
                [this.headers[2]]: x.recentPriceText,
                [this.headers[3]]: x.averagePriceText,
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