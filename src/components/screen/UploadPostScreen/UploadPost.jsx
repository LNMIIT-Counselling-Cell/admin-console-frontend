import { ArrowBackOutlined, TaskAltOutlined } from '@mui/icons-material';
import { TextField, MenuItem, Button, Alert, Snackbar } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './UploadPost.module.css'

const orgs = [
  {
    value: 'ccell',
    label: 'C-Cell',
  },
  {
    value: 'presi',
    label: 'Presidentail Council',
  },
  {
    value: 'gymkhana',
    label: `Student's Gymkhana`,
  },
  {
    value: 'cult',
    label: 'Cultural Council',
  },
  {
    value: 'scitech',
    label: 'Science & Technology Council',
  },
  {
    value: 'sports',
    label: 'Sports Council',
  },
  {
    value: 'cosha',
    label: 'COSHA Committee',
  },
  {
    value: 'viva',
    label: 'Vivacity',
  },
  {
    value: 'aaveg',
    label: 'Aaveg, The Nukkad Mandali',
  },
  {
    value: 'capriccio',
    label: 'Capriccio, The Music Club',
  },
  {
    value: 'eminence',
    label: 'Eminence, The Fashion Club',
  },
  {
    value: 'imagination',
    label: 'Imagination',
  },
  {
    value: 'insignia',
    label: 'Insignia, The Dance Club',
  },
  {
    value: 'litcom',
    label: 'Literary Committee',
  },
  {
    value: 'media',
    label: 'Media Cell',
  },
  {
    value: 'rendition',
    label: 'Rendition, The Dramatics Club',
  },
  {
    value: 'sankalp',
    label: 'Sankalp Club',
  },
  {
    value: 'plinth',
    label: 'Plinth',
  },
  {
    value: 'astro',
    label: 'Astronomy Club',
  },
  {
    value: 'cybros',
    label: 'Cybros',
  },
  {
    value: 'debsoc',
    label: 'Debsoc',
  },
  {
    value: 'phoenix',
    label: 'Phoenix',
  },
  {
    value: 'ecell',
    label: 'E-Cell',
  },
  {
    value: 'quiz',
    label: 'Quizzinga',
  },
  {
    value: 'cipher',
    label: 'Cipher',
  },
  {
    value: 'gdsc',
    label: 'GDSC',
  },
  {
    value: 'acm',
    label: 'ACM',
  },
  {
    value: 'asme',
    label: 'ASME',
  },
];

export const UploadPost = () => {

  let navigate = useNavigate()

  const [org, setOrg] = useState('');
  const [title, setTitle] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [iconurl, setIconurl] = useState('');
  const [desc, setDesc] = useState('');

  const [open, setOpen] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errmsg, setErrmsg] = useState('');

  const [isValid, setIsValid] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const postData = {
    title: title,
    description: desc,
    orgiconurl: iconurl,
    organization: org,
    imageurl: imgurl
  }

  const isFormValid = () => {
    if (title !== '' && desc !== '' && iconurl !== '' && org !== '') {
      setIsValid(false)
      return true;
    }
    else {
      setIsValid(true)
      return false;
    }
  }

  const resetForm = () => {
    setTitle('')
    setOrg('')
    setDesc('')
    setIconurl('')
    setImgurl('')
  }

  const uploadPostAPI = () => {
    console.log(postData);
    axios.post('http://localhost:5000/uploadPost', postData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
      }
    })
      .then(response => {
        setSuccess(true);
        setFailure(false);
        resetForm()
        console.log(response.data)
      })
      .catch(err => {
        setSuccess(false);
        setFailure(true);
        setErrmsg(err);
        console.log(err);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title of the post' required value={title} onChange={res => setTitle(res.target.value)} />
          <TextField
            select
            label="Organization"
            value={org}
            onChange={res => setOrg(res.target.value)}
            helperText="Please select your organization"
            required
          >
            {orgs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-basic" label="Icon URL" variant="outlined" placeholder='Paste URL of icon' required value={iconurl} onChange={res => setIconurl(res.target.value)} />
          <TextField id="outlined-basic" label="Image URL" variant="outlined" placeholder='Paste URL of image if any' value={imgurl} onChange={res => setImgurl(res.target.value)} />
        </div>
        <div className={styles.right}>
          <TextField id="outlined-basic" label="Description" variant="outlined" multiline required rows={16} value={desc} onChange={res => setDesc(res.target.value)} />
        </div>
      </div>
      <div className={styles.validBox}>
        {isValid === true ? <p>*Kindly fill all the required details.</p> : <p> &nbsp; </p>}
      </div>
      <div className={styles.btnContainer}>
        <Button variant="contained" endIcon={<TaskAltOutlined />} onClick={() => {
          if (isFormValid()) {
            uploadPostAPI()
          }
          else {
            setIsValid(true)
          }
          setTimeout(() => {
            setSuccess(false);
            setFailure(false);
          }, 10000)
        }}>
          Submit Post
        </Button>
        <Button variant="contained" endIcon={<ArrowBackOutlined />} onClick={() => navigate('/', { replace: true })}>
          Dashboard
        </Button>
        {success && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} key={'bottom' + 'center'}>
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            Post has been successfully submitted, kindly check the C-cell App.
          </Alert>
        </Snackbar>}
        {failure && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} key={'bottom' + 'center'}>
          <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            Error submitting post, {errmsg}.
          </Alert>
        </Snackbar>}
      </div>
    </div>
  )
}
