import {useState, useEffect} from "react"
import {useNavigate}         from "react-router-dom";
import AuthServices          from "../../services/AuthServices"
import TextField             from "@material-ui/core/TextField"
import Button                from "@material-ui/core/Button"
import Snackbar              from "@material-ui/core/Snackbar"
import IconButton            from "@material-ui/core/IconButton"
import CloseIcon             from "@material-ui/icons/Close"
import "./EditProfile.css"

const authServices = new AuthServices()

const EditProfile = () =>{
    const [userName,     setUserName]     = useState("");
    const [userNameFlag, setUserNameFlag] = useState(false);
    const [password,     setPassword]     = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [isOpen,       setIsOpen]       = useState(false);
    const [message,      setMessage]      = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const cookie   = document.cookie;
        if(cookie.indexOf("userCookie") === -1){
            navigate("/SignIn");
        }
    }, []);

    const handleClose = (e, reason) =>{
        if(reason === "clickaway"){return}
        setIsOpen(false);
    }

    const handleChange = (e, setter) =>{
        const{value} = e.target
        setter(value);
    }

    const handlePropertyChange = (property) =>{
        if(property === "Name"){            //Check If Name Field Is Empty
            setUserNameFlag(false)
            if(userName === ""){
                setUserNameFlag(true);
            }
        }else if(property === "Password"){  //Check If Password Field Is Empty
            setPasswordFlag(false)
            if(userName === ""){
                setPasswordFlag(true);
            }
        }

        if(property === "Name"){                                //Update Name
            if(userName !== ""){
                let cookie   = document.cookie;
                cookie = cookie.slice(cookie.indexOf("userCookie")).slice(11).split("+");

                let data = {
                    NewName:  userName,
                    Name:     cookie[0],
                    PassWord: cookie[1]
                }

                authServices.UpdateName(data)
                    .then((data) =>{
                        console.log("Posted: ", data)
                        if(data.data.isSuccess){
                            document.cookie = `userCookie=${userName}+${cookie[1]}`;
                            navigate("/HomePage");
                        }else{
                            setIsOpen(true)
                            setMessage(data.data.message)
                        }
                    }).catch((error) =>{
                        console.log("Error : ", error)
                        setIsOpen(true)
                        setMessage("Something Went Wrong")
                    })
            }else{
                setIsOpen(true)
                setMessage("Please Fill Mandatory Field")
            }

        }else if(property === "Password"){                      //Update Password
            if(userName !== ""){
                let cookie   = document.cookie;
                cookie = cookie.slice(cookie.indexOf("userCookie")).slice(11).split("+");

                let data = {
                    NewPassWord: password,
                    Name:        cookie[0],
                    PassWord:    cookie[1]
                }
                console.log(data);

                authServices.UpdatePassword(data)
                    .then((data) =>{
                        console.log("Posted: ", data)
                        if(data.data.isSuccess){
                            document.cookie = `userCookie=${cookie[0]}+${password}`;
                            console.log(document.cookie);
                            navigate("/HomePage");
                        }else{
                            setIsOpen(true)
                            setMessage(data.data.message)
                        }
                    }).catch((error) =>{
                        console.log("Error : ", error)
                        setIsOpen(true)
                        setMessage("Something Went Wrong")
                    })
            }else{
                setIsOpen(true)
                setMessage("Please Fill Mandatory Field")
            }
        }
    }

    return(
        <>
            <div className = "editProfileContainer">
                <h1>Edit Profile</h1>
                <form className = "form">
                    <TextField className = "textField"
                               name      = "UserName"
                               label     = "UserName"
                               variant   = "outlined"
                               size      = "small"
                               error     = {userNameFlag}
                               value     = {userName}
                               onChange  = {(e) => handleChange(e, setUserName)}/>

                    <Button className = "button" onClick ={()=> handlePropertyChange("Name")} color = "primary" variant = "contained">Change Name</Button>
                </form>
                <form className = "form">
                    <TextField className = "textField"
                               type      = "password"
                               name      = "Password"
                               label     = "Password"
                               variant   = "outlined"
                               size      = "small"
                               error     = {passwordFlag}
                               value     = {password}
                               onChange  = {(e) => handleChange(e, setPassword)}/>
                    <Button className = "button" onClick ={()=> handlePropertyChange("Password")} color = "primary" variant = "contained">Change Password</Button>
                </form>
            </div>
            <Snackbar   anchorOrigin     ={{
                            vertical:   "bottom",
                            horizontal: "left"
                        }}
                        open             ={isOpen}
                        autoHideDuration ={6000}
                        onClose          ={handleClose}
                        message          ={message}
                        action           ={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </>}/>
        </>
    )
}

export default EditProfile;