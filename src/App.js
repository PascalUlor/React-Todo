import React from 'react';
import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';
import './App.css';

// const initialFormState = {
//   todoInput: ''
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      taskTitle: '',
      todoInput: ''
    }
  }

  async componentDidMount() {
    const todos = await localStorage.getItem('todos');
    const todoData = JSON.parse(todos);
    this.setState({
      todos: todoData || []
    })
  }

  handleChange = (event) => {
    this.setState({
      taskTitle: event.target.value,
      todoInput: event.target.value
    })
  }

  updateList = async (e) => {
    e.preventDefault();
    const newTask = {
      task: this.state.taskTitle,
      id: Date.now(),
      completed: false,
    };
    if (this.state.todos.length === 0) {
      await this.setState({
        todos: [newTask],
        todoInput: ''
      })
    } else {
      await this.setState({
        todos: [...this.state.todos, newTask],
        todoInput: ''
      })
    }
    await localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  handleSearch = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem('todos'));
    const query = [];
    data.map(task => {
      if (task.task.toLowerCase().includes(e.target.value.toLowerCase())) {
        query.push(task);
      }
      return query
    });
    this.setState({
      todos: query
    })
  }

  selectHandler = async (id) => {
    console.log('selected');
    const data = JSON.parse(localStorage.getItem('todos'));
    const checkTask = data.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    await this.setState({
      ...this.state,
      todos: checkTask
    });
    await localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  deleteHandler = async () => {
    console.log('deleted');
    const data = JSON.parse(localStorage.getItem('todos'));
    const checkTask = data.filter(task => task.completed === false);
    await this.setState({
      ...this.state,
      todos: checkTask
    });
    await localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  render() {
    return (
      <div className="container">
        <h2>Welcome to your Todo App!</h2>
        <div className="components__container">
          <div className="input__container">
            <TodoForm
              formType='Search'
              value={this.state.taskTitle}
              handleChange={this.handleChange}
              searchQuery={this.handleSearch}
            />

            <TodoForm
              formType='Add Task'
              value={this.state.taskTitle}
              handleChange={this.handleChange}
              updateList={this.updateList}
              todoInput={this.state.todoInput}
              deleteHandler={this.deleteHandler}
            />
          </div>
          <div className="todo_container">
          <h4>Tasks</h4>
            {this.state.todos ?
              <TodoList
                list={this.state.todos}
                select={this.selectHandler}
              />
              : <p>No data available</p>}
          </div>

        </div>

      </div>
    );
  }
}

export default App;
