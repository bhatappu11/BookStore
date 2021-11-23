import AxiosService from "./AxiosService";
const axiosService = new AxiosService();

let baseurl = 'https://new-bookstore-backend.herokuapp.com/bookstore_user'

class UserService {
    SignUp(url,data){
        return axiosService.postMethod(`${baseurl}${url}`,data);
    }
    SignIn(url,data){
        return axiosService.postMethod(`${baseurl}${url}`,data);
    }
}

export default UserService