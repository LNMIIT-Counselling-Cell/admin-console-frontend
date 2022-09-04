import { TextField, MenuItem } from '@mui/material'
import React from 'react'
import styles from './UploadPost.module.css'

const orgs = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export const UploadPost = () => {

  const [org, setOrg] = React.useState('');

  const handleChange = (event) => {
    setOrg(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title of the post' required />
        <TextField id="outlined-basic" label="Description" variant="outlined" multiline required/>
        <TextField id="outlined-basic" label="Image URL" variant="outlined" placeholder='Paste URL of image if any' />
        <TextField
          select
          label="Organization"
          value={org}
          onChange={handleChange}
          helperText="Please select your organization"
          required
        >
          {orgs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <TextField id="outlined-basic" label="Icon URL" variant="outlined" placeholder='Paste URL of icon' required />
      </div>
      <div></div>
    </div>
  )
}
