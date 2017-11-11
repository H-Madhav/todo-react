import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer}  from './components/todo/'
import {addTodo, generateId, findById, toggleTodo,
  updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService'


class App extends Component {

  state = {
    todos: [],
    currentTodo: ""
  }

  componentDidMount(){
    loadTodos()
    .then(todos => this.setState({todos}))
  }

  static contextTypes = {
    route: PropTypes.string
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
    deleteTodo(id)
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId ,name: this.state.currentTodo, isComplete: false}
    const updatedTodo = addTodo(this.state.todos, newTodo)
    this.setState({todos: updatedTodo,
      currentTodo: ''
    })
    createTodo(newTodo).then(() => console.log('new todo added'))
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value,
      errorMessage: ''
    })
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React todos</h1>
        </header>
        <div className="Todo-app">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
          currentTodo={this.state.currentTodo} handleSubmit={submitHandler}/>
          <TodoList handleToggle={this.handleToggle}
          todos={displayTodos} handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
