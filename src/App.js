import React, { useEffect, createContext, useReducer, useContext } from 'react';
// import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/screen/HomeScreen/Home';
// import Home from './components/screen/Home';
// import Profile from './components/screen/Profile';
import SignIn from './components/screen/SignInScreen.js/SignIn';
import SignUp from './components/screen/SignUpScreen/SignUp';
import { reducer, initialState } from './reducers/userReducer';

export const AdminContext = createContext()

const Routing = () => {

  let navigate = useNavigate()

  const { state, dispatch } = useContext(AdminContext)

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin_details"))
    if (admin) {
      dispatch({ type: "ADMIN", payload: admin }) // handing the situ when the user closes the app but does not log out so reopening the app should be taken care of
      // history.push('/')
    } else {
      // history.push('/signin')
      navigate('/adminsignin', { replace: true })
    }
  }, [])

  return (
    // this will make sure that atleast one route is active
    <Routes>
      {/* <Route exact path='/'>
        <Home />
      </Route> */}
      <Route path='/' element={<Home />} />
      <Route path='adminsignin' element={<SignIn />} />
      <Route path='adminsignup' element={<SignUp />} />
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AdminContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routing />
      </BrowserRouter>
    </AdminContext.Provider>
  );
}

export default App;
