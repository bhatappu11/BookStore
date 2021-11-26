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
    displayBooks(url,config){
        return axiosService.getMethod(`${baseurl}${url}`,config);    
    }
    addToCart(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);    
    }
    getCart(url,config){
        return axiosService.getMethod(`${baseurl}${url}`,config); 
    }
    addToWishlist(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);    
    }
}

export default UserService