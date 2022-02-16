import { Link, Navigate } from "react-router-dom";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from '../../../../Services/RequestService';
import { isEmpty } from "../../../../Utils/Utils";
import FormComponent from "../../../Form/FormComponent";
import BackButton from "../../../Layout/BackButton";
import CustomView from "../../../Layout/CustomView";
import Loading from "../../../Layout/Loading";
import CategoriesRelation from "./CategoriesRelation";

export default class CategoriesView extends FormComponent {
    fields = ["Name", "Type"]

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
        RequestService.get(RequestUrl.Categories + this.props.params.id, null, (response) => {
            
            let data = response.data;
            let formData = {
                Name: data.name,
                Type: data.typeName,
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
                <Navigate to='/Categories' />
            );

        if (this.state.loading)
            return (
                <Loading />
            )




        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title">
                        Category Information
                    </div>
                    <CustomView data={this.state.formData} />
                    <CategoriesRelation data={this.state.data} />
                    <div className="widget__body">
                        <Link to={`/Categories/Edit/${this.props.params.id}`} className="btn-warning mr-2">Edit</Link>
                        <BackButton />
                    </div>
                </div>
            </>
        )
    }
}