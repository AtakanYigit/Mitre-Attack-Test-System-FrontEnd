import React from "react"
import "./HomePage.css"

const HomePage = () =>{

    return(
        <>
            <div className = "homeContainer">
                <h1>Welcome To Home Page</h1>
                <a href = "/BruteForceTests" className = "clickContainer">
                    <p >See Brute Force Tests</p>
                </a>
                <a href = "/SecondMitreAttackTests" className = "clickContainer">
                    <p>See {"{Second Mitre Attack}"} Tests</p>
                </a>
            </div>
        </>
    )
}

export default HomePage;