import { Component } from "react";
import { uid } from "../../Utils/Utils";
import Loading from "./Loading";

export default class CustomView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
            data: this.getData(this.props.data)
        })
    }


    getData = (paramData) => {
        let data = [];
        if (typeof paramData) {
            Object.keys(paramData).forEach((k) => {
                data.push({
                    key: uid(),
                    label: k,
                    value: paramData[k]
                })
            })
        }
        return data;
    }
    render() {
        if (this.state.loading)
            return (<Loading />)

        return (
            <div className="table-box">
                <div className="table-info">
                    {
                        this.state.data.map(d => {
                            return (
                                <div key={d.key}>
                                    <div>{d.label}</div>
                                    <div>{d.value}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}