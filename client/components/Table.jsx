import React from "react";

const displayRows = (rows) => {
    return rows.map((row) => (
        <tr key={`${Math.floor(Math.random() * 10000)}_${row._id}`}>
            {
                Object.values(row).map((value) => (
                    <td key={Math.floor(Math.random() * 10000)}>
                        {value.toString()}
                    </td>
                ))
            }
        </tr>
    ))
}

const filterRows = (rows, filter) => {
    return rows.reduce((matchedRows, currentRow) => {
        const matchFound = Object.values(currentRow).filter((column) => column.toLowerCase().includes(filter.toLowerCase())).length > 0;
        if (matchFound) {
            matchedRows.push(currentRow)
            return matchedRows;
        }
        return matchedRows;
    }, []);
}

export default function Table(props) {
    const { rows, searchValue } = props.data;
    const keys = rows.length > 0 ? Object.keys(rows[0]) : null;
    return (
        rows.length > 0 ? (
            <div>
                <table className="table-list">
                    <thead>
                        <tr>
                            {keys.map((key) => (
                                <th>
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchValue.length > 0 ? displayRows(filterRows(rows, searchValue)) : displayRows(rows)
                        }
                    </tbody>
                </table>
            </div>
        ) : <span>No Data</span>
    );

}