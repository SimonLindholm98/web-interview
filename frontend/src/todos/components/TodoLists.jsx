import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

// Simulate network
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const res = await fetch('http://localhost:3001/')
        const data = await res.json()
        await sleep(1000)
        setTodoLists(data)
      } catch (error) {
        console.error('Error fetching todo lists:', error)
      }
    }
    fetchTodoLists().then()
  }, [])

  const saveTodoList = async (id, { todos }) => {
    const listToUpdate = todoLists[id]
    setTodoLists({
      ...todoLists,
      [id]: { ...listToUpdate, todos }
    })

    await fetch(`http://localhost:3001/todolists/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todos }),
    })
  }

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  )
}
