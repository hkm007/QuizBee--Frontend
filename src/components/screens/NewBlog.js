import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'

function NewBlog() {
    const history = useHistory()
    const { dispatchLoading } = useContext(LoadingContext)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const PostData = (e) => {
        e.preventDefault()
        dispatchLoading({type:"SHOW"})
        let url = '/blog/new'

        let data = {
            title,
            content
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("jwt"))
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
                toast.success(data2.message)
                history.push('/blogs')
            }
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/new')
            console.log(err)
        })
    }

    return (
        <Container className="my-3 col-md-6 mr-auto">
            <div class="card my-4" style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                <div class="card-body">
                    <h1>New Post</h1><hr />
                    <form onSubmit={PostData}>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <textarea class="form-control" id="content" rows="10" onChange={(e)=> setContent(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Post</button>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default NewBlog
