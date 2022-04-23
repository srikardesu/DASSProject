import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const UsersList = (props, onCancel) => {
    const [users, setUsers] = useState([]);
    const [colours, setcolours] = useState([]);
    const [open, setOpen] = useState({});
    const [open2, setOpen2] = useState(false);
    const [Yarn, setYarn] = useState([]);
    const [completionDate, setcompletionDate] = useState("");
    const [length, setlength] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:5000/fabric/")
            .then((response) => {
                var obj = [];
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].weaverID == localStorage.getItem("id") && response.data[i].Sold == false) {
                        obj.push(response.data[i]);
                    }
                }
                setYarn(obj);
                let v = {}
                for (let i = 0; i < obj.length; i++) {
                    v[obj[i]._id] = false;
                }
                setOpen(v);
                setOpen2(false);
                setUsers(obj);
            });
    }, []);

    const onChangecompletionDate = (event) => {
        setcompletionDate(event.target.value);
    };
    const onChangelength = (event) => {
        setlength(event.target.value);
    };
    const onChangecolours = (event) => {
        setcolours(event.target.value);
    };

    function handleClickOpen(x) {
        let v = {}
        for (let i = 0; i < Yarn.length; i++) {
            v[Yarn[i]._id] = false;
        }
        v[x] = true;
        setOpen(v);
    };

    function handleClickOpen2() {
        console.log('hi');
        setOpen2(true);
        console.log('ye');
    };

    function handleClose(x) {
        let v = {}
        for (let i = 0; i < Yarn.length; i++) {
            v[Yarn[i]._id] = false;
        }
        v[x] = false;
        setOpen(v);
    };

    function handleClose2() {
        setOpen2(false);
    }

    function shiftStock(FabricID) {
        axios
            .get("http://localhost:5000/fabric/" + FabricID)
            .then((response) => {
                let newFabric = response.data;

                newFabric.Sold = 1;
                axios.post("http://localhost:5000/fabric/updatefabric/" + FabricID, newFabric)
                    .then((response) => {
                        alert("Shifted Fabric to market Successfully");
                        window.location.reload();
                    }
                    )
                    .catch((error) => {
                        alert("Fabric Shift unsuccessful"+error);
                    }
                    );
            });
    }

    function handleEditClose(FabricID) {
        axios.get("http://localhost:5000/fabric/" + FabricID)
            .then((res) => {
                const newFabric = {
                    yarnPackageNumber: res.data.yarnPackageNumber,
                    weaverID: res.data.weaverID,
                    completionDate: completionDate ? completionDate : res.data.completionDate,
                    length: length ? length : res.data.length,
                    Colours: colours ? colours : res.data.Colours,
                    Sold: res.data.Sold
                };
                axios.post("http://localhost:5000/fabric/updatefabric/" + FabricID, newFabric)
                    .then((res) => {
                        alert('updated successfully');
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        alert('error :(');
                    })
                // window.location.reload();
                setOpen({ ...open, x: false });
            })
    };


    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={9} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fabric ID</TableCell>
                                    <TableCell>Yarn Package ID</TableCell>
                                    <TableCell>Completion Date</TableCell>
                                    <TableCell>Length</TableCell>
                                    {/* <TableCell>Colours</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        {/* <TableCell>{ind}</TableCell> */}
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.yarnPackageNumber}</TableCell>
                                        <TableCell>{user.completionDate}</TableCell>
                                        <TableCell>{user.length}</TableCell>
                                        {/* <TableCell>{user.colours}</TableCell> */}
                                        {/* <TableCell>{user.colours.map((hmm, ind) => (
                                            <div>{hmm.ColourID} {hmm.Quantity}</div>
                                        ))}</TableCell> */}
                                        <TableCell>
                                            <Button
                                                type="primary"
                                                onClick={() => {handleClickOpen(user._id)}}
                                            >
                                                Update Stock
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={() => {shiftStock(user._id)}}
                                            >
                                                Clear Stock
                                            </Button>
                                            <Dialog open={open[user._id]} onClose={() => handleClose(user._id)}>
                                                <DialogTitle>Update Stock</DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Completion Date"
                                                        type="text"
                                                        onChange={onChangecompletionDate}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Length"
                                                        type="text"
                                                        onChange={onChangelength}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="colours"
                                                        type="email"
                                                        onChange={onChangecolours}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleClose(user._id)}>Cancel</Button>
                                                    <Button onClick={() => handleEditClose(user._id)}>OK</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default UsersList;