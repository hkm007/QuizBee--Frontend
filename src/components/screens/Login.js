import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { FiLogIn } from "react-icons/fi"
import { FaUserAlt, FaKey } from "react-icons/fa"
import { toast } from 'react-toastify';
import { UserContext, LoadingContext } from '../../App'
import Footer from '../Footer';

function Login() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch } = useContext(UserContext)
    const { dispatchLoading } = useContext(LoadingContext)

    const PostData = (e) => {
        e.preventDefault()
        dispatchLoading({type:"SHOW"})
        let url = '/client/login'

        let data = {
            username,
            password
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, fetchData)
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                localStorage.setItem("jwt", JSON.stringify(data2.token))
                localStorage.setItem("user", JSON.stringify(data2.user))
                dispatch({type:"USER", payload:data2.user})
                toast.success(data2.message)
                history.push('/')
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
                        <center><h3><FiLogIn size={'2em'} /> Login</h3></center>
                        <form onSubmit={PostData}>
                            <div className="form-group">
                                <label htmlFor="username"><FaUserAlt size={'2em'} /> Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><FaKey size={'2em'} /> Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
                            </div>
                            <center>
                                <button type="submit" className="btn btn-success">Login</button>
                            </center>
                        </form>
                        <center>
                            <p className="mb-2 mt-3">Forgot Password ?</p>
                            <Link to="/register" style={{textDecoration:'none', color:'black'}}>Don't have an account ?</Link>
                        </center>
                    </div>
                </div>
            </Container>
            <Footer />
        </>  
    )
}

export default Login
