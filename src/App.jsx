import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }

  }, [])

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const saveTols = (params) => {
    localStorage.setItem("todos", params)
  }

  const handleEdit = (id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTols(JSON.stringify(newTodos))
  }
  const handleDelete = (id) => {
    // alert("are you sure?")

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveTols(JSON.stringify(newTodos))
  }
  const handleAdd = () => {
    // setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    saveTols(JSON.stringify(newTodos));
    setTodo("");
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTols()
  }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 bg-violet-100 p-5 rounded-xl min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className="text-xl font-bold"> Add Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length < 3} className=' disabled:bg-violet-600 cursor-pointer font-bold p-4 mx-2 py-2 rounded-full text-sm bg-violet-800 hover:bg-violet-950 text-white '>Save</button>
          </div>
        </div>
        <input className='my-4' type="checkbox" onChange={toggleFinished} checked={showFinished} name="" id="frn" />
        <label htmlFor="frn">Show Finish</label>
        <div className='h-[1px]  bg-black opacity-15 mx-auto my-4'></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo to display</div>}
          {todos.map(item => {
            return ((showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex my-3 justify-between">
                <div className="flex gap-5">
                  <input checked={item.isCompleted} onChange={handleCheckbox} type="checkbox" name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={() => { handleEdit(item.id) }} className='font-bold p-2 py-1 rounded-md text-sm mx-1 bg-violet-800 hover:bg-violet-950 text-white'><FaEdit /></button>
                  <button onClick={() => { handleDelete(item.id) }} className='font-bold p-2 py-1 rounded-md text-sm mx-1 bg-violet-800 hover:bg-violet-950 text-white'><AiFillDelete /></button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default App