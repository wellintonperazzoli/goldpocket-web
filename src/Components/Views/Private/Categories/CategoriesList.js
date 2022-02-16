import { Component } from "react";
import WidgetList from "../../../Layout/WidgetList";

export default class CategoriesList extends Component {
    title = 'Categories'
    url = '/Categories/'
    headers = [
        "Name",
        "Type",
        "Times Used",
    ];
    headerTypes = [
        "string",
        "string",
        "number"
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.id,
                [this.headers[0]]: x.name,
                [this.headers[1]]: x.typeName,
                [this.headers[2]]: x.itemDetails.length + x.expenseDetails.length,
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