import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})
const AllUsers = () => {
    const classes = useStyles();

    const [users, setUsers] = useState([]);

    //READ
    const getData = async () => {
        try{
            const res = await fetch('http://localhost:5000/readData', {
                method: 'GET',         //to Get data from backend
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                //credentials: 'include'
            });

            const data = await res.json();
            console.log(data);

            setUsers(data);

        } catch(err) {
            console.log(err);
        }
    }

    //DELETE
    const deleteData = async (id) => {
        try{
            const res = await fetch(`http://localhost:5000/deleteData/${id}`,{
                method:'DELETE'
            });

            await res.json();
            console.log(`status: ${res.status}`);

            if(res.status!=200){
                alert('Delete Unsucessfull');
            }
            else{
                alert('Deleted!');
                getData()
            }
            
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Work</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow className={classes.row} key={user._id}>
                            {/*<TableCell>{user._id}</TableCell> {/* change it to user.id to use JSON Server */}
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.work}</TableCell>
                            <TableCell>
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={{
                                pathname: '/edit',
                                state: user
                            }}> Edit</Link></Button>
                            <Button color="secondary" variant="contained" onClick={()=>deleteData(user._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
        </>
    )
}

export default AllUsers
