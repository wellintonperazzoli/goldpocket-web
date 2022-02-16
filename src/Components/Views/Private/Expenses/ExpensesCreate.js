import ExpensesForm from "./ExpensesForm";
import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import { alertContext } from "../../../../Providers/AlertProvider";
import { currentDate } from "../../../../Utils/Utils";
import RequestUrl from "../../../../Config/RequestUrl";
import BackButton from "../../../Layout/BackButton";
import RequestService from "../../../../Services/RequestService";


export default class ExpensesCreate extends FormComponent {
    static contextType = alertContext;

    fields = [
        "Id",
        "Location:required",
        "Category:required",
        "Date:required",
        "Items|itemFields",
        "Description",
        "Total"
    ]

    itemFields = [
        "Id",
        "Name:required",
        "Category:required",
        "Unit Type:required",
        "Quantity:required|number",
        "Price:required|number",
    ]

    constructor(props) {
        super(props)
        this.getFormData({
            Date: currentDate()
        });
        this.state = {
            formData: this.formData,
            errors: this.errors,
            validations: this.validations,
            redirect: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isValid()) {
            let data = this.state.formData;
            let requestData = {
                Location: data.Location,
                Category: data.Category,
                dateTime: data.Date,
                Description: data.Description,
                expenseItems: []
            }

            data.Items.forEach(i => {
                requestData.expenseItems.push({
                    Name: i.Name,
                    CategoryName: i.Category,
                    MeasureType: i["Unit Type"],
                    Quantity: i.Quantity,
                    Price: i.Price
                })
            })

            RequestService.post(RequestUrl.Expenses, requestData, () => {
                this.context.newAlert("alert-success", (<p>Expense created!</p>))
                this.setState({
                    redirect: true
                })
            }, (e) => {
                this.context.newAlert("alert-danger", (<p>{e.response?.data}</p>))
            })
        }
    }

    updateErrors = (errors) => {
        this.setState({
            errors: errors
        })
    }

    addItem = (e) => {
        e.preventDefault();
        const data = this.generateData({}, this.itemFields)
        const items = this.state.formData.Items;
        const itemerrors = this.state.errors.Items;
        const validations = this.state.validations.Items;

        itemerrors.push(data[2])
        validations.push(data[1])
        items.push(data[0])
    }

    deleteItem = (e, key) => {
        e.preventDefault();
        const items = this.state.formData.Items;
        const itemerrors = this.state.errors.Items;
        const validations = this.state.validations.Items;
        if (items.length > 1) {
            items.splice(key, 1);
            validations.splice(key, 1);
            itemerrors.splice(key, 1);
        }
    }

    render() {
        if (this.state.redirect) return (<Navigate to='/Expenses' />);

        return (
            <>
                <div className="widget col-xxl-6">
                    <div className="widget__title form-title">
                        New Expense
                    </div>
                    <div className="widget__body">
                        <form onSubmit={this.handleSubmit}>
                            <ExpensesForm formData={this.state.formData} updateForm={this.updateFormData} errors={this.state.errors} updateErrors={this.updateErrors} addItem={this.addItem} deleteItem={this.deleteItem} />
                            <div className="form-actions">
                                <input type="submit" value="Create" className="btn-success mr-2" />
                                <BackButton />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}