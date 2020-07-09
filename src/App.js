import React, { createContext, useReducer, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay'
import SyncLoader from 'react-spinners/SyncLoader'
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Contact from './components/screens/Contact';
import Blogs from './components/screens/Blogs';
import SingleBlog from './components/screens/SingleBlog';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import NewBlog from './components/screens/NewBlog';
import Profile from './components/screens/Profile';
import { reducer, initialState } from './reducers/userReducer'
import { reducerLoading, initialstateLoading } from './reducers/loadingReducer'

toast.configure()

export const UserContext = createContext()
export const LoadingContext = createContext()

const Routing = () => {
    const history = useHistory()
    const {dispatch} = useContext(UserContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
          dispatch({type:"USER", payload:user})
        }
        else {
          history.push('/login')
        }
    }, [dispatch])

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/blog/:blog_id" component={SingleBlog} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/new" component={NewBlog} />
            <Route path="/profile" component={Profile} />
        </Switch>
    )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [stateLoading, dispatchLoading] = useReducer(reducerLoading, initialstateLoading)

  return (
    <>
      <UserContext.Provider value={{state, dispatch}} >
        <Router>
            <LoadingContext.Provider value = {{stateLoading, dispatchLoading}} >
              <LoadingOverlay active={stateLoading} spinner={<SyncLoader size={20} color={'silver'} />}>
                <Navbar />
                <Routing />
              </LoadingOverlay>
            </LoadingContext.Provider>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
