import React, { useState } from 'react'
import styles from './SignUp.module.css'
import settingIcon from '../../../assets/icons/signup.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'

const SignUp = () => {

  let navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const adminData = {
    name: name,
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (name !== '' && email !== '' && password !== '') {
      setIsValid(false)
      return true;
    }
    else {
      setIsValid(true)
      return false;
    }
  }

  const createAdmin = () => {
    setIsLoading(true);
    axios.post('http://localhost:5000/adminsignup', adminData)
      .then(response => {
        console.log(response.data);
        setIsLoading(false);
        alert(response.data)
        navigate("/adminsignin", { replace: true });
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
          <h1 className={styles.title}>Sign Up</h1>
          <input type="text" placeholder='Full Name' className={styles.input} value={name} onChange={res => setName(res.target.value)} />
          <input type="text" placeholder='LNMIIT Email Address' className={styles.input} value={email} onChange={res => setEmail(res.target.value)} />
          <input type="text" placeholder='Password' className={styles.input} value={password} onChange={res => setPassword(res.target.value)} />
          <div className={styles.validBox}>
            {isValid === true ? <p>Kindly fill all the details.</p> : <p> &nbsp; </p>}
          </div>
          <button type="submit" className={styles.submitbtn} onClick={() => {
            if (isFormValid()) {
              createAdmin()
            }
            else {
              setIsValid(true);
            }
          }}>
            <div className={styles.submitbtnbox}>
              <p className={styles.submitbtnText}>SIGN UP</p>
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
            <Link to='/adminsignin' className={styles.subContainerText}>Already have admin account? Sign In</Link>
          </div>
          <p>Copyright &copy; C-Cell LNMIIT 2022. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default SignUp