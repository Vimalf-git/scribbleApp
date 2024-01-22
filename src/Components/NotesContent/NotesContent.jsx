import React, { useContext, useEffect, useRef} from 'react'
import NotesCard from '../NotesCard/NotesCard'
import { Button } from 'react-bootstrap'
import { NotesDataContext } from '../Context/NotesContext'
import { toast } from 'react-toastify'
import ApiService from '../../Common/ApiService'
import { jwtDecode } from 'jwt-decode'
import './NotesContent.css'
import { Description } from '@mui/icons-material'
const NotesContent = React.memo(() => {
    const { data, setData, addOrEdit, setAddOrEdit, editIndex, notesBlueIcon,
        getData, localIndex } = useContext(NotesDataContext);
    const refTitle = useRef();
    const refBody = useRef();
    useEffect(() => {
        if (addOrEdit == 'edit') {
            let res = data.filter((e) => e._id == editIndex)
            refTitle.current.value = res[0].heading;
            refBody.current.value = res[0].content;
        }
    }, [addOrEdit, editIndex])
    const addData = async () => {
        const heading = refTitle.current.value;
        const content = refBody.current.value;
        const mon = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date()
        let curDate = date.getDate() + ":" + mon[date.getMonth()] + ":" + date.getFullYear()
        let token=sessionStorage.getItem('token')
        let email=jwtDecode(token).email
        if (addOrEdit === 'add') {
            const newDataVal = {
                email ,
                heading,
                content,
                date: curDate
            }
            try {
                let postRes = await ApiService.post("http://localhost:8000/saveData", newDataVal)
                if (postRes.status == 200) {
                    toast.success('data saved successfully')
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
            getData()
            refTitle.current.value = '';
            refBody.current.value = '';

        } else {
            const newEditVal = {
                id: editIndex,
                email,
                heading,
                content,
                date: curDate
            }
            let sam = data.filter((e) => e._id == editIndex)
            sam[0].content = content;
            sam[0].heading = heading;
            sam[0].date = curDate;
            let samArr = [...data];
            samArr.splice(localIndex, 1, sam[0]);
            setData(samArr);
            await ApiService.put("http://localhost:8000/updatenote", newEditVal)
            getData();
            refTitle.current.value = '';
            refBody.current.value = '';
            setAddOrEdit('add')
        }
    }
    return (
        <>
            <div className='noteCon'>
                <div className='dummy'>
                    <div className='notes-entry'>
                        <h4 style={{ color: "#203562", margin: '2em 0em 0em 2em' }}>Add a Note</h4>
                        <input ref={refTitle} className='notes-in-bx' placeholder='Title' />
                        <textarea ref={refBody} className='notes-txt-bx' placeholder='Take a note...' />
                        <Button className='add-btn' onClick={() => { addData() }}>{addOrEdit == 'add' ? "+ADD" : "Update"}</Button>
                    </div>
                </div>
                <div className='notes-fetch-Main'>
                    <div className='notes-fetch'>
                        <Description className='descIcon' style={{color:'#203562'}}/>
                        <span style={{ color: "#203562", fontSize: '1.5em' }}>My Notes</span>
                    </div>
                    <h4 style={{ color: '#677898', marginLeft: '1.5em' }}>Recently viewed</h4>
                    <div className='notesCard'>
                        <NotesCard isProb={true} />
                    </div>
                </div>
            </div>
        </>
    )
})

export default NotesContent