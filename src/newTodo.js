import React from 'react'
import {connect} from 'react-redux'

let id = 0

class TodoList extends React.Component {
    state = {
        todoList: [],
        text: ''
    }

    add = () => {
        this.setState({
            todoList: [...this.state.todoList, {
                complated: false,
                text: this.state.text,
                id: id++
            }],
            text: ''
        })
    }

    complate = (id) => {
        this.setState({
            todoList: this.state.todoList.map((todo) => {
                if (todo.id === id) {
                    return {...todo, complated: !todo.complated}
                }
                return todo
            }),
        })
    }

    handleDelete = (id) => {
        console.log(id)
        this.setState({
            todoList: this.state.todoList.filter(todo => todo.id !== id)
        })
        console.log(this.state.todoList)
    }
    render = () => {
        console.log(this.props)
        const {add} = this.props
        return (
            <div>
                <Opertaion 
                    text={this.state.text}
                    onChange={(e) => this.setState({text: e.target.value})}
                    add={() => add(id ++ ,this.state.text)}
                />
                <List
                    title="Doing"
                    items={this.props.todoList.filter(todo => !todo.complated)}
                    handleClick={this.complate}
                    handleDelete={this.handleDelete} 
                    />
                <List
                    title="Done"
                    items={this.state.todoList.filter(todo => todo.complated)}
                    handleClick={this.complate}   
                    handleDelete={this.handleDelete}                 
                    />
            </div>
        )
    }
}

function Opertaion({text, onChange, add}) {
    return (
        <div>
            <input
                value={text}
                onChange={onChange}/>
            <button onClick={add}>Add</button>
        </div>
    )
}
function List({title, items, handleClick,handleDelete}) {
    return (
        <div className = "todo">
        <h3>{title} 
            <span>{items.length}</span>
        </h3>
        
        <ul id = 'todolist' >
          {
            items.map((item,id) => (
              <li key={id}>
                <input className="choose1" type="checkbox" checked={item.complated} 
            onChange={() => handleClick(item.id)} />
                <p>{item.text}</p>
                <button onClick={() => handleDelete(item.id)} >delete</button>
                </li>              
            ))
          }
        </ul>

      </div>
    )
}

function mapStateToProps(state){
    return {
        todoList: state.todoList
    }
}

function mapDispatchToProps(dispatch){
    return {
        add:(id,text) => dispatch({type:'ADD',id:id,text:text})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)