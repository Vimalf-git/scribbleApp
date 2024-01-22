import './App.css'
import Sidebar from './Components/Sidebar'
import NotesContent from './Components/NotesContent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesContext from './Components/NotesContext'
import NotesCard from './Components/NotesCard'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
          <Route index element={<Login />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/notescontent' element={
              <NotesContext>
                <div className='mainSetUp'>
                <Sidebar />
                <NotesContent />
                </div>
              </NotesContext>} />
            <Route path='/notesCard' element={
              <NotesContext>
                <div className='mainSetUp'>
                <Sidebar />
                <NotesCard />
                </div> 
                </NotesContext>
            } />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
