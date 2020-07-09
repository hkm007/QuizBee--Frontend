import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Container } from 'reactstrap'
import { LoadingContext } from '../../App'

function Quizes() {
    const history = useHistory()
    const inputRef = useRef([]);
    const [data, setData] = useState([])
    const { dispatchLoading } = useContext(LoadingContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if(!user) {
          history.push('/login')
        }

        dispatchLoading({type:"SHOW"})
        fetch('/api/quizes', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"token "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res=>res.json())
        .then(data2 => { 
            dispatchLoading({type:"HIDE"})
            setData(data2)
            // console.log(data2)s
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/login')
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
                (data.length) ?
                data.map((item, index) => {
                    return (
                        <div className="card my-4" key={item.id} style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                            <div className="card-body">
                                <Link to={`/quiz/${item.id}`} style={{textDecoration:'None', color:'blueviolet'}}><h2 className="blogHeadingAll" ref={item => inputRef.current[index] = item} onMouseEnter={()=>changeColor1(index)} onMouseLeave={()=>changeColor2(index)}>{item.name}</h2></Link>
                                <p className="text-dark">Quiz created on {item.createdOn}.</p>
                                <h6 className="my-2">Mentor: <span style={{color:'red'}}>{item.mentor}</span></h6>
                            </div>
                        </div>
                    )
                }) : null
            }
        </Container>
    )
}

export default Quizes
