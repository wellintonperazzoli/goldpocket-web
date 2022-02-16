import React, { Component } from "react";
import { uid } from "../Utils/Utils";

export const alertContext = React.createContext();

export default class AlertProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alerts: [],
            newAlert: this.newAlert
        }
    }

    newAlert = (t, d) => {
        let id = uid();
        let alert = {
            id: id,
            type: t,
            data: d,
            show: "hide"
        }
        let alerts = this.updateAlerts(alert);
        this.setState({
            alerts: alerts
        })
        setTimeout(() => {
            this.show(id)
            setTimeout(() => {
                this.hide(id)
            }, 5000)
        }, 100);
    }

    updateAlerts = (alert) => {
        let alerts = this.state.alerts;

        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].show === "") {
                alerts[i] = alert;
                return alerts;
            }
        }

        alerts.push(alert)
        return alerts;
    }


    show = (id) => {
        let alerts = this.state.alerts;
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].id === id)
                alerts[i].show = "alert-show";
        }

        this.setState({
            alerts: alerts
        })
    }


    hide = (id) => {
        let alerts = this.state.alerts;
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].id === id)
                alerts[i].show = "";
        }

        this.setState({
            alerts: alerts
        })
    }

    render() {

        return (
            <alertContext.Provider value={this.state}>
                <div className="alerts">
                    {
                        this.state.alerts.map((alert) => {
                            return (
                                <div key={alert.id} className={`alert ${alert.type} ${alert.show}`} onClick={() => this.hide(alert.id)}>
                                    {alert.data}
                                </div>
                            )
                        })
                    }
                </div>

                {this.props.children}
            </alertContext.Provider>
        )
    }
}