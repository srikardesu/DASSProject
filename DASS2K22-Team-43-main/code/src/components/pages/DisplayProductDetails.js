import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function DisplayProductDetails() {
    const [BarcodeID, setBarcodeID] = useState("");

    useEffect(() => {
    
    });

    const onChangeBarcodeID = (event) =>  {
        setBarcodeID(event.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('FabricID', BarcodeID);
        window.location.href = "/fabric_details";
    }

    return(
        <div>
        <form onSubmit={onSubmit}>
        <div className="form-group">
                <label>Enter the Bar code ID: </label>
                <input type="text"
                    required="true"
                    className="form-control"
                    value={BarcodeID}
                    onChange={onChangeBarcodeID}
                />
            </div>
            <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
                <div id="comments">
                </div>
            </form>

        </div>
    )
}

export default DisplayProductDetails;