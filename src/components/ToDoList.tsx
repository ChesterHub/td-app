import React, { useState } from 'react'
import "./styles.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState<string[]>(["Eat breakfast", "Take a shower"])
  const [newTask, setNewTask] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value)
  }

  const addTask = (): void => {
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
  return (
    <div className='to-do-list'>
        <h1>To-Do-List</h1>
        <div>
            <input type='text' placeholder='Enter a task...' value={newTask} onChange={handleInputChange}></input>
            <button className='add-button' onClick={addTask}>Add</button>
        </div>

        <ol>
          {tasks.map((task: string, index: number) => {
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
