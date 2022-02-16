import { Component } from "react";
import SideMenu from "./SideMenu";

export default class PrivateLayout extends Component {
    render() {
        return (
            <>
                <SideMenu />
                <div className='section'>
                    <div className='section__content'>
                        <div className='grid'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}