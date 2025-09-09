import React from 'react'
import { Route, Routes } from 'react-router'
import KanbanBoard from './Global/Pages/KanbanBoard'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<KanbanBoard/>}/>
      </Routes>
    </div>
  )
}

export default App