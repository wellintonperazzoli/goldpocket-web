import { Component } from "react";
import Expenses from "../Charts/Expenses";
import ExpensesByCategory from "../Charts/ExpensesByCategory";
import Items from "../Charts/Items";
import ItemsByCategory from "../Charts/ItemsByCategory";
import CurrentMonth from "../Widgets/CurrentMonth";

export default class DashboardIndex extends Component {
    render = () => (
        <>
            <CurrentMonth />
            <ExpensesByCategory className={"col-md-8"} />
            <Expenses className={"col-md-4"}/>
            <ItemsByCategory className={"col-md-8"}/>
            <Items className={"col-md-4"}/>
        </>
    )
}




