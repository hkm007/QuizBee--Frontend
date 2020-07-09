import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { FaUserAlt, FaKey, FaRegUserCircle } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'
import Footer from '../Footer';

function Register() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { dispatchLoading } = useContext(LoadingContext)

    const PostData = (e) => {
        e.preventDefault()
        dispatchLoading({type:"SHOW"})
        let url = '/client/register'

        let data = {
            username,
            email,
            password
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            dispatchLoading({type:"HIDE"})
            return toast.error('Please type correct email')
        }

        fetch(url, fetchData)
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message)
                history.push('/login')
            }
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            console.log(err)
        })
    }

    return (
        <>
            <Container className="my-3 col-md-4 mr-auto" style={{height:'75vh'}}>
                <div className="card my-4" style={{borderRadius:'20px', backgroundColor:'#f2f2f2', boxShadow:'10px 10px 5px black'}}>
                    <div className="card-body text-dark">
                        <center><h3><FaRegUserCircle size={'2em'} /> Register</h3></center>
                        <form onSubmit={PostData}>
                            <div className="form-group">
                                <label htmlFor="username"><FaUserAlt size={'2em'} /> Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><MdEmail size={'2em'} /> Email</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><FaKey size={'2em'} /> Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
                            </div>
                            <center><button type="submit" className="btn btn-success">Register</button></center>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default Register
