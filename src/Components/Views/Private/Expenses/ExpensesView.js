import { Link, Navigate } from "react-router-dom";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import { toCurrency, toDate } from "../../../../Utils/Utils";
import FormComponent from "../../../Form/FormComponent";
import BackButton from "../../../Layout/BackButton";
import CustomView from "../../../Layout/CustomView";
import Loading from "../../../Layout/Loading";
import WidgetList from "../../../Layout/WidgetList";

export default class ExpensesView extends FormComponent {
    url = "/Expenses/"
    fields = [
        "Location",
        "Category",
        "Date",
        "Description",
        "Total"
    ]

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            loading: true,
            itemsData: []
        }
    }

    relationUrl = "/Items/"
    itemListHeaders = [
        "Name",
        "Price",
        "Quantity",
        "Total Price",
    ];
    itemListHeaderTypes = [
        "string",
        "string",
        "number",
        "currency"
    ]

    componentDidMount() {
        RequestService.get(RequestUrl.Expenses + this.props.params.id, null, (response) => {
            let data = response.data;
            let formData = {
                Id: data.id,
                Location: data.location,
                Category: data.category,
                Date: toDate(data.dateTime),
                Description: data.description,
                Total: toCurrency(data.totalValue),
            }

            let itemsData = data.expenseItems.map((x) => {
                return {
                    id: x.itemId,
                    [this.itemListHeaders[0]]: x.name,
                    [this.itemListHeaders[1]]: x.pricePerUnitText,
                    [this.itemListHeaders[2]]: x.quantity,
                    [this.itemListHeaders[3]]: toCurrency(x.total)
                }
            })

            this.setState({
                formData: formData,
                itemsData: itemsData,
                loading: false
            })
        }, (e) => {
            this.setState({
                redirect: true
            })
        })
    }

    render() {
        if (this.state.redirect)
            return (
                <Navigate to='/Expenses' />
            );

        if (this.state.loading)
            return (
                <Loading />
            )




        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title">
                        Expense Information
                    </div>
                    <CustomView data={this.state.formData} />
                    <div className="widget__subtitle">
                        Items in this expense
                    </div>
                    <WidgetList
                        data={this.state.itemsData}
                        headers={this.itemListHeaders}
                        url={this.relationUrl}
                        tableheadertypes={this.itemListHeaderTypes}
                        deletable={false}
                        editable={false}
                        create={false} />
                    <div className="widget__body">
                        <Link to={`${this.url}Edit/${this.props.params.id}`} className="btn-warning mr-2">Edit</Link>
                        <BackButton />
                    </div>
                </div>
            </>
        )
    }
}