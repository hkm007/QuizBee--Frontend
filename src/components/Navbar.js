import React, { useState, useContext, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row
} from 'reactstrap';
import { FaPlus, FaRegUser } from 'react-icons/fa'

const MyNavbar = (props) => {
  const history = useHistory()
  const inputRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const {state, dispatch} = useContext(UserContext)

  const logoutUser = () => {
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/')
  }

  const changeColor1 = (i) => {
    inputRef.current[i].style.color = 'gold';
  }

  const changeColor2 = (i) => {
    inputRef.current[i].style.color = 'white';
  }

  const renderList = () => {
    if(state) {
      const status = JSON.parse(localStorage.getItem("status"))
        if(status === 1) {
          return [
            <Link to="/new" ref={item => inputRef.current[3] = item} className="ml-2" style={{textDecoration:'None', color:'white'}} onMouseEnter={()=>changeColor1(3)} onMouseLeave={()=>changeColor2(3)}><FaPlus size={'2em'} /></Link>,
            <Link to="/profile" ref={item => inputRef.current[4] = item} className="mx-3" style={{textDecoration:'None', color:'white'}} onMouseEnter={()=>changeColor1(4)} onMouseLeave={()=>changeColor2(4)}><FaRegUser size={'2em'} /></Link>,
            <Link to="/" className="btn btn-danger mx-2" style={{textDecoration:'None', color:'white'}} onClick={() => logoutUser()}>Logout</Link>
          ]
        } else {
          return [
            <Link to="/" className="btn btn-danger mx-2" style={{textDecoration:'None', color:'white'}} onClick={() => logoutUser()}>Logout</Link>
          ]
        }
    }
    else {
        return [
          <Link to="/login" className="btn btn-success mr-2" style={{textDecoration:'None', color:'white', marginLeft:'15px'}}>Login</Link>,
          <Link to="/register" className="btn btn-primary mr-2" style={{textDecoration:'None', color:'white'}}>Register</Link>
        ]
    }
  }

  return (
    <div>
      <Navbar dark expand="md" style={{backgroundColor:'#6b00b3'}}>
        <NavbarBrand className="logoBrand">QuizBee</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Link to="/" ref={item => inputRef.current[0] = item} className="my-2" style={{textDecoration:'None', color:'white', marginRight:'10px'}} onMouseEnter={()=>changeColor1(0)} onMouseLeave={()=>changeColor2(0)}><b>Home</b></Link>
            <Link to="/quizes" ref={item => inputRef.current[1] = item} className="my-2" style={{textDecoration:'None', color:'white', marginRight:'10px'}} onMouseEnter={()=>changeColor1(1)} onMouseLeave={()=>changeColor2(1)}><b>Test</b></Link>
            <Link to="/contact" ref={item => inputRef.current[2] = item} className="my-2" style={{textDecoration:'None', color:'white', marginBottom:'10px'}} onMouseEnter={()=>changeColor1(2)} onMouseLeave={()=>changeColor2(2)}><b>Contact</b></Link>
          </Nav>
          <Row className="my-2">
            {renderList()}
          </Row>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;