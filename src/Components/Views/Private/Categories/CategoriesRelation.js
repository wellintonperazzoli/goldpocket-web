import { Component } from "react";
import { toCurrency, toDate } from "../../../../Utils/Utils";
import WidgetList from "../../../Layout/WidgetList";

export default class CategoriesRelation extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            hasRelation: false,
            data: this.props.data
        }
    }
    componentDidMount() {
        this.getRelation(this.props.data);
    }



    getRelation = (data) => {
        if (data.expenseDetails?.length > 0) {
            let relationHeaders = [
                "Location",
                "Date",
                "Total",
                "Description"
            ]

            let  relationTypes = [
                "string",
                "date",
                "currency",
                "string"
            ]
            this.setState({
                relationData: data.expenseDetails.map((x) => {
                    return {
                        id: x.id,
                        [relationHeaders[0]]: x.location,
                        [relationHeaders[1]]: toDate(x.dateTime),
                        [relationHeaders[2]]: toCurrency(x.totalValue),
                        [relationHeaders[3]]: x.description
                    }
                }),
                relationHeaders: relationHeaders,
                relationTypes: relationTypes,
                hasRelation: true,
                relationUrl: "/Expenses/"
            })
        }
        if (data.itemDetails.length > 0) {
            let relationHeaders = [
                "Name",
                "Recent Price",
                "Average Price"
            ]

            let  relationTypes = [
                "string",
                "string",
                "string"
            ]
            this.setState({
                relationData: data.itemDetails.map((x) => {
                    return {
                        id: x.id,
                        [relationHeaders[0]]: x.name,
                        [relationHeaders[1]]: x.recentPriceText,
                        [relationHeaders[2]]: x.averagePriceText,
                    }
                }),
                relationHeaders: relationHeaders,
                relationTypes: relationTypes,
                hasRelation: true,
                relationUrl: "/Items/"
            })
        }
    }

    render() {
        let relation = (<></>)

        if (this.state.hasRelation) {
            relation = (
                <>
                    <div className="widget__subtitle">
                        {this.state.data.typeName}s in this category
                    </div>
                    <WidgetList title={this.state.data.typeName} data={this.state.relationData} headers={this.state.relationHeaders} url={this.state.relationUrl} tableheadertypes={this.state.relationTypes} deletable={false} editable={false} create={false}/>
                </>
            )
        }


        return relation;
    }
}