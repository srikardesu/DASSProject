import React, { useState, useEffect, Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';

function FabricDetails() {
    const [FabricID, setFabricID] = useState("");
    const [yarnPackageNumber, setYarnPackageNumber] = useState("");
    const [SpinnerID, setSpinnerID] = useState("");
    const [WeaverID, setWeaverID] = useState("");
    const [DyerID, setDyerID] = useState("");
    const [DyerName, setDyerName] = useState("");
    const [WeaverName, setWeaverName] = useState("");
    const [SpinnerName, setSpinnerName] = useState("");

    useEffect(() => {
        console.log(localStorage.getItem("FabricID"));
        setFabricID(localStorage.getItem("FabricID"));

        axios
            .get('http://localhost:5000/fabric/' + FabricID)
            .then(function (response) {       //response comes as an array of json
                // checking if the entry is there
                console.log('fabric data')
                console.log(response.data[0])

                setYarnPackageNumber(response.data[0].yarnPackageNumber)

                axios
                    .get('http://localhost:5000/yarnPackage/' + yarnPackageNumber)
                    .then(function (response) {       //response comes as an array of json
                        // checking if the entry is there
                        console.log('yarnPackage data')
                        console.log(response.data[0])

                        setSpinnerID(response.data[0].spinnerID)
                        setWeaverID(response.data[0].weaverID)
                        setDyerID(response.data[0].dyerID)

                        axios
                            .get('http://localhost:5000/spinner/' + SpinnerID)
                            .then(function (response) {       //response comes as an array of json
                                // checking if the entry is there
                                console.log('spinner data')
                                console.log(response.data[0])
                                setSpinnerName(response.data[0].name)

                            })
                            .catch(function (err) {
                                console.log("Oh No! Error :(");
                                console.log(err);
                            })

                        axios
                            .get('http://localhost:5000/dyer/' + DyerID)
                            .then(function (response) {       //response comes as an array of json
                                // checking if the entry is there
                                console.log('dyer data')
                                console.log(response.data[0])
                                setDyerName(response.data[0].name)

                            })
                            .catch(function (err) {
                                console.log("Oh No! Error :(");
                                console.log(err);
                            })

                        axios
                            .get('http://localhost:5000/weaver/' + WeaverID)
                            .then(function (response) {       //response comes as an array of json
                                // checking if the entry is there
                                console.log('weaver data')
                                console.log(response.data[0])
                                setWeaverName(response.data[0].name)

                            })
                            .catch(function (err) {
                                console.log("Oh No! Error :(");
                                console.log(err);
                            })


                    })
                    .catch(function (err) {
                        console.log("Oh No! Error :(");
                        console.log(err);
                    })
            })
            .catch(function (err) {
                console.log("Oh No! Error :(");
                console.log(err);
            })
    });
    return (
        <div>
            <h1>Fabric Details</h1>
            <table className="table table-responsive-lg table-hover">
                <tbody>
                    <tr>
                        <th> Spinner Name: </th>
                        <td>{SpinnerName}</td>
                    </tr>
                    <tr>
                        <th> Dyer Name: </th>
                        <td>{DyerName}</td>
                    </tr>
                    <tr>
                        <th> Weaver Name: </th>
                        <td>{WeaverName}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FabricDetails;