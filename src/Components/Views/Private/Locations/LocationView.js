import { Link, Navigate } from "react-router-dom";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import { isEmpty } from "../../../../Utils/Utils";
import FormComponent from "../../../Form/FormComponent";
import BackButton from "../../../Layout/BackButton";
import CustomView from "../../../Layout/CustomView";
import Loading from "../../../Layout/Loading";
import ItemsList from "../Items/ItemsList";

export default class LocationsView extends FormComponent {
    fields = ["Name"]
    url = "/Locations/"

    constructor(props) {
        super(props)
        this.getFormData();
        this.state = {
            formData: this.formData,
            errors: this.errors,
            redirect: false,
            loading: true,
            hasRelation: false,
            relationUrl: "",
        }
    }

    componentDidMount() {
        RequestService.get(RequestUrl.Locations + this.props.params.id, null, (response) => {
            
            let data = response.data;
            
            let formData = {
                [this.fields[0]]: data.name
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
                    <div className="widget__title">
                        Location Information
                    </div>
                    <CustomView data={this.state.formData} />
                    <div className="widget__subtitle">
                        Items on location
                    </div>
                    <ItemsList data={this.state.data?.items} create={false}/>
                    <div className="widget__body">
                        <Link to={`${this.url}Edit/${this.props.params.id}`} className="btn-warning mr-2">Edit</Link>
                        <BackButton />
                    </div>
                </div>
            </>
        )
    }
}