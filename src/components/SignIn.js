import React,{useState} from "react"
import {useNavigate}    from "react-router-dom";
import AuthServices     from "../services/AuthServices"
import TextField        from "@material-ui/core/TextField"
import Button           from "@material-ui/core/Button"
import Snackbar         from "@material-ui/core/Snackbar"
import IconButton       from "@material-ui/core/IconButton"
import CloseIcon        from "@material-ui/icons/Close"
import "./SignUp.css"

const authServices = new AuthServices()

const SignIn = (props) =>{
    const [userName, setUserName]         = useState("");
    const [userNameFlag, setUserNameFlag] = useState(false);
    const [password, setPassword]         = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [isOpen, setIsOpen]             = useState(false);
    const [message, setMessage]           = useState("");

    let navigate = useNavigate();

    const handleClose = (e, reason) =>{
        if(reason === "clickaway"){
            return
        }
        setIsOpen(false);
    }

    const handleChange = (e, setter) =>{
        const{value} = e.target
        setter(value);
        // console.log("Name : ", name, "Value : ", value);
    }

    const handleSignUp = () =>{
        navigate("/signUp");
    }

    const checkValidation = ()=>{
        console.log("CheckValidation Calling...")
        setUserNameFlag(false)
        setPasswordFlag(false)

        if(userName === ""){
            setUserNameFlag(true);
        }

        if(password === ""){
            setPasswordFlag(true);
        }
    }

    const handleSubmit = () =>{
        checkValidation()
        if(userName !== "" && password !== ""){
            console.log("Acceptable")
            let data ={
                userName: userName,
                password: password,
            }
            authServices.SignIn(data)
                .then((data) =>{
                    console.log("Posted: ", data)
                    if(data.data.isSuccess){
                        navigate("/HomePage");
                    } else{
                        console.log("Something Went Wrong")
                        setIsOpen(true)
                        setMessage("Login Unsuccessfully")
                    }
                })
                .catch((error) =>{
                    console.log("Error : ", error)
                    setIsOpen(true)
                    setMessage("Something Went Wrong")
                })
        }else{
            console.log("Not Acceptable")
            setIsOpen(true)
            setMessage("Please Field Mandetory Field")
        }
    }

    return (
        <>
            <div className = "signContainer">
                <h1>Sign In</h1>
                <form className = "form">
                    <TextField className = "textField"
                                name      = "UserName"
                                label     = "UserName"
                                variant   = "outlined"
                                size      = "small"
                                error     ={userNameFlag}
                                value     ={userName}
                                onChange  ={(e) => handleChange(e, setUserName)}/>

                    <TextField className = "textField"
                                type      = "password"
                                name      = "Password"
                                label     = "Password"
                                variant   = "outlined"
                                size      = "small"
                                error     ={passwordFlag}
                                value     ={password}
                                onChange  ={(e) => handleChange(e, setPassword)}/>
                </form>
                <div className="buttons" style={{alignItems: "flex-start"}}>
                    <Button className = "button" onClick ={handleSignUp} color = "primary">
                        Sign Up
                    </Button>
                    <Button className = "button" onClick ={handleSubmit} color = "primary" variant = "contained">
                        Sign In
                    </Button>
                </div>
            </div>
            <Snackbar anchorOrigin     ={{
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
                        </>
                      }/>
        </>
    )
}

export default SignIn;

// export default class SignIn extends Component{
//     constructor(){
//         super()
//         this.state ={
//             UserName: "",
//             UserNameFlag: false,
//             Password: "",
//             PasswordFlag: false,
//             open: false,
//             Message: "",
//         }
//     }

//     handleClose = (e, reason) =>{
//         if(reason === "clickaway"){
//             return
//         }
//         this.setState({ open: false })
//     }


//     handleChange = (e) =>{
//         const{ name, value } = e.target
//         this.setState(
//        { [name]: value },
//         console.log("Name : ", name, "Value : ", value),
//         )
//     }

//     handleSignUp = (e) =>{
//         this.props.history.push("/")
//     }

//     CheckValidation(){
//         console.log("CheckValidation Calling...")

//         this.setState({ UserNameFlag: false, PasswordFlag: false })

//         if(this.state.UserName === ""){
//             this.setState({ UserNameFlag: true })
//         }
//         if(this.state.Password === ""){
//             this.setState({ PasswordFlag: true })
//         }
//     }

//     handleSubmit = (e) =>{
//         this.CheckValidation()
//         if(this.state.UserName !== "" && this.state.Password !== ""){
//             console.log("Acceptable")
//             let data ={
//                 userName: this.state.UserName,
//                 password: this.state.Password,
//             }
//             authServices
//                 .SignIn(data).then((data) =>{
//                     console.log("Data : ", data)
//                     if(data.data.isSuccess){
//                         this.props.history.push("/HomePage")
//                     } else{
//                         console.log("Something Went Wrong")
//                         this.setState({ open: true, Message: "LogIn UnSuccessfully" })
//                     }
//                 })
//                 .catch((error) =>{
//                 console.log("Error : ", error)
//                 this.setState({ open: true, Message: "Something Went Wrong" })
//                 })
//         }else{
//             console.log("Not Acceptable")
//             this.setState({ open: true, Message: "Please Field Mandetory Field" })
//         }
//     }

//     render(){
//         console.log("State : ", this.state)
//         return (
//             <div className="SignUp-Container">
//                 <div className="SignUp-SubContainer">
//                     <div className="Header">Sign In</div>
//                     <div className="Body">
//                         <form className="form">
//                         <TextField
//                             className="TextField"
//                             name="UserName"
//                             label="UserName"
//                             variant="outlined"
//                             size="small"
//                             error={this.state.UserNameFlag}
//                             value={this.state.UserName}
//                             onChange={this.handleChange}/>
//                         <TextField
//                             className="TextField"
//                             type="password"
//                             name="Password"
//                             label="Password"
//                             variant="outlined"
//                             size="small"
//                             error={this.state.PasswordFlag}
//                             value={this.state.Password}
//                             onChange={this.handleChange}/>
//                         </form>
//                     </div>
//                     <div className="Buttons" style={{ alignItems: "flex-start" }}>
//                         <Button className="Btn" color="primary" onClick={this.handleSignUp}>
//                             Sign Up
//                         </Button>
//                         <Button
//                             className="Btn"
//                             variant="contained"
//                             color="primary"
//                             onClick={this.handleSubmit}>
//                             Sign In
//                         </Button>
//                     </div>
//                 </div>
//                 <Snackbar   anchorOrigin={{
//                                 vertical: "bottom",
//                                 horizontal: "left"}}
//                             open={this.state.open}
//                             autoHideDuration={6000}
//                             onClose={this.handleClose}
//                             message={this.state.Message}
//                             action={
//                                 <React.Fragment>
//                                     <Button color="secondary" size="small" onClick={this.handleClose}>
//                                         UNDO
//                                     </Button>
//                                     <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
//                                         <CloseIcon fontSize="small"/>
//                                     </IconButton>
//                                 </React.Fragment>
//                             }/>
//             </div>
//         )
//     }
// }