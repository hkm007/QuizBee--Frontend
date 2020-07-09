import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useHistory } from "react-router-dom";
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { BsHeart } from "react-icons/bs";
import { Container } from 'reactstrap'
import { LoadingContext } from '../../App'

function Blog() {
    const history = useHistory()
    const inputRef = useRef([]);
    const [data, setData] = useState([])
    const { dispatchLoading } = useContext(LoadingContext)

    useEffect(() => {
        dispatchLoading({type:"SHOW"})
        fetch('/blog/all')
        .then(res=>res.json())
        .then(data2 => { 
            dispatchLoading({type:"HIDE"})
            setData(data2.blogs)
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/')
            console.log(err)
        })
    }, [dispatchLoading])

    const changeColor1 = (i) => {
        inputRef.current[i].style.color = 'green';
    }

    const changeColor2 = (i) => {
        inputRef.current[i].style.color = 'blueviolet';
    }

    return (
        <Container className="my-3 col-md-6 mr-auto" style={(data.length) ? {marginBottom:'10px'} : {height:'100vh'}}>
            {
                data.map((item, index) => {
                    return (
                        <div className="card my-4" key={item._id} style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                            <div className="card-body">
                                <Link to={`/blog/${item._id}`} style={{textDecoration:'None', color:'blueviolet'}}><h2 className="blogHeadingAll" ref={item => inputRef.current[index] = item} onMouseEnter={()=>changeColor1(index)} onMouseLeave={()=>changeColor2(index)}>{item.title}</h2></Link>
                                <BsHeart />{' '}<small className="text-muted"><Moment fromNow>{item.postedOn}</Moment></small>
                                <h6 className="my-2">Author: <span style={{color:'red'}}>{item.author.username}</span></h6>
                            </div>
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default Blog
