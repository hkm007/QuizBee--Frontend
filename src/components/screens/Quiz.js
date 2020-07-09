import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Container, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import { toast } from 'react-toastify';
import { LoadingContext } from '../../App'
import ResultModal from '../modals/ResultModal';

function Quiz(props) {
    const history = useHistory()
    let { quiz_id } = (props.match.params)
    const [resultModal, setResultModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({})
    const [a1res, setA1res] = useState('')
    const [a2res, setA2res] = useState('')
    const [a3res, setA3res] = useState('')
    const [a4res, setA4res] = useState('')
    const [a5res, setA5res] = useState('')
    const [a6res, setA6res] = useState('')
    const [a7res, setA7res] = useState('')
    const [a8res, setA8res] = useState('')
    const [a9res, setA9res] = useState('')
    const [a10res, setA10res] = useState('')
    const { dispatchLoading } = useContext(LoadingContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if(!user) {
          history.push('/login')
        }

        dispatchLoading({type:"SHOW"})
        fetch(`/api/quizes/${quiz_id}`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"token "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res => res.json())
        .then(data2 => {
            dispatchLoading({type:"HIDE"})
            setData(data2)
        })
        .catch(err => {
            dispatchLoading({type:"HIDE"})
            toast.error('Something went wrong')
            history.push('/')
            console.log(err)
        })
    }, [])

    const Result = (e) => {
        e.preventDefault();
        let correct = 0;

        if(data.a1.toLowerCase() === a1res.toLowerCase()) {
            correct += 1;
        }

        if(data.a2.toLowerCase() === a2res.toLowerCase()) {
            correct += 1;
        }

        if(data.a3.toLowerCase() === a3res.toLowerCase()) {
            correct += 1;
        }

        if(data.a4.toLowerCase() === a4res.toLowerCase()) {
            correct += 1;
        }

        if(data.a5.toLowerCase() === a5res.toLowerCase()) {
            correct += 1;
        }

        if(data.a6.toLowerCase() === a6res.toLowerCase()) {
            correct += 1;
        }

        if(data.a7.toLowerCase() === a7res.toLowerCase()) {
            correct += 1;
        }

        if(data.a8.toLowerCase() === a8res.toLowerCase()) {
            correct += 1;
        }

        if(data.a9.toLowerCase() === a9res.toLowerCase()) {
            correct += 1;
        }

        if(data.a10.toLowerCase() === a10res.toLowerCase()) {
            correct += 1;
        }

        setTotal(correct);
        setResultModal(true);
    }
    

    return (
        <Container className="my-3 col-md-8 mr-auto" style={(data.length) ? {marginBottom:'10px'} : {height:'100vh'}}>
            <div className="card my-4" style={{borderRadius:'20px', backgroundColor:'white', boxShadow:'10px 10px 5px black', backgroundImage:"url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')"}}>
                <div className="card-body">
                    <h2 className="blogHeadingSingle">{data.name}</h2>
                    <h6>Quiz created on {data.createdOn} by <span style={{color:'red'}}>{data.mentor}</span></h6><br />
                    <strong>Instructions</strong><br />
                    <p>Total time: 15:00 minutes</p>
                    <p>Total Questions: 10</p>
                    <p>After completing the test click submit button.</p>
                    <hr />
                    <form onSubmit={Result} id={'qrcodeRedirectForm'}>
                        <p><strong>Question 1</strong> {data.q1}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 1</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a1_res'} onChange={(e)=> setA1res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 2</strong> {data.q2}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 2</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a2_res'} onChange={(e)=> setA2res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 3</strong> {data.q3}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 3</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a3_res'} onChange={(e)=> setA3res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 4</strong> {data.q4}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 4</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a4_res'} onChange={(e)=> setA4res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 5</strong> {data.q5}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 5</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a5_res'} onChange={(e)=> setA5res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 6</strong> {data.q6}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 6</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a6_res'} onChange={(e)=> setA6res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 7</strong> {data.q7}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 7</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a7_res'} onChange={(e)=> setA7res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 8</strong> {data.q8}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 8</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a8_res'} onChange={(e)=> setA8res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 9</strong> {data.q9}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 9</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a9_res'} onChange={(e)=> setA9res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <p><strong>Question 10</strong> {data.q10}</p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Answer 10</InputGroupText>
                            </InputGroupAddon>
                            <Input id={'a10_res'} onChange={(e)=> setA10res(e.target.value)} />
                        </InputGroup>
                        <br />
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    <hr />
                </div>
                <ResultModal show={resultModal} display={setResultModal} score={total} />
            </div>
        </Container>
    )
}

export default Quiz
