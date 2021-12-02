import React ,{useState}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getCartItems} from '../../store/actions/cartActions'
import './MyCart.scss'
import bookimage from '../../assets/Image 12@2x.png'
import { Avatar, Button } from '@mui/material'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm, Controller } from "react-hook-form";
import Fade from '@mui/material/Fade';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';
import bookgif from '../../assets/loader.gif'


const userService = new UserService();


function MyCart() {
    const navigate = useNavigate();
    const { handleSubmit,control } = useForm();
    const dispatch = useDispatch();
    const items = useSelector(state=>state.items);
    console.log(items);
    const [checked, setChecked] = React.useState(false);
    const [open, setOpenChecked] = React.useState(false);
    const [disabled,setDisabled] = useState(false);
    const [buttonOpen, setButtonOpen] = React.useState(false);
    const [continueOpen, setContinueOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const handlePlaceChange = () => {
        setButtonOpen((prev)=>!prev);
        setChecked(true);
    };
    const handleCheckout = () => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        let myOrder = [];
        items.items.map((ele)=>{
            let data = {
                "product_id": ele.product_id._id,
                "product_name": ele.product_id.bookName,
                "product_quantity": ele.quantityToBuy,
                "product_price": ele.product_id.price
            }
            myOrder.push(data);
            handleRemove(ele);
        })
        let datas = {
            "orders": myOrder
        }
        userService.addOrder('/add/order',datas,config)
        .then((res)=>{
            console.log("order placed");
            navigate("/order");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const onSubmit = data => {
        console.log(data);
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        let details = {
            "addressType": data.type,
            "fullAddress": data.address,
            "city": data.city,
            "state": data.state
        }  
        userService.customerDetails('/edit_user',details,config)
        .then((res)=>{
            console.log("customer details added");
            setContinueOpen((prev)=>!prev);
            console.log(data);
            setDisabled(!disabled);
            setOpenChecked(true);
            getCart();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const content = (
        <Box sx={{ width: '100%', height: '100%'}}>
          <p className="second-section-heading">Customer Details</p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="customer-form">
            <div className="text-fields" style={{display: 'flex',margin: '20px'}}>
            <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField disabled={disabled} fullWidth id="outlined-basic" label="Name" variant="outlined" sx={{marginRight: '10px'}}
                value={value}
                onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '} />
                )}
                  rules={{ required: 'name required' }}
            />
            <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField disabled={disabled} fullWidth id="outlined-basic" label="Phone Number" variant="outlined" 
                value={value}
                onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '} />
                )}
                  rules={{ required: 'Phone number required' }}/>
            </div>
            <div className="text-fields" style={{display: 'flex',margin: '20px'}}>
            <Controller
                    name="pincode"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField disabled={disabled} fullWidth id="outlined-basic" label="Pincode" variant="outlined" sx={{marginRight: '10px'}}
                value={value}
                onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '} />
                )}
                  rules={{ required: 'Pincode required' }}/>
                <Controller
                    name="locality"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField disabled={disabled} fullWidth id="outlined-basic" label="Locality" variant="outlined" 
                    value={value}
                onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '} />
                )}
                  rules={{ required: 'locality required' }}/>
            </div>
            <div style={{margin: '20px'}}>
                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                disabled={disabled}
                    fullWidth
                    id="outlined-multiline-static"
                    label="Address"
                    multiline
                    rows={4}
                    value={value}
                onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '} 
                />
                )}
                  rules={{ required: 'Address required' }}/>
            </div>
            <div className="text-fields" style={{display: 'flex',margin: '20px'}}>
                <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField disabled={disabled} fullWidth id="outlined-basic" label="City/Town" variant="outlined" sx={{marginRight: '10px'}}
                value={value}
                onChange={onChange} 
                    error={!!error}
                    helperText={error ? error.message : ' '} />
                )}
                  rules={{ required: 'city required' }}/>
                <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField disabled={disabled} fullWidth id="outlined-basic" label="State" variant="outlined" value={value}
                    onChange={onChange} 
                    error={!!error}
                    helperText={error ? error.message : ' '} />
                    )}
                  rules={{ required: 'state required' }}/>
            </div>
            <div style={{margin: '20px'}}>
                <FormLabel >Type</FormLabel>
                <Controller
                    name="type"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={value} onChange={onChange} 
                error={!!error}
                helperText={error ? error.message : ' '}>
                    <FormControlLabel disabled={disabled} value="Home" control={<Radio />} label="Home" sx={{marginRight: '14%' }} select/>
                    <FormControlLabel disabled={disabled} value="Office" control={<Radio />} label="Work" sx={{marginRight: '14%' }}/>
                    <FormControlLabel disabled={disabled} value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                )}
                rules={{ required: true }}/>
            </div>
          </div>
          <div className="place-order">
          <Fade in={!continueOpen}><Button type="submit" checked={checked}variant="contained" sx={{width: '20%'}}>Continue</Button></Fade>
        </div>
        </form>
        </Box>
    );
    const summary = (
        <Box sx={{ width: '100%', height: '100%'}}>
          <p className="third-section-heading">Order Summary</p>
          <div className="first-section-books">
                        { items.items.length !== 0 ? items.items.map((books)=>(
                            <div>
                                <div style={{display: 'flex'}}>
                                    <img className="bookimage" src={bookimage} />
                                    <div className="book-description">
                                        <p className="book-title">{books.product_id.bookName}</p>
                                        <p className="book-author">{books.product_id.author}</p>
                                        <p className="book-price">Rs. {books.product_id.price*books.quantityToBuy}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <h5>Cart is empty</h5>}   
                    </div>
                    <div className="place-order">
                    <Button checked={checked} onClick={handleCheckout} variant="contained" sx={{width: '20%',}}>Checkout</Button>
                    </div>
        </Box>
    );
    const handleIncrement = (book) => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        let data = {
            "quantityToBuy": book.quantityToBuy + 1
        }  
        userService.quantityIncrement(`/cart_item_quantity/${book._id}`,data,config)
        .then((res)=>{
            console.log("Quantity of book increased");
            getCart();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const handleDecrement = (book) => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        let data = {
            "quantityToBuy": book.quantityToBuy - 1
        }  
        userService.quantityDecrement(`/cart_item_quantity/${book._id}`,data,config)
        .then((res)=>{
            console.log("Quantity of book decreased");
            getCart();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const handleRemove = (book) => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        userService.removeCartItem(`/remove_cart_item/${book._id}`,config)
        .then((res)=>{
            console.log("Book removed from cart");
            getCart();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    async function getCart()  {
        dispatch(getCartItems('cart'));
        setTimeout(()=>{
            setLoading(false)},2000
        );
     }

    
    React.useEffect(()=>{
        setLoading(true);
        getCart();
    },[])
    return (
        <div>
            {loading && <div className="preloaders"><img src={bookgif}/></div> }
            <div>
            <div className="cart-container">
                <div className="first-section">
                    <div className="first-section-heading">
                        <p>My cart ({items.items.length})</p>
                    </div>
                    <div className="first-section-books">
                        { items.items.map((books)=>(
                            <div>
                                <div style={{display: 'flex'}}>
                                    <img className="bookimage" src={bookimage} />
                                    <div className="book-description">
                                        <p className="book-title">{books.product_id.bookName}</p>
                                        <p className="book-author">{books.product_id.author}</p>
                                        <p className="book-price">Rs. {books.product_id.price*books.quantityToBuy}</p>
                                        <div className="counter" style={{display: 'flex'}}>
                                            <button disabled={books.quantityToBuy == 1 ? true : false} onClick={()=>handleDecrement(books)} className="cart-buttons">-</button>
                                            <Avatar sx={{width: 50,height: 30,color: "black",borderRadius: '3px',fontSize: "15px",background: "#FAFAFA 0% 0% no-repeat padding-box",border: "1px solid #DBDBDB",marginTop: '8px'}}
                                            variant="square">{books.quantityToBuy}</Avatar>
                                            <button onClick={()=>handleIncrement(books)} className="cart-buttons">+</button>
                                            <Button onClick={()=>handleRemove(books)} sx={{color: 'black',textTransform: 'none'}}>Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }   
                    </div>
                    <div className="place-order">
                    <Fade in={!buttonOpen}><Button checked={checked}  disabled={items.items.length == 0 ? true : false}  onClick={handlePlaceChange} variant="contained" sx={{width: '20%'}}>Place order</Button></Fade>
                    </div>
                </div>
                <div className="second-section">
                    <div>
                        <Collapse in={checked} collapsedSize={50}>
                            {content}
                        </Collapse>
                    </div>
                </div>
                <div className="third-section">
                    <div>
                        <Collapse in={open} collapsedSize={50}>
                            {summary}
                        </Collapse>
                    </div>
                </div>
           </div>
           </div>
        </div>
    )
}

export default MyCart
