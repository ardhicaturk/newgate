import React from 'react';
import {
  Container,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Grid,
  Button
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  VpnKey,
  AlternateEmail
} from '@material-ui/icons'

import {
  Link
} from 'react-router-dom'

const LoginPage = ({...props}) => {

  return (
    <>
      <Typography variant={'h2'} className={'header-title'} >Welcome to Newgate</Typography>
      <Container className='login-form'>
        <Grid container spacing={0} className={'header-form'}>
          <Grid item xs={1} >
            <IconButton>
              <MenuIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={10} style={{textAlign: 'center'}}>
            <Typography variant={'h5'} style={{padding: '8px 0 8px 0'}}>Login</Typography>
          </Grid>
          <Grid item xs={1} >

          </Grid>
        </Grid>

        <Container className={'input-form-wrapper'}>
          <TextField
            className={'input-form-username'}
            placeholder="Email"
            type='email'
            autoFocus={true}
            style={{display: 'block'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{marginTop: 0}}>
                  <AlternateEmail className='icon-email' />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={'input-form-password'}
            placeholder="Password"
            type='password'
            style={{display: 'block'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{marginTop: 0}}>
                  <VpnKey className='icon-password'/>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="primary" className='login-button-submit'>
            Submit
          </Button>

          <Grid container style={{marginTop: '10px', borderBottom: '1px solid black'}}>
            <Grid item xs={3}>
              <Link to='/forgot'>Forgot password?</Link>
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={3}>
              <Link to={'/register'}>Register</Link>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  )
};

export default LoginPage;
