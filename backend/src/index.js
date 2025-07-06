import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const todoLists = {
  '1': {
    id: '1',
    title: 'First List',
    todos: [{text:'First todo of first list!', completed: false}],
  },
  '2': {
    id: '2',
    title: 'Second List',
    todos: [{text:'First todo of second list!', completed: false}],
  },
  '3': {
    id: '3',
    title: 'Third List',
    todos: [{text:'First todo of third list!', completed: false}],
  },
}

app.get('/', (req, res) => res.json(todoLists))

app.post('/todolists/:id', (req, res) => {
  const { id } = req.params
  const { todos } = req.body
  if (!todoLists[id]) return res.status(404).json({ error: `List with ${id} not found` })
  todoLists[id].todos = todos
  res.json(todoLists[id])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
