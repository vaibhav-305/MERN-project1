import React, { useState } from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddUser = () => {
    const classes = useStyles();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        work: ''
    });

    let history = useHistory();

    const onValueChange = (e) => {
        //console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const postData = async (e) =>{
        e.preventDefault();

        const { name, email, phone, work } = user;
        
        const res = await fetch('http://localhost:5000/addData',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, work
            })
        });

        const op = await res.json();
        console.log(op);        

        if(op.status == 201){
            window.alert(op.message);
        }
        else{
            window.alert("data adding failed");
        }
    }

    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Add User</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='name' value={user.name} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">E-Mail</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='email' value={user.email} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input type='number' onChange={(e) => onValueChange(e)} name='phone' value={user.phone} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Work</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='work' value={user.work} />
                </FormControl>
                <FormControl>
                    <Button variant="contained" color="primary" onClick={postData}>Add User</Button>
                </FormControl>
            </FormGroup>
        </>
    )
}

export default AddUser
