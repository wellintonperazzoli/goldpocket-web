import { Component } from "react";
import RequestUrl from "../../../../Config/RequestUrl";
import RequestService from "../../../../Services/RequestService";
import { isEmpty } from "../../../../Utils/Utils";
import CustomInput from "../../../Form/CustomInput";
import CustomInputSelect from "../../../Form/CustomInputSelect";
import CustomSelect from "../../../Form/CustomSelect";
import Loading from "../../../Layout/Loading";

export default class ExpenseItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            itemOptions: [],
            autocompleteItem: [],
            itemMeasureTypes: [],
            loadedItemMeasureTypes: [],
            actualItemType: [],
            itemCategories: [],
        }
    }

    componentDidMount() {
        RequestService.multiple(
            'get',
            [RequestUrl.autocompleteItem, RequestUrl.measureTypes, RequestUrl.itemCategories, RequestUrl.itemMeasure ],
            null,
            (response) => {
                
                console.log(response[3].data)
                this.setState({
                    itemOptions: response[0].data,
                    itemMeasureTypes: response[1].data,
                    loadedItemMeasureTypes: response[1].data,
                    itemCategories: response[2].data,
                    actualItemType: response[3].data,
                    loading: false,
                })
            }
        )
    }

    isUnit = () => {
        let unit = this.props.item["Unit Type"];
        return unit === 0 || isEmpty(unit)
    }

    handleInputChange = (name, value) => {
        if(name === "Name") {
            let existingItem = this.state.actualItemType.find(x => x.name?.toUpperCase() === value?.toUpperCase());
            let existingItemValue = existingItem?.measureType;
            let existingItemCategory = existingItem?.category;
            if(existingItemValue !== undefined){
                this.setState((state,props) => {
                    let measuretype = state.itemMeasureTypes.filter(i => i.value === existingItemValue);
                    this.props.onChange("Unit Type", existingItemValue, this.props.number)
                    this.props.onChange("Category", existingItemCategory, this.props.number)
                    
                    return ({
                        itemMeasureTypes: measuretype
                    });
                });
            } else {
                this.setState((state, props) => ({
                    itemMeasureTypes: state.loadedItemMeasureTypes
                }))
            }
        }


        this.props.onChange(name, value, this.props.number)
    }

    deleteButton = () => {
        if (this.props.hasDelete) {
            return (
                <button
                    className="link-delete removeItem"
                    type="button"
                    onClick={this.props.deleteAction}>
                    <span>Delete</span>
                </button>
            )
        }

        return (<></>)
    }

    itemNumber = () => {
        return this.props.number ? this.props.number + 1 : 1;
    }

    quantityLabel = () => {
        return this.state.itemMeasureTypes.find(x => x.value === this.props.item["Unit Type"])?.label
    }

    priceLabel = () => {
        return this.props.item["Unit Type"] === 0? "Unit Price" : "Total Price";
    }

    errorBox = () => {
        const errors = this.props.errors;
        return (
            <div className="card-errors">
                {
                    Object.keys(errors).map((k) => {
                        let className = "danger "
                        if (!isEmpty(errors[k])) className += "field-validation-error";
                        return (
                            <span className={className} key={k}>
                                <span>
                                    {errors[k]}
                                </span>
                            </span>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const item = this.props.item;
        const errors = this.props.errors;

        if (this.state.loading) return (<Loading />)
        return (
            <div className="card expenseItem">
                <div className="card-title">
                    <span className="item-label">Item {this.itemNumber()}</span>
                    {this.deleteButton()}
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-xs-6">
                                <CustomInputSelect
                                    label="Name"
                                    name="Name"
                                    options={this.state.itemOptions}
                                    value={item["Name"]}
                                    error={errors["Name"]}
                                    showError={false}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-xs-6">
                                <CustomInputSelect
                                    label="Category"
                                    name="Category"
                                    options={this.state.itemCategories}
                                    value={item["Category"]}
                                    error={errors["Category"]}
                                    showError={false}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-4">
                                <CustomSelect
                                    label="Unit Type"
                                    name="Unit Type"
                                    options={this.state.itemMeasureTypes}
                                    value={item["Unit Type"]}
                                    error={errors["Unit Type"]}
                                    showError={false}
                                    onChange={this.handleInputChange}
                                    hideLabel={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    type="number"
                                    label={this.quantityLabel()}
                                    name="Quantity"
                                    value={item["Quantity"]}
                                    error={errors["Quantity"]}
                                    showError={false}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    type="number"
                                    label={this.priceLabel()}
                                    name="Price"
                                    value={item["Price"]}
                                    error={errors["Price"]}
                                    showError={false}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.errorBox()}
            </div>
        )
    }
}