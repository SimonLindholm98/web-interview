import React, {useEffect, useState} from 'react'
import {TextField, Card, CardContent, CardActions, Button, Typography, Checkbox} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  //Additional tasks 1 autosave
  useEffect(() => {
    saveTodoList(todoList.id, { todos })
  }, [todos, saveTodoList, todoList.id])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              {/*//Additional tasks 2 */}
              <Checkbox
                 checked={todo.completed}
                 onChange={() => {
                   const updated = [...todos]
                   updated[index].completed = !updated[index].completed
                   setTodos(updated)
                 }}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { ...todo, text: event.target.value },
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                //additional tasks 2
                setTodos([...todos, { text: '', completed: false }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
      </CardContent>
    </Card>
  )
}
