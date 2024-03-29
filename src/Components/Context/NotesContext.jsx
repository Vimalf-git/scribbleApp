import React, { useEffect, useState } from 'react'
import deleteIcon from './image/delete.svg'
import editIcon from './image/edit.svg'
import notesBlueIcon from './image/notes-blueIcon.svg'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Common/ApiService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
export const NotesDataContext = React.createContext();
function NotesContext({ children }) {
    const [title, SetTittle] = useState('')
    const [body, SetBody] = useState('')
    const [addOrEdit, setAddOrEdit] = useState('add');
    const [editIndex, setEditindex] = useState();
    const [localIndex, setLocalIndex] = useState();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            let token=sessionStorage.getItem('token')
            let email=jwtDecode(token).email
            const res = await ApiService.get(`http://localhost:8000/getData/${email}`);
            setData(res.data.cardData)
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("token expired")
                sessionStorage.clear()
                navigate('/login')
            }
            else {
                toast.error("Error Occoured! Please try after some time")
                sessionStorage.clear()
                navigate('/login')
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <NotesDataContext.Provider value=
            {{
                data, setData, title, SetTittle, body,
                SetBody, addOrEdit, setAddOrEdit, editIndex
                , setEditindex, navigate, deleteIcon, editIcon, notesBlueIcon, getData, setLocalIndex, localIndex
            }}>
            {children}
        </NotesDataContext.Provider>
    )
}

export default NotesContext