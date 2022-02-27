import { Link, Navigate } from "react-router-dom";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from '../../../../Services/RequestService';
import { isEmpty, toCurrency, toDate } from "../../../../Utils/Utils";
import FormComponent from "../../../Form/FormComponent";
import BackButton from "../../../Layout/BackButton";
import CustomView from "../../../Layout/CustomView";
import Loading from "../../../Layout/Loading";

const url = "/Savings/"
export default class SavingsView extends FormComponent {
    fields = ["Date", "Value"]

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
        RequestService.get(RequestUrl.Savings + this.props.params.id, null, (response) => {
            
            let data = response.data;
            let formData = {
                Date: toDate(data.dateTime),
                Value: toCurrency(data.value),
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
                <Navigate to={url} />
            );

        if (this.state.loading)
            return (
                <Loading />
            )




        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title">
                        Saving Information
                    </div>
                    <CustomView data={this.state.formData} />
                    <div className="widget__body">
                        <Link to={`${url}Edit/${this.props.params.id}`} className="btn-warning mr-2">Edit</Link>
                        <BackButton />
                    </div>
                </div>
            </>
        )
    }
}