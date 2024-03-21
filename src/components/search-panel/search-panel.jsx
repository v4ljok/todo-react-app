import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ""
    };

    onTermChange = (e) => {
        this.setState({ term: e.target.value });
        this.props.onSearchChange(e.target.value);
    }

    render() {
        return (
            <div>
                <input 
                    type='text'
                    placeholder="type to search"
                    className='form-control search-input'
                    value={ this.state.term }
                    onChange={ this.onTermChange }
                />
            </div>
        );
    }
}