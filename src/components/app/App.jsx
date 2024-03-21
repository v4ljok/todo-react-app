import React, { Component } from 'react';
import './App.css';

import AppHeader from '../app-header/app-header';
import ItemAddForm from '../item-add-form/item-add-form';
import TodoList from '../todo-list/todo-list';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem("Drink a Coffee"),
            this.createTodoItem("Make an awesome app"),
            this.createTodoItem("Have a lunch")
        ],
        search: "",
        filter: "all"
    }

    createTodoItem(label) {
        return {
            label : label,
            important : false,
            id : this.maxId++
        }
    }

    toggleProperty(arr,id,propName) {
        const idx = arr.findIndex(e => e.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName] : !oldItem[propName]}
        return  [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx+1)
        ]
    }

    onToggleImportant = id => {
        this.setState( ({ todoData }) => {
            return { todoData : this.toggleProperty(todoData, id, "important")}
        });
    }

    onToggleDone = id => {
        this.setState( ({ todoData }) => {
            return { todoData : this.toggleProperty(todoData, id, "done")}
        });
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState( ({todoData}) => {
            const newArr = [...todoData, newItem];
            return { todoData: newArr}
        });
    }

    deleteItem = (id) => {
        this.setState( ({todoData}) => {
            const idx = todoData.findIndex(e => e.id === id);
            const newArray = [
                ...todoData.slice(0,idx),
                ...todoData.slice(idx+1)
            ];
            return {
                todoData : newArray
            };
        });
    }

    onSearchChange = (search) => {
        this.setState({ search });
    }

    searchItems(items,search) {
        if (search.length === 0) {
            return items;
        }
        return items.filter( item => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1 );
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    }

    filterItems(items,filter) {
        if (filter === "all") {
            return items;
        }
        if (filter === "active") {
            return items.filter( item => !item.done );
        }
        if(filter == "done") {
            return items.filter( item => item.done)
        }
    }

    render() {
        const { todoData, search, filter } = this.state;
        let doneCount = todoData.filter(item => item.done).length;
        let toDoCount = todoData.length - doneCount;
        const filteredItems = this.filterItems(todoData, filter);
        const visibleItems = this.searchItems(filteredItems, search);
        return(
            <div className='todo-app'>
                <AppHeader done={ doneCount } toDo={ toDoCount }/>
                <div className='top-panel d-flex'>
                    <SearchPanel onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter filter={ filter }
                        onFilterChange={ this.onFilterChange }/>
                </div>
                <TodoList 
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    }
}