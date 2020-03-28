import React from 'react';
import {
  Container,
  IconButton,
  Typography,
  Grid,
  Button
} from '@material-ui/core';

import {
  KeyboardArrowLeft,
} from '@material-ui/icons'

import {
    useHistory
} from 'react-router-dom'

const ForgotPasswordPage = ({...props}) => {
    const history = useHistory()
  return (
    <>
      <Typography variant={'h2'} className={'header-title'} style={{visibility: 'hidden'}}>Reset</Typography>
      <Container className='forgot-form'>
        <Grid container spacing={0} className={'header-form'}>
          <Grid item xs={1} >
            <IconButton onClick={() => history.goBack()}>
              <KeyboardArrowLeft/>
            </IconButton>
          </Grid>
          <Grid item xs={10} style={{textAlign: 'center'}}>
            <Typography variant={'h5'} style={{padding: '8px 0 8px 0'}}>Forgot Password</Typography>
          </Grid>
          <Grid item xs={1} >

          </Grid>
        </Grid>

        <Container className={'input-wrapper'}>
            <p>
                We will send you an email to reset your password, please fill the correct email!
            </p>
            <input style={{marginBottom: '20px'}} type='email' id='forgot-email'></input> <br/>
            <Button variant="contained" color="primary" className='register-button-submit'>
                Submit
            </Button>
        </Container>
      </Container>
    </>
  )
};

export default ForgotPasswordPage;
