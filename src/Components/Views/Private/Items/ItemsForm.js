import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import CustomInput from "../../../Form/CustomInput";
import CustomInputSelect from "../../../Form/CustomInputSelect";
import Loading from "../../../Layout/Loading";

export default class ItemsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            options: [],
        }
    }

    componentDidMount() {
        RequestService.get(RequestUrl.itemCategories, null, response => {
            this.setState({
                loading: false,
                options: response.data
            })
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
                        <div className="col-sm-4">
                            <CustomInput label="Name" name="Name" value={this.props.formData.Name} onChange={this.handleInnerInputChange} error={errors.Name} />
                        </div>
                        <div className="col-sm-4">
                            <CustomInputSelect label="Category" name="Category" options={this.state.options} value={this.props.formData.Category} onChange={this.handleInnerInputChange} error={errors.Category}/>
                        </div>
                        <div className="col-sm-4">
                            <CustomInput label="Measure Type" name="Measure Type" value={this.props.formData["Measure Type"]} onChange={this.handleInnerInputChange} disabled={true} />
                        </div>
                        <input type="hidden" name="Id" value={this.state.id} onChange={this.handleInputChange} />
                    </div>
                </div>
            )
    }
}