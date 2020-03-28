import React from 'react';
import {
  Container,
  IconButton,
  Typography,
  Grid,
  OutlinedInput,
  InputAdornment,
  Button
} from '@material-ui/core';

import {
  People,
  KeyboardArrowLeft,
  AlternateEmail,
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

import {
    useHistory
} from 'react-router-dom'

const RegisterPage = ({...props}) => {
    const history = useHistory()
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
  return (
    <>
      <Typography variant={'h2'} className={'header-title'} >Complete Your Registration</Typography>
      <Container className='register-form'>
        <Grid container spacing={0} className={'header-form'}>
          <Grid item xs={1} >
            <IconButton onClick={() => history.goBack()}>
              <KeyboardArrowLeft/>
            </IconButton>
          </Grid>
          <Grid item xs={10} style={{textAlign: 'center'}}>
            <Typography variant={'h5'} style={{padding: '8px 0 8px 0'}}>Register</Typography>
          </Grid>
          <Grid item xs={1} >

          </Grid>
        </Grid>

        <Container className={'input-wrapper'}>
            <table boder='0' className='table-input'>
                <tr>
                    <td>Fullname</td><td>:</td><td><OutlinedInput style={{width:'250px', background: 'white'}} required id='input-registration-fullname' endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
                                <People />
                            </IconButton>
                        </InputAdornment>
                        }/></td>
                </tr>
                <tr>
                    <td>Email</td><td>:</td><td><OutlinedInput style={{width:'250px', background: 'white'}} required id='input-registration-email' type='email' endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
                                <AlternateEmail />
                            </IconButton>
                        </InputAdornment>
                        }/></td>
                </tr>
                <tr>
                    <td>Password</td><td>:</td><td><OutlinedInput style={{width:'250px', background: 'white'}} required id='input-registration-password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }/></td>
                </tr>
            </table>
            <Button variant="contained" color="primary" className='register-button-submit'>
                Submit
            </Button>
        </Container>
      </Container>
    </>
  )
};

export default RegisterPage;
