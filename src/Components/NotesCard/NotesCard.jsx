import React, { useContext } from 'react'
import { NotesDataContext } from '../Context/NotesContext';
import ApiService from '../../Common/ApiService';
import { toast } from 'react-toastify';
import './NotesCard.css';
const NotesCard = React.memo(({ isProb = false }) => {

    const { data, setData, setEditindex, navigate, setAddOrEdit, editIcon, deleteIcon
        , getData, setLocalIndex }
        = useContext(NotesDataContext);
    const delData = async (index, i) => {

        let newArr = [...data];
        newArr.splice(i, 1);
        setData(newArr)
        try {
            let res = await ApiService.delete(`http://localhost:8000/removeData/${index}`)
            getData();
            if (res.status == 200) {
                toast.success("delete success")
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
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
    const editData = (index, i) => {
        if (!isProb) {
            setAddOrEdit('edit')
            setEditindex(index)
            setLocalIndex(i)
            navigate('/');
        } else {
            setAddOrEdit('edit')
            setEditindex(index)
            setLocalIndex(i)
        }
    }
    return (
        <div className={isProb ? 'mainViewNotesCard' : 'notesCardCom'}>
            <>
                {
                    data && data.map((e, i) => {
                        return (
                            <div key={i} className={isProb ? 'notesCardcomponent' : "sepNotesCardcomponent"}>
                                <div className='card-head'>
                                    <div>
                                        <h4>{e.heading}</h4>
                                    </div>
                                    <div className='actionIcon'>
                                        <img src={editIcon} style={{ cursor: 'pointer' }} onClick={() => { editData(e._id, i) }} />
                                        <img src={deleteIcon} style={{ cursor: 'pointer' }} onClick={() => { delData(e._id, i) }} />
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <p style={{
                                        display: 'flex', flexWrap: 'wrap', width: '13rem',
                                        textWrap: 'balance'
                                    }}>
                                        {e.content}
                                    </p>
                                </div>
                                <div>
                                    <p>{e.date}</p>
                                </div>
                            </div>
                        )
                    })
                }</>
        </div>
    )
})

export default NotesCard