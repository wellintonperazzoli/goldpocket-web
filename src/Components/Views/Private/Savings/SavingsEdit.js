import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import Loading from "../../../Layout/Loading";
import RequestUrl from "../../../../Config/RequestUrl";
import CategoriesForm from "./SavingsForm";
import { getDateInput, isEmpty } from "../../../../Utils/Utils";
import { alertContext } from "../../../../Providers/AlertProvider";
import BackButton from "../../../Layout/BackButton";
import RequestService from '../../../../Services/RequestService';

const url = "/Savings/"
export default class SavingsEdit extends FormComponent {
    static contextType = alertContext;
    fields = ["Date:required", "Value:required", "Id"]

    constructor(props) {
        super(props)
        this.getFormData();
        this.state = {
            formData: this.formData,
            errors: this.errors,
            validations: this.validations,
            redirect: false,
            loading: true,
            submitted: false,
        }
    }

    componentDidMount() {
        RequestService.get(RequestUrl.Savings + this.props.params.id, null, (response) => {
            let data = response.data;
            let formData = {
                Date: getDateInput(data.dateTime),
                Value: data.value,
                Id: data.id
            };

            this.setState({
                formData: formData,
                loading: false,
                redirect: isEmpty(data),
                data: data,
            })
        }, () => {
            this.setState({
                redirect: true
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({
                submitted: true,
            })
            RequestService.put(RequestUrl.Savings, {
                id: this.state.formData.Id,
                dateTime: this.state.formData.Date,
                value: this.state.formData.Value
            }, (e) => {
                this.context.newAlert("alert-success", (<p>Saving {this.state.formData.Name} updated!</p>))
                this.setState({
                    redirect: true
                })
            }, (e) => {
                this.setState({
                    submitted: false,
                })
                this.context.newAlert("alert-danger", (<p>{e.response?.data}</p>))
            })
        }
    }

    render() {
        if (this.state.redirect)
            return (
                <Navigate to={url} />
            );

        if (this.state.loading)
            return (
                <Loading />
            )

        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title form-title">
                        Edit Saving
                    </div>
                    <div className="widget__body">
                        <form onSubmit={this.handleSubmit}>
                            <CategoriesForm formData={this.state.formData} updateForm={this.updateFormData} errors={this.state.errors} />
                            <div className="form-actions">
                                {
                                    this.state.submitted ? 
                                    (<Loading />) :
                                    <input type="submit" value="Update" className="btn-success mr-2" />
                                }
                                <BackButton />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}