import React, { useEffect } from 'react'
import styles from './SignUp.module.css'
import settingIcon from '../../../assets/icons/signup.png'
import { Link } from "react-router-dom";

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUser = () => {
    fetch("/adminsignup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
          alert(data.error)
        } else {
          alert(data.message)
          // history.push('/signin')
        }
      })
      .catch(error => console.log(error))
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <img src={settingIcon} alt='settingIcon' />
          <h1 className={styles.title}>Sign Up</h1>
          <input type="text" placeholder='Full Name' className={styles.input} />
          <input type="text" placeholder='LNMIIT Email Address' className={styles.input} />
          <input type="text" placeholder='Password' className={styles.input} />
          <button type="submit" className={styles.submitbtn}>SIGN UP</button>
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