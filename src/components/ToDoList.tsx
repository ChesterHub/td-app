import React, { useState, useEffect } from 'react'
import "./styles.css";

type ToDoListProps = {
  test?: string
}

 const useDebounce = (stringDebounce: string, delay: number): string => {
  const [debounce, setDebounce] = useState<string>(stringDebounce)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(stringDebounce)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
    },[stringDebounce, delay])

    return debounce
 }

const ToDoList: React.FC<ToDoListProps> = ({ test }) => {
  const [tasks, setTasks] = useState<string[]>(["Eat breakfast", "Take a shower"])
  const [newTask, setNewTask] = useState<string>("")
  const [filterInput, setFilterInput] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value)
  }
  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterInput(e.target.value)
  }
  
  const addTask = (_: React.MouseEvent<HTMLButtonElement>): void => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask("")
  }
  const deleteTask = (index: number): void => {
    setTasks(prevTasks => prevTasks.filter((_, i: number) => i !== index))
  }
  const moveTaskUp = (index: number): void => {
    if (index > 0) {
      const updatedTasks = [...tasks]
      let temp = updatedTasks[index]
      updatedTasks[index] = updatedTasks[index - 1]
      updatedTasks[index - 1] = temp
      setTasks(updatedTasks)
    }
  }
  const moveTaskDown = (index: number): void => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks]
      let temp = updatedTasks[index]
      updatedTasks[index] = updatedTasks[index + 1]
      updatedTasks[index + 1] = temp
      setTasks(updatedTasks)
    }
  }
  
  const filteredText = useDebounce(filterInput, 1000)
  const filteredTasks = tasks.filter((task) => task.toLowerCase().includes(filteredText.toLowerCase()))

  return (
    <div className='to-do-list'>
        <h1>To-Do-List{test ? `:${test}` : null} </h1>
        <div>
            <input type='text' placeholder='Enter a task...' value={newTask} onChange={handleInputChange}></input>
            <button className='add-button' onClick={addTask}>Add</button>
            <input type='text' placeholder='Filter a task...' value={filterInput} onChange={handleFilterInputChange}></input>
        </div>
        <ol>
          {filteredTasks.map((task: string, index: number) => {
              return <li key={index}>
                  <span className='text'>{task}</span>
                  <button 
                    className='delete-button'
                    onClick={() => deleteTask(index)}
                    >
                    Delete
                  </button>
                  <button 
                    className='move-button'
                    onClick={() => moveTaskUp(index)}
                    >
                    UP
                  </button>
                  <button 
                    className='move-button'
                    onClick={() => moveTaskDown(index)}
                    >
                    DOWN
                  </button>
              </li>
          })}
        </ol>
    </div>
  )
}

export default ToDoList
