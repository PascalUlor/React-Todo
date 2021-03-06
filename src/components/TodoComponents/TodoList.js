// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js

import React from 'react';
import Todo from './Todo';

const TodoList = ({list, select}) => {
        const data = list.map((todo, index)=>{
        return (
            <Todo
            key={index}
            item={todo}
            select={select}
            />
        )
        })
        return <div>{data}</div>
}

export default TodoList;