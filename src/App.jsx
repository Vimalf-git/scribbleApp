import './App.css'
import Sidebar from './Components/SideBar/Sidebar'
import NotesContent from './Components/NotesContent/NotesContent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesContext from './Components/Context/NotesContext'
import NotesCard from './Components/NotesCard/NotesCard'
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/Signup'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import ResetPassword from './Components/ResetPass/ResetPassword'

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
            <Route path='/forgetpassword' element={<ForgetPass/>}/>
            <Route path='/resetpassword/*' element={<ResetPassword/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
