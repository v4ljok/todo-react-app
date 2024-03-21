import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    render() {
        const { label, done, important, onDeleted, onToggleImportant, onToggleDone} = this.props;
        let classNames = 'todo-list-item';
        if (important) {
            classNames += " important";
        }
        if (done) {
            classNames += " done";
        }
        return (
            <span className={ classNames }>
                <label onClick={ onToggleDone }>{ label }</label>
                <button
                    className='btn btn-outline-success btn-sm float-end'
                    onClick={ onToggleImportant }
                >
                    <i className='fa fa-exclamation'></i>
                </button>
                <button
                    className='btn btn-outline-danger btn-sm float-end'
                    onClick={ onDeleted }
                >
                    <i className='fa fa-trash-o'></i>
                </button>
            </span>
        );
    }
}