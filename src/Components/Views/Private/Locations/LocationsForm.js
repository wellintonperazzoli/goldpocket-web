import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import CustomInput from "../../../Form/CustomInput";
import Loading from "../../../Layout/Loading";

export default class LocationsForm extends Component {
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
                    </div>
                </div>
            )
    }
}