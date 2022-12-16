import React, {useEffect, useState} from "react"
import AuthServices      from "../../services/AuthServices"
import "./BruteForceTests.css"

const authServices = new AuthServices()

const BruteForceTests = () =>{
    const[bruteForceData, setBruteForceData] = useState([])
    useEffect(() =>{
        authServices.GetBruteForceResults()
            .then((data) =>{
                console.log("Returned: ", data.data.data)

                setBruteForceData(data.data.data);

            }).catch((error) =>{
                console.log("Error : ", error)
            })
    }, []);

    return(
        <>
            <div className = "bruteForceContainer">
                <h1>Brute Force Test Results</h1>
                <div className = "table">
                    <div className = "row">
                        <p>User Name</p>
                        <p>Password</p>
                        <p>Result</p>
                    </div>
                    {bruteForceData.map((data) =>{
                        console.log("Returned: ", data.userName)

                        return(
                            <div className = {`row ${data.isCorrect ? "rowAccessGranted" : ""}`}>
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