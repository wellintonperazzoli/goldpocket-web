import { Component } from "react";
import { toDate } from "../../../../Utils/Utils";
import WidgetList from "../../../Layout/WidgetList";

export default class PriceList extends Component {
    relationUrl = "/Expenses/"
    relationHeaders = [
        "Location",
        "Price",
        "Date",
    ]

    relationTypes = [
        "string",
        "string",
        "date",
    ]

    render() {
        let data = this.props.data.map((x) => {
            return {
                id: x.expenseId,
                key: x.id,
                [this.relationHeaders[0]]: x.locationName,
                [this.relationHeaders[1]]: x.pricePerUnitText,
                [this.relationHeaders[2]]: toDate(x.dateTime),
            }
        })

        return (
            <WidgetList 
                data={data} 
                headers={this.relationHeaders} 
                url={this.relationUrl} 
                tableheadertypes={this.relationTypes} 
                deletable={false} 
                editable={false} 
                create={false} />
        )

    }
}