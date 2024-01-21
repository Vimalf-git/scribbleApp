import React, { Suspense, useContext } from 'react'
import { NotesDataContext } from './NotesContext';
import ApiService from '../Common/ApiService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
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
            console.log(error);
            if (error.response.status === 400) {
                // toast.error(error.response.data.message)
                toast.error("token ecpire")
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
        <div className={isProb?'mainViewNotesCard':'notesCardCom'}>
            {/* {isProb ? */}
                {/* <Suspense fallback={<p>Loading...</p>}> */}
                    <>
                    {/* {isProb?"":<p style={{width:'80%',backgroundColor:'#203562',marginTop:'2rem',height:'2rem',
                display:'flex',alignItems:'center',borderRadius:'.5rem',textIndent:'1rem',color:'#fff',position:'sticky',top:'5rem',zIndex:'1'
                ,  fontFamily: 'Montserrat' ,marginBottom:'2rem'
                }}>Your Scribble</p>} */}
                    {
                        data && data.map((e, i) => {
                            return (
                                <div key={i} className={isProb?'notesCardcomponent':"sepNotesCardcomponent"}>

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
                {/* </Suspense> */}
                {/* : }
                <div className='card-data-toggle'>
                    <Button onClick={()=>navigate("/notescontent")}>back</Button>
                    {
                        data && data.map((e, i) => {
                            return (
                                <div key={i} className='notesCardcomponent'>
                                    <div className='card-head'>
                                        <div>
                                            <h4>{e.heading}</h4>
                                        </div>
                                        <div className='actionIcon'>
                                            <img src={e.editIcon} style={{ cursor: 'pointer' }} onClick={() => { { editData(i) } }} />
                                            <img src={e.deleteIcon} style={{ cursor: 'pointer' }} onClick={() => { delData(i) }} />
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <p>{e.content}</p>
                                    </div>
                                    <div >
                                        <p>{e.date}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            } */}
        </div>
    )
})

export default NotesCard