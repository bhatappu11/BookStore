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


function MyCart() {
    const { handleSubmit,control } = useForm();
    const dispatch = useDispatch();
    const items = useSelector(state=>state.items);
    console.log(items);
    const [checked, setChecked] = React.useState(false);
    const [open, setOpenChecked] = React.useState(false);
    const [disabled,setDisabled] = useState(false);
    const handlePlaceChange = () => {
        setChecked(true);
    };
    const onSubmit = data => {
        console.log(data);
        setDisabled(!disabled);
        setOpenChecked(true);
    }
    const content = (
        <Box sx={{ width: '100%', height: '100%'}}>
          <p className="second-section-heading">Customer Details</p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{width: '70%'}}>
            <div style={{display: 'flex',margin: '20px'}}>
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
            <div style={{display: 'flex',margin: '20px'}}>
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
            <div style={{display: 'flex',margin: '20px'}}>
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
                    name="landmark"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField disabled={disabled} fullWidth id="outlined-basic" label="Landmark" variant="outlined" value={value}
                    onChange={onChange} 
                    error={!!error}
                    helperText={error ? error.message : ' '} />
                    )}
                  rules={{ required: 'landmark required' }}/>
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
                    <FormControlLabel disabled={disabled} value="home" control={<Radio />} label="Home" sx={{marginRight: '14%' }} select/>
                    <FormControlLabel disabled={disabled} value="work" control={<Radio />} label="Work" sx={{marginRight: '14%' }}/>
                    <FormControlLabel disabled={disabled} value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                )}
                rules={{ required: true }}/>
            </div>
          </div>
          <div className="place-order">
                    <Button type="submit" checked={checked}variant="contained" sx={{width: '20%'}}>Continue</Button>
        </div>
        </form>
        </Box>
    );
    const summary = (
        <Box sx={{ width: '100%', height: '100%'}}>
          <p className="third-section-heading">Order Summary</p>
          <div className="first-section-books">
                        { items.items.map((books)=>(
                            <div>
                                <div style={{display: 'flex'}}>
                                    <img className="bookimage" src={bookimage} />
                                    <div className="book-description">
                                        <p className="book-title">{books.product_id.bookName}</p>
                                        <p className="book-author">{books.product_id.author}</p>
                                        <p className="book-price">Rs. {books.product_id.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }   
                    </div>
                    <div className="place-order">
                    <Button checked={checked} onClick={handlePlaceChange} variant="contained" sx={{width: '20%',}}>Checkout</Button>
                    </div>
        </Box>
    );


    async function getCart()  {
        dispatch(getCartItems('cart'));
     }

    
    React.useEffect(()=>{
        getCart();
    },[])
    return (
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
                                        <p className="book-price">Rs. {books.product_id.price}</p>
                                        <div className="counter" style={{display: 'flex'}}>
                                            <button className="cart-buttons">-</button>
                                            <Avatar sx={{width: 50,height: 30,color: "black",borderRadius: '3px',fontSize: "15px",background: "#FAFAFA 0% 0% no-repeat padding-box",border: "1px solid #DBDBDB",marginTop: '8px'}}
                                            variant="square">{books.quantityToBuy}</Avatar>
                                            <button className="cart-buttons">+</button>
                                            <Button sx={{color: 'black',textTransform: 'none'}}>Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }   
                    </div>
                    <div className="place-order">
                    <Button checked={checked} onClick={handlePlaceChange} variant="contained" sx={{width: '20%',}}>Place order</Button>
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
    )
}

export default MyCart
