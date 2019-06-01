import React from 'react';

const TodoForm = ({ todoInput, handleChange, updateList, searchQuery, deleteHandler, formType }) => {
    return (
        formType === 'Add Task' ?
            <form onSubmit={(e) => updateList(e)}>
                <h4>{formType}</h4>
                <input
                    type='text'
                    value={todoInput}
                    onChange={handleChange}
                />
                <div className="button__style">
                    <button type="submit">Add Todo</button>

                    <input
                        type="button"
                        value="Clear Completed"
                        onClick={deleteHandler}
                    />
                </div>

            </form> :
            <form>
                <h4>{formType}</h4>
                <input
                    type='text'
                    value={todoInput}
                    onChange={searchQuery}
                />
            </form>
    )
}

export default TodoForm;