function Input(props){
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="todoName">Todo : &nbsp;</label>
            <input id="todoName" type="text" value={props.input} onChange={props.handleChange} required/>
            <input type="submit" value="Register" />
        </form>
    )
}

export default Input;