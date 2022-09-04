import { ArrowForwardOutlined, LogoutOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../../App'
import styles from './Dashboard.module.css'

export const Dashboard = () => {

  const { dispatch } = useContext(AdminContext)

  let navigate = useNavigate()
  const admin = localStorage.getItem('admin_details')

  const logout = () => {
    localStorage.clear()
    dispatch({ type: "CLEAR" })
    navigate('/adminsignin', { replace: true })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <h1>Welcome, {JSON.parse(admin).name}</h1>
        <h3>Choose an operation to continue</h3>
      </div>
      <div className={styles.btnContainer}>
        <Button variant="contained" endIcon={<ArrowForwardOutlined />} onClick={() => navigate('/pendingoutpasses')}>
          Pending Outpasses
        </Button>
        <Button variant="contained" endIcon={<ArrowForwardOutlined />} onClick={() => navigate('/approvedoutpasses')}>
          Approved Outpasses
        </Button>
        <Button variant="contained" endIcon={<ArrowForwardOutlined />} onClick={() => navigate('/uploadpost')}>
          Upload Post
        </Button>
        <Button variant="contained" endIcon={<LogoutOutlined />} onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  )
}
