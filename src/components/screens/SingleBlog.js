import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Container } from 'reactstrap'
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'

function SingleBlog(props) {
    const history = useHistory()
    let { blog_id } = (props.match.params)
    const [data, setData] = useState([])
    const { dispatchLoading } = useContext(LoadingContext)

    useEffect(() => {
        dispatchLoading({type:"SHOW"})
        fetch(`/blog/${blog_id}`)
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            setData(data2.blog)
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/')
            console.log(err)
        })
    }, [])

    return (
        <Container className="my-3 col-md-8 mr-auto" style={(data.length) ? {marginBottom:'10px'} : {height:'100vh'}}>
            {
                data.map(item => {
                    return (
                        <div className="card my-4" style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                            <div className="card-body">
                                <h2 className="blogHeadingSingle">{item.title}</h2>
                                <h6>Published <Moment fromNow>{item.postedOn}</Moment> by <span style={{color:'red'}}>{item.author.username}</span></h6>
                                <hr />
                                <pre className="text-muted" style={{fontSize:'20px', whiteSpace:'pre-wrap'}}>
                                    {item.content}
                                </pre>
                                <hr />
                            </div>
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default SingleBlog
