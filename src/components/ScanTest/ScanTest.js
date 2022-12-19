import React, {useEffect, useState} from "react"
import AuthServices      from "../../services/AuthServices";
import {useNavigate} from "react-router-dom";
import "./ScanTest.css"

const authServices = new AuthServices()

const ScanTest = () =>{
    const[scanTestData, setScanTestData] = useState([])
    let   navigate                       = useNavigate();

    useEffect(() =>{
        const cookie   = document.cookie;
        if(cookie.indexOf("userCookie") === -1){
            navigate("/SignIn");
        }
    
        authServices.DoScanTest()
            .then((data) =>{
                setScanTestData(data.data.data);
            }).catch((error) =>{
                console.log("Error : ", error)
            })
    }, []);

    return(
        <div className = "bruteForceContainer">
            <h1 style={{marginTop:"64px"}}>Scan Test Results</h1>
            <div className = "table">
                <div className = "row">
                    <p>Result</p>
                    <p>Date</p>
                </div>
                    {scanTestData.map((data, i) =>{
                        return(
                            <div key = {i} className = {`row ${data.isCorrect ? "rowAccessGranted" : ""}`}>
                                <p>
                                    {data.result.split(/\s+/).map((element, j)=>{
                                        return(<span key = {j}><br/>{element}</span>)
                                    })}
                                </p>
                                <p>{data.date}</p>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ScanTest;