function Todo(props){
    return (
            <div className="todo">
                <b className = {props.todo.completed ? "lineThrough" : null} >
                {props.todo.todoName}
                </b>
                <input type="checkbox" 
                    checked={props.todo.completed} 
                    onChange={props.handleUpdateTodo}/>
                <button type="button" onClick={props.handleDeleteTodo}>❌</button>
            </div>  
    )
}

export default Todo;