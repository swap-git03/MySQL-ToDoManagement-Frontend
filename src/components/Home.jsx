import React, { useEffect } from 'react'
import { getAllTasks } from '../api/taskapi'

const Home = () => {

  async function fetchData() {
    const data = await getAllTasks()
    console.log(data);
    
  }
  useEffect(()=>{
    fetchData()
  })

  return (
    <div>
      Homeeeee
    </div>
  )
}

export default Home
