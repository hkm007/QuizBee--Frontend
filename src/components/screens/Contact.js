import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'
import Footer from '../Footer'


function Contact() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(false)
    const { dispatchLoading } = useContext(LoadingContext)

    const sendMessage = (e) => {
        e.preventDefault()
        dispatchLoading({type:"SHOW"})
        let url = `/contact`

        let data = {
            name,
            email, 
            message,
            status
        }

        let fetchData = {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json'
            }
        }

        fetch(url, fetchData)
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            {(data2.error) ? toast.error(data2.error) : toast.success(data2.message)}
            history.push('/')
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong!')
        })
    }

    return (
        <>
            <Container className="my-3 col-md-6 mr-auto">
                <div class="card my-4" style={{borderRadius:'20px', backgroundColor:'#f2f2f2', boxShadow:'10px 10px 5px black'}}>
                    <div class="card-body text-dark">
                        <h1>Contact Us</h1><hr />
                        <form onSubmit={sendMessage}>
                            <div class="form-group">
                                    <label htmlFor="contactName">Name</label>
                                    <input type="text" class="form-control" id="contactName" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div class="form-group">
                                    <label htmlFor="contactEmail">Email</label>
                                    <input type="email" class="form-control" id="contactEmail" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label htmlFor="contactMessage">Message</label>
                                <textarea class="form-control" id="contactMessage" rows="3" onChange={(e)=>setMessage(e.target.value)} required></textarea>
                            </div>
                            <div class="custom-control custom-switch mb-3">
                                <input type="checkbox" class="custom-control-input" id="contactSwitch" onChange={(e)=>setStatus(e.target.value)} />
                                <label class="custom-control-label" htmlFor="contactSwitch"><strong>Do you have an account on this website ?</strong></label>
                            </div>
                            <button type="submit" class="btn btn-success btn-lg">Send</button>
                        </form>
                    </div>
                </div> 
            </Container>
            <Footer />
        </>
    )
}

export default Contact
