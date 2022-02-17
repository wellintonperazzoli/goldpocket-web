import React, { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import { isEmpty, toCurrency } from "../../../../Utils/Utils";
import CustomInput from "../../../Form/CustomInput";
import CustomInputSelect from "../../../Form/CustomInputSelect";
import Loading from "../../../Layout/Loading";
import ExpenseItemForm from "./ExpenseItemForm";

export default class ExpensesForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            expenseOptions: [],
            locationOptions: [],
            itemOptions: [],
        }
    }

    componentDidMount() {
        RequestService.multiple(
            'get',
            [
                RequestUrl.expenseCategories,
                RequestUrl.autocompleteLocations,
                RequestUrl.autocompleteItem,
            ],
            null,
            (response) => {
                this.setState({
                    expenseOptions: [...response[0].data],
                    locationOptions: [...response[1].data],
                    itemOptions: [...response[2].data],
                    loading: false
                })
            })
    }

    handleInnerInputChange = (name, value) => {
        this.setState({
            [name]: value
        });
        this.props.updateForm(name, value)
    }

    handleInputChange = (e) => {
        this.props.updateForm(e.target.name, e.target.value)
    }

    handleItemChange = (name, value, key) => {
        this.props.updateForm(`Items.${key}.${name}`, value)
    }

    getTotal = () => {
        let items = this.props.formData.Items;
        let total = 0;
        items.forEach(i => {
            let unitType = isEmpty(i["Unit Type"])? 0 : i["Unit Type"];
            let quantity = isEmpty(i["Quantity"])? 0 : i["Quantity"];
            let price = isEmpty(i["Price"])? 0 : i["Price"];
            let value = unitType === 0? quantity * price : price;
            total = parseFloat(value) + parseFloat(total);
        })

        return toCurrency(total)
    }


    itemList = () => {
        const items = this.props.formData.Items;
        const errors = this.props.errors;
        return (
            <>
                <div className="form__header">
                    <h3>Item List</h3>
                </div>
                <div className="card-box expenseItemBox">
                    {
                        items?.map((item, key) => {
                            return (
                                <ExpenseItemForm hasDelete={items.length > 1} item={item} number={key} key={key} deleteAction={(e) => this.props.deleteItem(e, key)} onChange={this.handleItemChange} errors={errors.Items[key]}/>
                            )
                        })
                    }
                    <div className="row overflow-hidden">
                        <div className="col-12 flex-flex-end pt-2 pr-2">
                            <button className="btn-success btn-md" id="addItem" onClick={this.props.addItem}><span>Add</span> </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        const errors = this.props.errors;
        if (this.state.loading) return (<Loading />)


        return (
            <div className="form clearfix-s">
                <div asp-validation-summary="ModelOnly" className="danger"></div>
                <div className="row">
                    <div className="col-sm-4">
                        <CustomInputSelect label="Location" name="Location" options={this.state.locationOptions} value={this.props.formData.Location} onChange={this.handleInnerInputChange} error={errors.Location} />
                    </div>
                    <div className="col-sm-4">
                        <CustomInputSelect label="Category" name="Category" options={this.state.expenseOptions} value={this.props.formData.Category} onChange={this.handleInnerInputChange} error={errors.Category} />
                    </div>
                    <div className="col-sm-4">
                        <CustomInput type="date" label="Date" name="Date" value={this.props.formData.Date} onChange={this.handleInnerInputChange} error={errors.Date} />
                    </div>
                </div>
                {this.itemList()}
                <div className="row mt-1 mb-5">
                    <div className="col-9">
                        <CustomInput label="Description" name="Description" value={this.props.formData.Description} onChange={this.handleInnerInputChange} error={errors.Description} />
                    </div>
                    <div className="col-3">
                        <CustomInput label="Total" name="Total" value={this.getTotal()} disabled={true} />
                    </div>
                </div>
                <input type="hidden" name="Id" value={this.state.id} />
            </div>
        )
    }
}