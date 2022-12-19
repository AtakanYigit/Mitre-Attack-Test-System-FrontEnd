import {useEffect}   from "react";
import {useNavigate} from "react-router-dom";
import "./HomePage.css"

const HomePage = () =>{
    let   navigate = useNavigate();

    const handleLogOut = () =>{
        document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/SignIn");
    }

    useEffect(() => {
        const cookie   = document.cookie;
        if(cookie.indexOf("userCookie") === -1){
            navigate("/SignIn");
        }
    }, []);

    return(
        <>
            <div className = "homeContainer">
                <h1>Dashboard</h1>
                <a href = "/BruteForceTests" className = "clickContainer">
                    <p >See Brute Force Tests</p>
                </a>
                <a href = "/ScanTests" className = "clickContainer">
                    <p>See Scan Tests</p>
                </a>
                <a href = "/EditProfile" className = "clickContainer">
                    <p>Edit Profile</p>
                </a>
                <a onClick={handleLogOut} href = "/SignIn" className = "clickContainer">
                    <p>Log Out</p>
                </a>
            </div>
        </>
    )
}

export default HomePage;