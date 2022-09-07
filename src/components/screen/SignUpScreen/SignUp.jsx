import React, { useState } from 'react'
import styles from './SignUp.module.css'
import settingIcon from '../../../assets/icons/signup.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PersonAddAlt1Outlined, Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {

  let navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const adminData = {
    name: name,
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (ValidateEmail(email) && (name !== '' && email !== '' && password !== '')) {
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
      setIsValidEmail(false);
      return (true)
    }
    setIsValidEmail(true);
    alert("You have entered an invalid email address!")
    return (false)
  }

  const createAdmin = () => {
    setRefreshLoading(true);
    axios.post('http://localhost:5000/adminsignup', adminData)
      .then(response => {
        console.log(response.data);
        setRefreshLoading(false);
        navigate("/adminsignin", { replace: true });
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
          <h1 className={styles.title}>Sign Up</h1>
          <div className={styles.form}>
            <TextField id="outlined-basic" label="Full Name" variant="outlined" placeholder='Enter your Full Name' value={name} onChange={res => setName(res.target.value)} />
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
                createAdmin()
              }
              else {
                setIsValid(true);
              }
            }}
            endIcon={<PersonAddAlt1Outlined />}
            loading={refreshLoading}
            loadingPosition="end"
            variant="contained"
            fullWidth
          >
            Sign Up
          </LoadingButton>
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