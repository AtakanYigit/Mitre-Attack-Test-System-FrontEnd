import AxiosServices from "./AxiosServices"
import Configurations from "../configurations/Configurations"

const axiosServices = new AxiosServices()

export default class AuthServices {
    SignUp(data){
        return axiosServices.post(Configurations.SignUp, data, false)
    }

    SignIn(data){
        console.log("API end point: ", Configurations.SignIn);
        return axiosServices.post(Configurations.SignIn, data, false)
    }

    
    GetBruteForceResults(data){
        console.log("API end point: ", Configurations.BruteForce);
        return axiosServices.post(Configurations.BruteForce, data, false)
    }
}
