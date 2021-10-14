import React from "react";

export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortOrder: {
                key: null,
                direction: null,
            },
            keys: Object.keys(this.props.data.rows[0]),
        }
        this.displayRows = this.displayRows.bind(this)
        this.filterRows = this.filterRows.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    displayRows(filteredRows = []) {
        let arrRows = filteredRows.length > 0 ? filteredRows : this.props.data.rows;

        if (this.state.sortOrder.key) {
            arrRows.sort((a, b) => {
                if (a[this.state.sortOrder.key] < b[this.state.sortOrder.key]) {
                    return this.state.sortOrder.direction === 'ascending' ? -1 : 1
                }
                if (a[this.state.sortOrder.key] > b[this.state.sortOrder.key]) {
                    return this.state.sortOrder.direction === 'ascending' ? 1 : -1
                }
                return 0;
            })
        }
        return arrRows.map((row) => (
            <tr key={`${Math.floor(Math.random() * 10000)}_${row._id}`}>
                {
                    Object.values(row).map((value) => (
                        <td key={Math.floor(Math.random() * 10000)}>
                            {
                                value.toString()
                            }
                        </td>
                    ))
                }
            </tr>
        ))
    }


    filterRows() {
        return this.props.data.rows.reduce((matchedRows, currentRow) => {
            const matchFound = Object.values(currentRow).filter((column) => column.toLowerCase().includes(this.props.data.searchValue.toLowerCase())).length > 0;
            if (matchFound) {
                matchedRows.push(currentRow)
                return matchedRows;
            }
            return matchedRows;
        }, []);
    }

    handleSort(key) {
        if (key === this.state.sortOrder.key) {
            return this.setState((prevState) => ({
                sortOrder: {
                    ...prevState.sortOrder,
                    direction: prevState.sortOrder.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }));
        }
        this.setState((prevState) => ({
            sortOrder: {
                ...prevState.sortOrder,
                key: key
            }
        }))
    }

    render() {
        return (
            <div>
                <table className="table-list">
                    <thead>
                        <tr>
                            {this.state.keys.map((key) => (
                                <th onClick={this.handleSort.bind(this, key)}>
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                if (this.props.data.searchValue.length > 0) {
                                    const filteredRows = this.filterRows();
                                    return filteredRows.length > 0 ? this.displayRows(filteredRows) : <span>No Data</span>
                                }
                                return this.displayRows();
                            })()
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
