import RequestUrl from "../../../../Config/RequestUrl";
import Form from "./CategoriesForm";
import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import { alertContext } from "../../../../Providers/AlertProvider";
import BackButton from "../../../Layout/BackButton";
import RequestService from '../../../../Services/RequestService';
import Loading from "../../../Layout/Loading";


export default class CategoriesCreate extends FormComponent {
    fields = ["Name:required", "Type:required", "Id"]

    static contextType = alertContext;

    constructor(props) {
        super(props)
        this.getFormData();
        this.state = {
            formData: this.formData,
            errors: this.errors,
            redirect: false,
            submitted: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({
                submitted: true,
            })
            RequestService.post(RequestUrl.Categories, {
                name: this.state.formData.Name,
                type: this.state.formData.Type
            }, () => {
                this.context.newAlert("alert-success", (<p>Category created!</p>))
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
                <Navigate to='/Categories' />
            );

        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title form-title">
                        New Category
                    </div>
                    <div className="widget__body">
                        <form onSubmit={this.handleSubmit}>
                            <Form formData={this.state.formData} updateForm={this.updateFormData} errors={this.state.errors} />
                            <div className="form-actions">
                                {
                                    this.state.submitted ? 
                                    (<Loading />) :
                                    <input type="submit" value="Create" className="btn-success mr-2" />
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