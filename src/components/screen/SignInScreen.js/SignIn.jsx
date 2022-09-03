import React from 'react'
import styles from './SignIn.module.css'
import { Link } from "react-router-dom";
import settingIcon from '../../../assets/icons/signup.png'

const SignUp = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <img src={settingIcon} alt='settingIcon' />
          <h1 className={styles.title}>Sign In</h1>
          <input type="text" placeholder='LNMIIT Email Address' className={styles.input} />
          <input type="text" placeholder='Password' className={styles.input} />
          <button type="submit" className={styles.submitbtn}>SIGN IN</button>
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