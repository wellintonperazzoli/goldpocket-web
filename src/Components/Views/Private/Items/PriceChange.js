import { Component } from "react";
import PriceList from "./PriceList";

export default class PriceChange extends Component
{   
    render() {
        let relation = (<></>)
        if (this.props.data.length > 0) {
            relation = (
                <>
                    <div className="widget__subtitle">
                        Price change history
                    </div>
                    <PriceList data={this.props.data} />
                </>
            )
        }
        return relation;
    }
}