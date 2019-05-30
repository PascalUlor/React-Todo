import React from 'react';

const TodoForm = ({ taskTitle, handleChange, updateList, searchQuery, deleteHandler, formType }) => {
    return (
        formType === 'Add Task' ?
            <form onSubmit={(e) => updateList(e)}>
                <h4>{formType}</h4>
                <input
                    type='text'
                    value={taskTitle}
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
                    value={taskTitle}
                    onChange={searchQuery}
                />
            </form>
    )
}

export default TodoForm;