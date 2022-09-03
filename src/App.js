import React, { useEffect, createContext, useReducer, useContext } from 'react';
// import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, useHistory } from 'react-router-dom';
// import Home from './components/screen/Home';
// import Profile from './components/screen/Profile';
import SignIn from './components/screen/SignInScreen.js/SignIn';
import SignUp from './components/screen/SignUpScreen/SignUp';
// import CreatePost from './components/screen/CreatePost';
// import UserProfile from './components/screen/UserProfile'
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext()

const Routing = () => {

  // const history = useHistory()
  // const { state, dispatch } = useContext(UserContext)

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user_details"))
  //   if (user) {
  //     dispatch({ type: "USER", payload: user }) // handing the situ when the user closes the app but does not log out so reopening the app should be taken care of
  //     // history.push('/')
  //   } else {
  //     history.push('/signin')
  //   }
  // }, [])

  return (
    // this will make sure that atleast one route is active
    <Routes>
      {/* <Route exact path='/'>
        <Home />
      </Route> */}
      <Route path='adminsignin' element={<SignIn />} />
      <Route path='adminsignup' element={<SignUp />} />
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
