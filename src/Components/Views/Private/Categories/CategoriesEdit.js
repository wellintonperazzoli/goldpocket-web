import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import Loading from "../../../Layout/Loading";
import RequestUrl from "../../../../Config/RequestUrl";
import CategoriesForm from "./CategoriesForm";
import { isEmpty } from "../../../../Utils/Utils";
import CategoriesRelation from "./CategoriesRelation";
import { alertContext } from "../../../../Providers/AlertProvider";
import BackButton from "../../../Layout/BackButton";
import RequestService from '../../../../Services/RequestService';

export default class CategoriesEdit extends FormComponent {
    static contextType = alertContext;
    fields = ["Name:required", "Type:required", "Id:required"]

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
        RequestService.get(RequestUrl.Categories + this.props.params.id, null, (response) => {
            let data = response.data;
            let formData = {
                Name: data.name,
                Type: data.type,
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
            RequestService.put(RequestUrl.Categories, {
                id: this.state.formData.Id,
                name: this.state.formData.Name,
                type: this.state.formData.Type
            }, (e) => {
                this.context.newAlert("alert-success", (<p>Category {this.state.formData.Name} updated!</p>))
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

        if (this.state.loading)
            return (
                <Loading />
            )

        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title form-title">
                        Edit Category
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
                    <CategoriesRelation data={this.state.data} />
                </div>
            </>
        )
    }
}