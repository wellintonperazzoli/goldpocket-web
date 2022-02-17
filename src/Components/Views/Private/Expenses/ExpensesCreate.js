import ExpensesForm from "./ExpensesForm";
import { Navigate } from "react-router-dom";
import FormComponent from "../../../Form/FormComponent";
import { alertContext } from "../../../../Providers/AlertProvider";
import { currentDate } from "../../../../Utils/Utils";
import RequestUrl from "../../../../Config/RequestUrl";
import BackButton from "../../../Layout/BackButton";
import RequestService from "../../../../Services/RequestService";
import Loading from "../../../Layout/Loading";


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
            submitted: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({
                submitted: true,
            })
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
                this.setState({
                    submitted: false,
                })
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
        let data = this.generateData({}, this.itemFields)
        let formData = {...this.state.formData}
        let errors = {...this.state.errors};
        let validations = {...this.state.validations};

        errors.Items.push(data[2])
        validations.Items.push(data[1])
        formData.Items.push(data[0])

        this.setState({
            formData: formData,
            errors: errors,
            validations: validations,
        })
    }

    deleteItem = (e, key) => {
        e.preventDefault();
        let formData = {...this.state.formData}
        let errors = {...this.state.errors};
        let validations = {...this.state.validations};
        if (formData.Items.length > 1) {
            errors.Items.splice(key, 1);
            formData.Items.splice(key, 1);
            validations.Items.splice(key, 1);

            this.setState({
                formData: formData,
                errors: errors,
                validations: validations,
            })
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