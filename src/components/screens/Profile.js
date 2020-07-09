import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'reactstrap'
import { FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { UserContext, LoadingContext } from '../../App'
import DeleteModal from '../modals/DeleteModal';

function Profile(props) {
    const history = useHistory()
    const inputRef = useRef([]);
    const [mydata, setMydata] = useState([])
    const [userdata , setUserdata] = useState({})
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteTitle, setDeleteTitle] = useState('');
    const {state} = useContext(UserContext)
    const { dispatchLoading } = useContext(LoadingContext)
    
    useEffect(() => {
        const status = JSON.parse(localStorage.getItem("status"))

        if(status === 0) {
          history.push('/')
        }
        
        dispatchLoading({type:"SHOW"})
        {(state) ? setUserdata(state) : setUserdata(JSON.parse(localStorage.getItem("user")))}
        fetch(`/myblog`, {
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            setMydata(data2.myBlogs)
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/')
        })
    }, [])

    const changeColor1 = (i) => {
        inputRef.current[i].style.color = 'green';
    }

    const changeColor2 = (i) => {
        inputRef.current[i].style.color = 'blueviolet';
    }

    const deleteFunc = (blogId, blogTitle) => {
        setDeleteModal(true)
        setDeleteId(blogId)
        setDeleteTitle(blogTitle)
    }

    const deletePost = (blogId) => {
        dispatchLoading({type:"SHOW"})
        fetch(`/delete/${blogId}`, {
            method:"delete",
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            const newData = mydata.filter(item => {
                return item._id !== data2.deleted._id 
            })
            setMydata(newData)
            toast.success(data2.message)
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
        })
    }

    return (
        <Container className="my-3 col-md-6 mr-auto" style={(mydata.length) ? {marginBottom:'10px'} : {height:'100vh'}}>
            <div className="card my-4" style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                <div className="card-body">
                    <center>
                        <img src="https://cdn.clipart.email/fcc8ead276ddb30d657f23845cd2e028_avatar-icon-of-flat-style-available-in-svg-png-eps-ai-icon-_512-512.png" alt="avatar" style={{maxWidth:'100px', maxHeight:'100px', borderRadius:'20px'}}></img>
                        <h1>{ userdata.username }</h1>
                        <h6>Total Post: {mydata.length}</h6>
                        <p>Joined <Moment fromNow>{userdata.joinedOn}</Moment></p>
                    </center><hr className="my-4" />
                    {
                        (mydata.length) ? 
                        mydata.map((item, index) => {
                            return (
                                <div key={item._id} className="list-group">
                                    <div className="list-group-item list-group-item-action my-1">
                                        <div className="d-flex w-100 justify-content-between">
                                            <Link to={`/blog/${item._id}`} style={{textDecoration:'none', color:'blueviolet'}} ><h4 className="mb-1" ref={item => inputRef.current[index] = item} onMouseEnter={()=>changeColor1(index)} onMouseLeave={()=>changeColor2(index)}>{item.title}</h4></Link>
                                            <small className="text-muted"><Moment fromNow>{item.postedOn}</Moment></small>
                                        </div>
                                        <div className="mt-2"><FiTrash size={'2em'} color={'red'} className="mx-1" onClick={() => deleteFunc(item._id, item.title)} /></div> 
                                    </div>
                                </div>
                            )
                        }) : <center><p>*You haven't posted anything yet. <Link to="/new">Post here.</Link></p></center>
                    }
                </div>
                <DeleteModal show={deleteModal} display={setDeleteModal} title={deleteTitle} blogId={deleteId} action={deletePost} />
            </div>
        </Container>
    )
}

export default Profile
