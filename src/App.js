import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ApprovedOutpass from './components/screen/ApprovedOutpassScreen/ApprovedOutpass';
import { Dashboard } from './components/screen/DashboardScreen/Dashboard';
import ManagePosts from './components/screen/ManagePostsScreen/ManagePosts';
import PendingOutpass from './components/screen/PendingOutpassScreen/PendingOutpass';
import SignIn from './components/screen/SignInScreen.js/SignIn';
import SignUp from './components/screen/SignUpScreen/SignUp';
import { UploadPost } from './components/screen/UploadPostScreen/UploadPost';
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
    <Routes>
      <Route path='/' >
        <Route index={true} element={<Dashboard />} />
        <Route path='pendingoutpasses' element={<PendingOutpass />} />
        <Route path='approvedoutpasses' element={<ApprovedOutpass />} />
        <Route path='uploadpost' element={<UploadPost />} />
        <Route path='manageposts' element={<ManagePosts />} />
      </Route>
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
        <Routing />
      </BrowserRouter>
    </AdminContext.Provider>
  );
}

export default App;
