import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'

function NewQuiz() {
    const history = useHistory()
    const { dispatchLoading } = useContext(LoadingContext)
    const [name, setName] = useState('')
    const [q1, setQ1] = useState('')
    const [a1, setA1] = useState('')
    const [q2, setQ2] = useState('')
    const [a2, setA2] = useState('')
    const [q3, setQ3] = useState('')
    const [a3, setA3] = useState('')
    const [q4, setQ4] = useState('')
    const [a4, setA4] = useState('')
    const [q5, setQ5] = useState('')
    const [a5, setA5] = useState('')
    const [q6, setQ6] = useState('')
    const [a6, setA6] = useState('')
    const [q7, setQ7] = useState('')
    const [a7, setA7] = useState('')
    const [q8, setQ8] = useState('')
    const [a8, setA8] = useState('')
    const [q9, setQ9] = useState('')
    const [a9, setA9] = useState('')
    const [q10, setQ10] = useState('')
    const [a10, setA10] = useState('')

    useEffect(() => {
        const status = JSON.parse(localStorage.getItem("status"))

        if(status === 0) {
          history.push('/')
        }
    }, [])

    const PostData = (e) => {
        e.preventDefault()
        dispatchLoading({type:"SHOW"})

        let data = {
            name,
            q1,
            a1,
            q2,
            a2,
            q3,
            a3,
            q4,
            a4,
            q5,
            a5,
            q6,
            a6,
            q7,
            a7,
            q8,
            a8,
            q9,
            a9,
            q10,
            a10
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization":"token "+JSON.parse(localStorage.getItem("jwt"))
            }
        }

        fetch('/api/quizes/', fetchData)
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
                    <h1>New Quiz</h1><hr />
                    <form onSubmit={PostData}>
                        <div class="form-group">
                            <label for="quizName">Quiz Name</label>
                            <input type="text" class="form-control" id="quizName" placeholder="Quiz Name" onChange={(e)=> setName(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="q1">Question 1</label>
                            <textarea class="form-control" id="q1" rows="4" onChange={(e)=> setQ1(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a1">Answer 1</label>
                            <input type="text" class="form-control" id="a1" placeholder="Answer 1" onChange={(e)=> setA1(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q2">Question 2</label>
                            <textarea class="form-control" id="q2" rows="4" onChange={(e)=> setQ2(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a2">Answer 2</label>
                            <input type="text" class="form-control" id="a2" placeholder="Answer 2" onChange={(e)=> setA2(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q3">Question 3</label>
                            <textarea class="form-control" id="q3" rows="4" onChange={(e)=> setQ3(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a3">Answer 3</label>
                            <input type="text" class="form-control" id="a3" placeholder="Answer 3" onChange={(e)=> setA3(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q4">Question 4</label>
                            <textarea class="form-control" id="q4" rows="4" onChange={(e)=> setQ4(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a4">Answer 4</label>
                            <input type="text" class="form-control" id="a4" placeholder="Answer 4" onChange={(e)=> setA4(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q5">Question 5</label>
                            <textarea class="form-control" id="q5" rows="4" onChange={(e)=> setQ5(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a5">Answer 5</label>
                            <input type="text" class="form-control" id="a5" placeholder="Answer 5" onChange={(e)=> setA5(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q6">Question 6</label>
                            <textarea class="form-control" id="q6" rows="4" onChange={(e)=> setQ6(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a6">Answer 6</label>
                            <input type="text" class="form-control" id="a6" placeholder="Answer 6" onChange={(e)=> setA6(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q7">Question 7</label>
                            <textarea class="form-control" id="q7" rows="4" onChange={(e)=> setQ7(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a7">Answer 7</label>
                            <input type="text" class="form-control" id="a7" placeholder="Answer 7" onChange={(e)=> setA7(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q8">Question 8</label>
                            <textarea class="form-control" id="q8" rows="4" onChange={(e)=> setQ8(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a8">Answer 8</label>
                            <input type="text" class="form-control" id="a8" placeholder="Answer 8" onChange={(e)=> setA8(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q9">Question 9</label>
                            <textarea class="form-control" id="q9" rows="4" onChange={(e)=> setQ9(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a9">Answer 9</label>
                            <input type="text" class="form-control" id="a9" placeholder="Answer 9" onChange={(e)=> setA9(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="q10">Question 10</label>
                            <textarea class="form-control" id="q10" rows="4" onChange={(e)=> setQ10(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="a10">Answer 10</label>
                            <input type="text" class="form-control" id="a10" placeholder="Answer 10" onChange={(e)=> setA10(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default NewQuiz
