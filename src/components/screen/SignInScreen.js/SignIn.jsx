import React, { useContext, useState } from 'react'
import styles from './SignIn.module.css'
import { Link, useNavigate } from "react-router-dom";
import settingIcon from '../../../assets/icons/signup.png'
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'
import { AdminContext } from '../../../App';

const SignUp = () => {

  let navigate = useNavigate();

  const { state, dispatch } = useContext(AdminContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const adminData = {
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (email !== '' && password !== '') {
      setIsValid(false)
      return true;
    }
    else {
      setIsValid(true)
      return false;
    }
  }

  const loginAdmin = () => {
    setIsLoading(true);
    axios.post('http://localhost:5000/adminsignin', adminData)
      .then(response => {
        console.log(response.data);
        setIsLoading(false);
        alert(response.data)
        localStorage.setItem("jwt_token", response.data.token)
        localStorage.setItem("admin_details", JSON.stringify(response.data.admin))
        dispatch({ type: "ADMIN", payload: response.data.admin })
        navigate("/", { replace: true });
      })
      .catch(err => {
        setIsLoading(false);
        alert(err.message)
        console.log(err)
      })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <img src={settingIcon} alt='settingIcon' />
          <h1 className={styles.title}>Sign In</h1>
          <input type="text" placeholder='LNMIIT Email Address' className={styles.input} value={email} onChange={res => setEmail(res.target.value)} />
          <input type="text" placeholder='Password' className={styles.input} value={password} onChange={res => setPassword(res.target.value)} />
          <div className={styles.validBox}>
            {isValid === true ? <p>Kindly fill all the details.</p> : <p> &nbsp; </p>}
          </div>
          <button type="submit" className={styles.submitbtn} onClick={() => {
            if (isFormValid()) {
              loginAdmin()
            }
            else {
              setIsValid(true);
            }
          }}>
            <div className={styles.submitbtnbox}>
              <p className={styles.submitbtnText}>SIGN IN</p>
              {isLoading && <ThreeCircles
                height="24"
                width="24"
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />}
            </div>
          </button>
          <div className={styles.subContainer}>
            <Link to='/adminsignup' className={styles.subContainerText}>Don't have admin account? Sign Up</Link>
          </div>
          <p>Copyright &copy; C-Cell LNMIIT 2022. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default SignUp