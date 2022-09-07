import React, { useContext, useState } from 'react'
import styles from './SignIn.module.css'
import { Link, useNavigate } from "react-router-dom";
import settingIcon from '../../../assets/icons/signup.png'
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'
import { AdminContext } from '../../../App';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {

  let navigate = useNavigate();

  const { state, dispatch } = useContext(AdminContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const adminData = {
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (ValidateEmail(email) && (email !== '' && password !== '')) {
      setIsValid(false)
      return true;
    }
    else {
      setIsValid(true)
      return false;
    }
  }

  function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  const loginAdmin = () => {
    setRefreshLoading(true);
    axios.post('http://localhost:5000/adminsignin', adminData)
      .then(response => {
        console.log(response.data);
        setRefreshLoading(false);
        localStorage.setItem("jwt_token", response.data.token)
        localStorage.setItem("admin_details", JSON.stringify(response.data.admin))
        dispatch({ type: "ADMIN", payload: response.data.admin })
        navigate("/", { replace: true });
      })
      .catch(err => {
        setRefreshLoading(false);
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
          <div className={styles.form}>
            <TextField id="outlined-basic" label="LNMIIT Email Address" variant="outlined" placeholder='LNMIIT Email Address' value={email} onChange={res => setEmail(res.target.value)} error={isValidEmail} />
            <FormControl variant='outlined'>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-basic"
                placeholder='Enter your Password'
                value={password}
                onChange={res => setPassword(res.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className={styles.validBox}>
            {isValid === true ? <p>Kindly fill all the details.</p> : <p> &nbsp; </p>}
          </div>
          <LoadingButton
            onClick={() => {
              if (isFormValid()) {
                loginAdmin()
              }
              else {
                setIsValid(true);
              }
            }}
            endIcon={<LoginOutlined />}
            loading={refreshLoading}
            loadingPosition="end"
            variant="contained"
            fullWidth
          >
            Sign In
          </LoadingButton>
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