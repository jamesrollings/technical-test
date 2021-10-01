import React from 'react';
import Table from './components/Table';

const dataURL = `http://localhost:${Number(process.env.PORT) || 80}/api/personnel`;

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            loading: true,
            rows: [],
        }
        this.handleInput = this.handleInput.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    
    async fetchData() {
        const options = { method: 'GET' }
        const response = await (await fetch(dataURL, options)).json();
        this.setState({ rows: response });
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 5000); // artificial loading time
        this.fetchData();
    }

    handleInput(event) {
        this.fetchData(); // Calling this each time a key is released will have a performance hit, but for this example it keeps the data up to date
        this.setState({ searchValue: event.target.value });
    }

    render() {
        return this.state.loading ? <div className="loader" /> : (
            <div>
                <input type="text" className="searchBox" onKeyUp={this.handleInput} placeholder="Search table..." />
                <Table data={this.state} />
            </div>
        )
    }
}