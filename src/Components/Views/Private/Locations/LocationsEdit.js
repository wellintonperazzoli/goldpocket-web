import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import Loading from "../../../Layout/Loading";
import RequestUrl from "../../../../Config/RequestUrl";
import { isEmpty } from "../../../../Utils/Utils";
import { alertContext } from "../../../../Providers/AlertProvider";
import LocationsForm from "./LocationsForm";
import ItemsList from "../Items/ItemsList";
import BackButton from "../../../Layout/BackButton";
import RequestService from "../../../../Services/RequestService";

export default class LocationsEdit extends FormComponent {
    static contextType = alertContext;
    fields = ["Name:required"]
    url = "/Locations"

    constructor(props) {
        super(props)
        this.getFormData();
        this.state = {
            formData: this.formData,
            errors: this.errors,
            validations: this.validations,
            redirect: false,
            loading: true
        }
    }

    componentDidMount() {
        RequestService.get(RequestUrl.Locations + this.props.params.id, null, (response) => {
            let data = response.data;
            let formData = {
                Name: data.name,
                Id: data.id
            };

            this.setState({
                formData: formData,
                loading: false,
                redirect: isEmpty(data),
                data: data
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
            RequestService.put(RequestUrl.Locations, {
                Id: this.props.params.id,
                Name: this.state.formData.Name,
            }, (e) => {
                this.context.newAlert("alert-success", (<p>Location {this.state.formData.Name} updated!</p>))
                this.setState({
                    redirect: true
                })
            }, (e) => {
                console.log(e.response)
                this.context.newAlert("alert-danger", (<p>{e.response?.data}</p>))
            })
        }
    }

    render() {
        if (this.state.redirect)
            return (
                <Navigate to={this.url} />
            );

        if (this.state.loading)
            return (
                <Loading />
            )

        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title form-title">
                        Edit Location
                    </div>
                    <div className="widget__body">
                        <form onSubmit={this.handleSubmit}>
                            <LocationsForm formData={this.state.formData} updateForm={this.updateFormData} errors={this.state.errors} />
                            <div className="form-actions">
                                <input type="submit" value="Update" className="btn-success mr-2" />
                                <BackButton />
                            </div>
                        </form>
                    </div>
                    <div className="widget__subtitle">
                        Items on location
                    </div>
                    <ItemsList data={this.state.data.items} create={false}/>
                </div>
            </>
        )
    }
}