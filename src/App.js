import React, { Component } from 'react';
import ProviderManager from './Providers/ProviderManager';
import { AppRoutes } from './Routes/AppRoutes';



export default class App extends Component {
  componentDidMount() {
    document.getElementById("root").classList.add("main");
  }

  render() {
    return (
      <ProviderManager>
        <AppRoutes />
      </ProviderManager>
    )
  }
}