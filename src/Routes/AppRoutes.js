import { Component } from "react";
import CategoriesCreate from "../Components/Views/Private/Categories/CategoriesCreate";
import CategoriesEdit from "../Components/Views/Private/Categories/CategoriesEdit";
import CategoriesIndex from "../Components/Views/Private/Categories/CategoriesIndex";
import DashboardIndex from "../Components/Views/Private/Dashboard/DashboardIndex";
import ExpensesIndex from "../Components/Views/Private/Expenses/ExpensesIndex";
import ExpensesView from "../Components/Views/Private/Expenses/ExpensesView";
import ItemsIndex from "../Components/Views/Private/Items/ItemsIndex";
import LocationsIndex from "../Components/Views/Private/Locations/LocationsIndex";
import NotFound from "../Components/Layout/NotFound";
import AppRoute from "./AppRoute";
import { authContext } from "../Providers/AuthProvider";
import Login from "../Components/Views/Default/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoriesView from "../Components/Views/Private/Categories/CategoriesView";
import ItemsEdit from "../Components/Views/Private/Items/ItemsEdit";
import ItemsView from "../Components/Views/Private/Items/ItemsView";
import LocationsEdit from "../Components/Views/Private/Locations/LocationsEdit";
import LocationsView from "../Components/Views/Private/Locations/LocationView";
import ExpensesCreate from "../Components/Views/Private/Expenses/ExpensesCreate";
import ExpensesEdit from "../Components/Views/Private/Expenses/ExpensesEdit";


export class AppRoutes extends Component {
  static contextType = authContext;

  render() {
    if (this.context.token) {
      return (
        <Router>
          <Routes>
            <Route index element={<Navigate to="/Dashboard" />} />
            <Route path="/Dashboard">
              <Route index element={<AppRoute element={DashboardIndex} />} />
            </Route>
            <Route path="/Expenses">
              <Route index element={<AppRoute element={ExpensesIndex} />} />
              <Route path="Create" element={<AppRoute element={ExpensesCreate} />} />
              <Route path=":id" element={<AppRoute element={ExpensesView} />} />
              <Route path="Edit/:id" element={<AppRoute element={ExpensesEdit} />} />
            </Route>
            <Route path="/Locations">
              <Route index element={<AppRoute element={LocationsIndex} />} />
              <Route path=":id" element={<AppRoute element={LocationsView} />} />
              <Route path="Edit/:id" element={<AppRoute element={LocationsEdit} />} />
            </Route>
            <Route path="/Items">
              <Route index element={<AppRoute element={ItemsIndex} />} />
              <Route path=":id" element={<AppRoute element={ItemsView} />} />
              <Route path="Edit/:id" element={<AppRoute element={ItemsEdit} />} />
            </Route>
            <Route path="/Categories">
              <Route index element={<AppRoute element={CategoriesIndex} />} />
              <Route path=":id" element={<AppRoute element={CategoriesView} />} />
              <Route path="Create" element={<AppRoute element={CategoriesCreate} />} />
              <Route path="Edit/:id" element={<AppRoute element={CategoriesEdit} />} />
            </Route>
            <Route path="*" element={<AppRoute element={NotFound} />} />
          </Routes>
        </Router>
      )
    }



    return (
      <Router>
        <Routes>
          <Route path="*" element={<AppRoute public={true} element={Login} />} />
        </Routes>
      </Router>
    )
  }
}