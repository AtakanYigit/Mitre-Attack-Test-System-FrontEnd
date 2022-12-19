import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp                                   from "./components/SignInSignUpPages/SignUp"
import SignIn                                   from "./components/SignInSignUpPages/SignIn"
import HomePage                                 from "./components/HomePage/HomePage"
import EditProfile                              from "./components/EditProfilePage/EditProfile"
import BruteForceTests                          from "./components/BruteForceTests/BruteForceTests"
import ScanTest                                 from "./components/ScanTest/ScanTest"
import "./App.css"
import "./Reset.css";

const App = () =>{
    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path = "/"                element = {<SignUp/>         }/>
                    <Route exact path = "/SignUp"          element = {<SignUp/>         }/>
                    <Route exact path = "/SignIn"          element = {<SignIn/>         }/>
                    <Route exact path = "/HomePage"        element = {<HomePage/>       }/>
                    <Route exact path = "/EditProfile"     element = {<EditProfile/>    }/>
                    <Route exact path = "/BruteForceTests" element = {<BruteForceTests/>}/>
                    <Route exact path = "/ScanTests"       element = {<ScanTest/>       }/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;