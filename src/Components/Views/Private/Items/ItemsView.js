import { Link, Navigate } from "react-router-dom";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import { isEmpty } from "../../../../Utils/Utils";
import FormComponent from "../../../Form/FormComponent";
import BackButton from "../../../Layout/BackButton";
import CustomView from "../../../Layout/CustomView";
import Loading from "../../../Layout/Loading";
import PriceChange from "./PriceChange";

export default class ItemsView extends FormComponent {
    fields = ["Name", "Recent Price", "Average Price"]
    url = "/Items/"

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
        RequestService.get(RequestUrl.Items + this.props.params.id, null, (response) => {
            
            let data = response.data;
            
            let formData = {
                [this.fields[0]]: data.name,
                [this.fields[1]]: data.recentPriceText,
                [this.fields[2]]: data.averagePriceText,
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
                        Item Information
                    </div>
                    <CustomView data={this.state.formData} />
                    <PriceChange data={this.state.data?.expenseItems} />
                    <div className="widget__body">
                        <Link to={`${this.url}Edit/${this.props.params.id}`} className="btn-warning mr-2">Edit</Link>
                        <BackButton />
                    </div>
                </div>
            </>
        )
    }
}