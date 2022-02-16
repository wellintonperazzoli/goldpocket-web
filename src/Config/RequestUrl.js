export const BaseUrl  = window.location.href.includes("localhost") ? 
    "https://localhost:49161" :
    "http://goldpocket.azurewebsites.net/api/";

const RequestUrl = {
    Token: BaseUrl + "/api/Auth/Token/",
    Register: BaseUrl + "/api/Auth/Register/",
    Expenses: BaseUrl + "/api/Expenses/",
    Locations: BaseUrl + "/api/Locations/",
    Items: BaseUrl + "/api/Items/",
    Categories: BaseUrl + "/api/Categories/",
    categoryTypes: BaseUrl + "/api/autocomplete/categoryTypes",
    itemCategories: BaseUrl + "/api/autocomplete/itemcategory",
    expenseCategories: BaseUrl + "/api/autocomplete/expensecategory",
    autocompleteLocations: BaseUrl + "/api/autocomplete/location",
    autocompleteItem: BaseUrl + "/api/autocomplete/item",
    measureTypes: BaseUrl + "/api/autocomplete/measureTypes",
    expenseCategoryChart: BaseUrl + "/api/Chart/expenseCategory",
    itemsCategoryChart: BaseUrl + "/api/Chart/itemCategory",
    expenseDoughnut: BaseUrl + "/api/Chart/expenseCategoryDoughnut",
    itemDoughnut: BaseUrl + "/api/Chart/itemCategoryDoughnut",
    currentMonth: BaseUrl + "/api/Utilities/current-month",
}


export default RequestUrl;