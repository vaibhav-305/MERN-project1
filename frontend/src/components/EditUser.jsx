import React from 'react'
import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
});


const EditUser = () => {
    const classes = useStyles();

    const [user, setUser] = useState({
        id:'',
        name: '',
        email: '',
        phone: '',
        work: ''
    });
    
    let history = useHistory();
    const location = useLocation()

    const onValueChange = (e) => {
        //console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    const updateData = async () => {
        const {id, name, email, phone, work } = user;

        try{
            const res = await fetch('http://localhost:5000/editData',{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    id, name, email, phone, work
                })
            });

            await res.json();
            console.log('Status: '+res.status);

            if(res.status==200){
                alert('Updated')
                history.push('/all');
            }
            else{
                alert('Update unsuccessfull')
            }

        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        console.log(location)
        const userdata = location.state;
        if(userdata)
            setUser({id:userdata._id ,name: userdata.name, email: userdata.email, phone: userdata.phone, work: userdata.work});
    },[]);

    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Edit Information</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input type='text' onChange={(e) => onValueChange(e)} name='name' value={user.name} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">E-mail</InputLabel>
                    <Input type='email' onChange={(e) => onValueChange(e)} name='email' value={user.email} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input type='number' onChange={(e) => onValueChange(e)} name='phone' value={user.phone} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Work</InputLabel>
                    <Input type='text' onChange={(e) => onValueChange(e)} name='work' value={user.work}  aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <Button variant="contained" color="primary" onClick={updateData} >Edit User</Button>
                </FormControl>
            </FormGroup>
        </>
    )
}

export default EditUser
