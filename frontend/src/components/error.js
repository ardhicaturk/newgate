import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Home } from '@material-ui/icons'
import {
    useHistory
} from 'react-router-dom'

const ErrorStatus = [
    {
        code: 400,
        message: 'Bad Request'
    },
    {
        code: 401,
        message: 'Unauthorized'
    },
    {
        code: 403,
        message: 'Forbidden'
    },
    {
        code: 404,
        message: 'Not Found'
    },
    {
        code: 405,
        message: 'Methode Not Allowed'
    },
    {
        code: 406,
        message: 'Not Acceptable'
    },
    {
        code: 412,
        message: 'Precondition Failed'
    },
    {
        code: 415,
        message: 'Unsupported Media Type'
    },
    {
        code: 500,
        message: 'Internal Server Error'
    },
    {
        code: 501,
        message: 'Not Implemented'
    }
]

const Error = ({...props}) => {
    const index = ErrorStatus.findIndex(x => x.code === props.status)
    const history = useHistory()
    return (
        <div className={'error-message'}>
            <Typography variant='h3'>
                Opps...
            </Typography>
            <Typography variant='h1'>
                {ErrorStatus[index].code}
            </Typography>
            <Typography variant='h4'>
                ({ErrorStatus[index].message})
            </Typography>
            <IconButton style={{borderRadius: '10px', padding: '5px', marginTop:'20px'}} label='Back to home' onClick={() => history.push('/')} >
                <Home style={{marginRight: '5px'}} /> Back to Home
            </IconButton>
        </div>
    )
}

export default Error;