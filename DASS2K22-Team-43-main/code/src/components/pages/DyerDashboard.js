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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowUpwardIcon1 from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowDownwardIcon1 from "@mui/icons-material/ArrowDownward";
// import { typography } from "@mui/system";
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
//import './index.css';
import { Checkbox } from 'antd';
import { Button1, Modal, Form, Input, Radio } from 'antd';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const UsersList = (props, onCancel) => {
    const [users, setUsers] = useState([]);
    const [spinnerID, setspinID] = useState("");
    const [countNumber, setcountNumber] = useState(0);
    const [twistNumber, settwistNumber] = useState(0);
    const [spinDate, setspinDate] = useState("");
    const [cottonOrigin, setcottonOrigin] = useState("");
    const [yarnType, setyarnType] = useState("");
    const [dyerID, setdyerID] = useState(localStorage.getItem("id"));
    const [dyeingDate, setdyeingDate] = useState("");
    const [colours, setcolours] = useState([]);
    const [specialTreatment, setspecialTreatment] = useState("");
    const [currentStatus, setcurrentStatus] = useState("");
    const [weaverID, setweaverID] = useState("");
    const [open, setOpen] = useState({});
    const [open2, setOpen2] = useState(false);
    const [Yarn, setYarn] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/yarnPackage/")
            .then((response) => {
                //alert("Created\t" + response.data.name);
                // setWallet(response.data.wallet);
                // console.log(response.data)
                // setUsers(response.data);
                var obj = [];
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].dyerID == localStorage.getItem("id") && response.data[i].currentStatus == "dyer") {
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
    const onChangecountNumber = (event) => {
        setcountNumber(event.target.value);
    };
    const onChangetwistNumber = (event) => {
        settwistNumber(event.target.value);
    };
    const onChangespinDate = (event) => {
        setspinDate(event.target.value);
    };
    const onChangecottonOrigin = (event) => {
        setcottonOrigin(event.target.value);
    };
    const onChangeyarnType = (event) => {
        setyarnType(event.target.value);
    };
    const onChangedyerID = (event) => {
        setdyerID(event.target.value);
    };
    const onChangedyeingDate = (event) => {
        setdyeingDate(event.target.value);
    };
    const onChangecolours = (event) => {
        setcolours(event.target.value);
    };
    const onChangespecialTreatment = (event) => {
        setspecialTreatment(event.target.value);
    };
    const onChangecurrentStatus = (event) => {
        setcurrentStatus(event.target.value);
    };
    const onChangeweaverID = (event) => {
        setweaverID(event.target.value);
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

    function shiftStock(YarnID, weaverID) {
        if (weaverID == "")
            alert("No weaver ID selected")
        else
        {
            axios
                .get("http://localhost:5000/yarnPackage/" + YarnID)
                .then((response) => {
                    let newYarn = response.data;
                    alert("Fetched the package dets. weaverID: "+newYarn.weaverID);
                    newYarn.currentStatus = "weaver";
                    axios.post("http://localhost:5000/yarnPackage/updatestock/" + YarnID, newYarn)
                        .then((response) => {
                            alert("Updated YarnPackage Successfully");
                            window.location.reload();

                            //create a fabric model

                            const newFabric = {
                                yarnPackageNumber: YarnID,
                                weaverID: weaverID,
                                completionDate: "",
                                length: "",
                                Colours: [],
                                Sold: 0
                            }

                            axios.post("http://localhost:5000/fabric/add", newFabric)
                                .then((res) => {
                                    alert('added Fabric successfully');
                                    window.location.reload();
                                }
                                )
                                .catch((err) => {
                                    console.log(err);
                                    alert('error :(');
                                }
                                )
                            window.location.reload();
                            setOpen2(false);
                        }
                        )
                        .catch((error) => {
                            alert("Yarn Update unsuccessful"+error);
                        }
                        );
                });
        }
    }

    function handleEditClose(x) {
        axios.get("http://localhost:5000/yarnPackage/" + x)
            .then((res) => {
                const newYarn = {
                    spinnerID: res.data.spinnerID,
                    countNumber: countNumber ? countNumber : res.data.countNumber,
                    twistNumber: twistNumber ? twistNumber : res.data.twistNumber,
                    spinDate: res.data.spinDate,
                    cottonOrigin: res.data.cottonOrigin,
                    yarnType: res.data.yarnType,
                    dyerID: res.data.dyerID,
                    dyeingDate: dyeingDate ? dyeingDate : res.data.dyeingDate,
                    colours: colours ? colours : res.data.colours,
                    specialTreatment: res.data.specialTreatment+" "+specialTreatment,
                    currentStatus: res.data.currentStatus,
                    weaverID: weaverID ? weaverID : res.data.weaverID
                };
                axios.post("http://localhost:5000/yarnPackage/updatestock/" + x, newYarn)
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

// No Add Stock for Dyer

/*
    function handleEditClose2() {
        const newYarn = {
            spinnerID: spinnerID,
            countNumber: countNumber,
            twistNumber: twistNumber,
            spinDate: spinDate,
            cottonOrigin: cottonOrigin,
            yarnType: yarnType,
            dyerID: dyerID,
            dyeingDate: dyeingDate,
            colours: colours,
            specialTreatment: specialTreatment,
            currentStatus: currentStatus,
        };
        // alert('here');
        axios.post("http://localhost:5000/yarnPackage/add/", newYarn)
            .then((res) => {
                alert('added successfully');
                window.location.reload();
            }
            )
            .catch((err) => {
                console.log(err);
                alert('error :(');
            }
            )
        window.location.reload();
        setOpen2(false);
    };
*/
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={9} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                {/* <Grid item xs={12} md={9} lg={12}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            // setVisible(true);
                                            // setFood(user.add_on);
                                            // setCost(user.price);
                                            // setItem(user);
                                            // UpdateVendorName();
                                            //console.log(user.add_on);
                                            // const [form] = Form.useForm();
                                            handleClickOpen2();
                                        }}
                                    >
                                        Add Stock
                                    </Button>
                                </Grid> */}
                                <TableRow>
                                    <TableCell>Yarn Package ID</TableCell>
                                    <TableCell>Spinner ID</TableCell>
                                    <TableCell>Count Number</TableCell>
                                    <TableCell>Twist Number</TableCell>
                                    <TableCell>Spin Date</TableCell>
                                    <TableCell>CottonOrigin</TableCell>
                                    <TableCell>YarnType</TableCell>
                                    {/* <TableCell>DyerID</TableCell> */}
                                    <TableCell>Dyeing Date</TableCell>
                                    {/* <TableCell>Colours</TableCell> */}
                                    <TableCell>Special Treatment</TableCell>
                                    <TableCell>Weaver ID</TableCell>
                                    {/* <TableCell>current Status</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        {/* <TableCell>{ind}</TableCell> */}
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.spinnerID}</TableCell>
                                        <TableCell>{user.countNumber}</TableCell>
                                        <TableCell>{user.twistNumber}</TableCell>
                                        <TableCell>{user.spinDate}</TableCell>
                                        <TableCell>{user.cottonOrigin}</TableCell>
                                        <TableCell>{user.yarnType}</TableCell>
                                        {/* <TableCell>{user.dyerID}</TableCell> */}
                                        <TableCell>{user.dyeingDate}</TableCell>
                                        {/* <TableCell>{user.colours}</TableCell> */}
                                        {/* <TableCell>{user.colours.map((hmm, ind) => (
                                            <div>{hmm.ColourID} {hmm.Quantity}</div>
                                        ))}</TableCell> */}
                                        <TableCell>{user.specialTreatment}</TableCell>
                                        <TableCell>{user.weaverID}</TableCell>
                                        {/* <TableCell>{user.currentStatus}</TableCell> */}
                                        <TableCell>
                                            <Button
                                                type="primary"
                                                onClick={() => {handleClickOpen(user._id)}}
                                            >
                                                Update Stock
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={() => {shiftStock(user._id, user.weaverID)}}
                                            >
                                                Shift Stock
                                            </Button>
                                            <Dialog open={open[user._id]} onClose={() => handleClose(user._id)}>
                                                <DialogTitle>Update Stock</DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Count Number"
                                                        type="text"
                                                        onChange={onChangecountNumber}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="twist Number"
                                                        type="text"
                                                        onChange={onChangetwistNumber}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="spin Date"
                                                        type="text"
                                                        onChange={onChangespinDate}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="cotton Origin"
                                                        type="text"
                                                        // value={el.Vendor_email}
                                                        onChange={onChangecottonOrigin}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="yarn Type"
                                                        type="text"
                                                        // value={el.Vendor_email}
                                                        onChange={onChangeyarnType}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="dyer ID"
                                                        type="text"
                                                        // value={el.Vendor_email}
                                                        onChange={onChangedyerID}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="dyeing Date"
                                                        type="text"
                                                        onChange={onChangedyeingDate}
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
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="special Treatment"
                                                        type="email"
                                                        onChange={onChangespecialTreatment}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                    {/* <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="current Status"
                                                        type="email"
                                                        // value={el.Vendor_email}
                                                        onChange={onChangecurrentStatus}
                                                        fullWidth
                                                        variant="standard"
                                                    /> */}
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Weaver ID"
                                                        type="email"
                                                        onChange={onChangeweaverID}
                                                        fullWidth
                                                        variant="standard"
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleClose(user._id)}>Cancel</Button>
                                                    <Button onClick={() => handleEditClose(user._id)}>OK</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <TableCell>
                                        <Dialog open={open2} onClose={handleClose2}>
                                            <DialogTitle>Add Stock</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="Count Number"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangecountNumber}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="twist Number"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangetwistNumber}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="spin Date"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangespinDate}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="cotton Origin"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangecottonOrigin}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="yarn Type"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangeyarnType}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="dyer ID"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangedyerID}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="dyeing Date"
                                                    type="text"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangedyeingDate}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="colours"
                                                    type="email"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangecolours}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="special Treatment"
                                                    type="email"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangespecialTreatment}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="current Status"
                                                    type="email"
                                                    // value={el.Vendor_email}
                                                    onChange={onChangecurrentStatus}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => handleClose2()}>Cancel</Button>
                                                <Button onClick={() => handleEditClose2()}>OK</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default UsersList;
