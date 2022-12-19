import React, {useEffect, useState} from "react"
import AuthServices      from "../../services/AuthServices";
import {useNavigate} from "react-router-dom";
import "./BruteForceTests.css"

const authServices = new AuthServices()

const BruteForceTests = () =>{
    const[bruteForceData, setBruteForceData] = useState([])
    let   navigate                           = useNavigate();

    useEffect(() =>{
        const cookie   = document.cookie;
        if(cookie.indexOf("userCookie") === -1){
            navigate("/SignIn");
        }

        authServices.GetBruteForceResults()
            .then((data) =>{
                setBruteForceData(data.data.data);
            }).catch((error) =>{
                console.log("Error : ", error)
            })
    }, []);

    return(
        <>
            <div className = "bruteForceContainer">
                <h1 style={{marginTop:"64px"}}>Brute Force Test Results</h1>
                <div className = "table">
                    <div className = "row">
                        <p>User Name</p>
                        <p>Password</p>
                        <p>Result</p>
                    </div>
                    {bruteForceData.map((data, i) =>{
                        return(
                            <div key = {i} className = {`row ${data.isCorrect ? "rowAccessGranted" : ""}`}>
                                <p>{data.userName}</p>
                                <p>{data.passWord}</p>
                                <p>{data.isCorrect}</p>
                            </div>
                        )
                    })
                }</div>
            </div>
        </>
    )
}

export default BruteForceTests;