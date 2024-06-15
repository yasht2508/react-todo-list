import React from 'react'

export default function CompletedList({completedArray}) {
  return (
    <div className='completedTasks'>
    <h1>Completed Tasks</h1>
    {
        completedArray.length===0 ?  <div>No Completed Tasks</div> :
      completedArray.map((task)=>{
        return <input type="text" value={task.text} key={task.id} readOnly />
      })
    }
  </div>
  )
}
