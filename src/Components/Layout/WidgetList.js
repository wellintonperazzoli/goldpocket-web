import { Component } from "react";
import { Link } from "react-router-dom";
import { modalContext } from "../../Providers/ModalProvider";
import { getCurrency, getDate, isBlank, isEmpty, removePlural } from "../../Utils/Utils";


const _ITEMSPAGE = 10;
export default class WidgetList extends Component {
    static contextType = modalContext;

    
    state = {
        search: "",
        data: [],
        list: [],
        headers: [],
        itemsPerPage: _ITEMSPAGE,
        page: 1,
        sortby: "",
        sortbytype: ""
    }

    componentDidMount() {
        let data = this.props.data;
        this.setState({
            loaded: data,
            data: data,
            headers: this.props.headers,
            list: data.slice(0, _ITEMSPAGE)
        })
    }

    clearSearch = (event) => {
        event.preventDefault();
        var loaded = this.state.loaded;
        var value = event.target.value;

        this.setState({
            data: loaded,
            list: loaded.slice(0, this.state.itemsPerPage),
            search: value,
            page: 1
        });
    }

    getPage() {
        let list = this.state.data.slice(((this.state.page - 1) * this.state.itemsPerPage), (this.state.page * this.state.itemsPerPage));
        this.setState({
            list: list
        })
    }

    search = (event) => {
        var loaded = this.state.loaded;
        var value = event.target.value;
        let filtered = loaded.filter(x => {
            let condition = false;
            this.state.headers.forEach(h => {
                if (h !== 'id' && !isBlank(x[h])) {
                    condition = condition || x[h].toString().toUpperCase().includes(value?.toUpperCase())
                }
            })

            return condition;
        });

        this.setState({
            data: filtered,
            list: filtered.slice(0, this.state.itemsPerPage),
            search: value,
            page: 1
        });
    }

    changePage = (e) => {
        const v = e.target.value;
        const p = this.state.page;
        const maxpages = Math.ceil(this.state.data.length / this.state.itemsPerPage);
        const page = v > 0 && v <= maxpages ? v : p;
        this.setState({
            page: page,
            list: this.state.data.slice(((page - 1) * this.state.itemsPerPage), (page * this.state.itemsPerPage))
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    sortBy = (event) => {
        var v = event.target.value
        var t = this.state.sortbytype === "asc" ? "des" : "asc";

        let header = this.state.headers.map((x, k) => {
            return {
                key: k,
                value: x,
                type: this.props.tableheadertypes[k]
            }
        }).find(x => x.value === v);

        var d = this.state.loaded.sort((a, b) => {
            if (isBlank(a[header.value]) || isBlank(b[header.value])) return true;
            switch (header.type) {
                case "date":
                    let dateA = getDate(a[header.value]);
                    let dateB = getDate(b[header.value]);
                    return t === "asc" ? dateA - dateB : dateB - dateA;
                case "currency":
                    let curA = getCurrency(a[header.value]);
                    let curB = getCurrency(b[header.value]);
                    return t === "asc" ? curA - curB : curB - curA;
                case "number":
                    let na = a[header.value];
                    let nb = b[header.value];
                    return t === "asc" ? na - nb : nb - na;
                default:
                    let va = a[header.value];
                    let vb = b[header.value];
                    return t === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
            }
        });

        this.setState({
            sortby: v,
            sortbytype: t,
            data: d,
            list: d.slice(0, this.state.itemsPerPage),
            page: 1
        });

    }

    delete = (e, item) => {
        if (typeof this.context.showModal === 'function') {
            e.preventDefault();
            this.context.showModal(
                <span>Are you sure you want to delete this {removePlural(this.props.title?.toLowerCase())}?</span>
                , () => {
                    if (typeof this.props.deleteAction === 'function')
                        this.props.deleteAction(item)
                },
                "danger")
        }
    }


    render() {
        const viewable = this.props.viewable;
        const editable = this.props.editable;
        const deletable = this.props.deletable;
        const create = this.props.create;
        let createButton = (
            <a href={this.props.url + "Create"} className="btn-new">
                <span>New</span>
            </a>
        )
        if (create !== undefined && create === false) {
            createButton = (<></>)
        }


        return (
            <>
                <div className="row align-center">
                    <div className="col-8 d-flex align-center">
                        <button className={this.state.search?.length > 0 ? 'btn-reset' : 'd-none'} onClick={this.clearSearch}></button>
                        <button className="btn-search"></button>
                        <div className="searchbox">
                            <input type="text" placeholder="Search..." value={this.state.search} name="search" onChange={this.handleInputChange} onKeyUp={this.search} />
                        </div>
                    </div>
                    <div className="col-4 flex-flex-end pr-1">
                        {createButton}
                    </div>
                </div>
                <div className="table-box">
                    <table className="table">
                        <thead>
                            <tr>
                                {
                                    this.state.headers.map(x => {
                                        return (
                                            <th key={x}>
                                                <button name="sortby"
                                                    value={x}
                                                    className={this.state.sortby === x ? "sortby " + this.state.sortbytype : "sortby"} onClick={this.sortBy}>
                                                    {x}
                                                </button>
                                            </th>
                                        )
                                    })
                                }
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map(item => {
                                let key = isEmpty(item.key) ? item.id : item.key;
                                return (
                                    <tr key={key}>
                                        {
                                            this.state.headers.map(h => {
                                                return (<td key={'item' + item.id + h}>{item[h]}</td>)
                                            })
                                        }
                                        <td>
                                            <ActionButton to={this.props.url + item.id} className="link-view" viewable={typeof viewable === 'function' ? viewable(item) : viewable}>
                                                <span>View</span>
                                            </ActionButton>
                                            <ActionButton to={this.props.url + "Edit/" + item.id} className="link-edit" viewable={typeof editable === 'function' ? editable(item) : editable}>
                                                <span>Edit</span>
                                            </ActionButton>
                                            <ActionButton to={this.props.url + "Delete/" + item.id} className="link-delete" viewable={typeof deletable === 'function' ? deletable(item) : deletable} onClick={(e) => this.delete(e, item)}>
                                                <span>Delete</span>
                                            </ActionButton>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="row pagination align-center">
                        <div className="col-6 pagination-info">
                            {/* Page {this.state.page} */}
                        </div>
                        <div className="col-6">
                            <ul>
                                <li className={parseInt(this.state.page) === 1 ? "inactive" : ""}><button onClick={this.changePage} value={1}>First</button></li>
                                <li className={parseInt(this.state.page) === 1 ? "Prev inactive" : "Prev"}><button onClick={this.changePage} value={parseInt(this.state.page) - 1}></button></li>
                                <li className="pagination-info">Page {this.state.page}</li>
                                <li className={parseInt(Math.ceil(this.state.data.length / this.state.itemsPerPage)) === parseInt(this.state.page) ? "Next inactive" : "Next"}><button onClick={this.changePage} value={parseInt(this.state.page) + 1}></button></li>
                                <li className={parseInt(Math.ceil(this.state.data.length / this.state.itemsPerPage)) === parseInt(this.state.page) ? "inactive" : ""}><button onClick={this.changePage} value={parseInt(Math.ceil(this.state.data.length / this.state.itemsPerPage))}>Last</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



export class ActionButton extends Component {
    render() {
        let condition = this.props.viewable === undefined ? true : this.props.viewable;
        return condition ? (
            <Link to={this.props.to} className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </Link>
        ) :
            (
                <></>
            );
    }
}