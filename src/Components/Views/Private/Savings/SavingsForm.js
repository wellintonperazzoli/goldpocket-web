import { Component } from "react";
import CustomInput from "../../../Form/CustomInput";
import Loading from "../../../Layout/Loading";

export default class SavingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            options: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
        })
    }

    handleInnerInputChange = (name, value) => {
        this.setState({
            [name]: value
        });
        this.props.updateForm(name, value)
    }

    handleInputChange = (e) => {
        this.props.updateForm(e.target.name, e.target.value)
    }


    render() {
        const errors = this.props.errors;
        return this.state.loading ?
            (
                <Loading />
            ) :
            (
                <div className="form clearfix-s">
                    <div asp-validation-summary="ModelOnly" className="danger"></div>
                    <div className="row">
                        <div className="col-sm-6">
                            <CustomInput type="date" label="Date" name="Date" value={this.props.formData.Date} onChange={this.handleInnerInputChange} error={errors.Date} />
                        </div>
                        <div className="col-sm-6">
                            <CustomInput type="number" label="Value" name="Value" value={this.props.formData.Value} onChange={this.handleInnerInputChange} error={errors.Value}/>
                        </div>
                        <input type="hidden" name="Id" value={this.state.id} onChange={this.handleInputChange} />
                    </div>
                </div>
            )
    }
}