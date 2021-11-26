import React from 'react'
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


function MyCart() {
    const dispatch = useDispatch();
    const items = useSelector(state=>state.items);
    console.log(items);
    const [checked, setChecked] = React.useState(false);
    const [open, setOpenChecked] = React.useState(false);
    const handlePlaceChange = () => {
        setChecked(true);
    };
    const handleContinueChange = () => {
        setOpenChecked(true);
    };
    const content = (
        <Box sx={{ width: '100%', height: '100%'}}>
          <p className="second-section-heading">Customer Details</p>
          <div style={{width: '70%'}}>
            <div style={{display: 'flex',margin: '20px'}}>
                <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" sx={{marginRight: '10px'}} />
                <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
            </div>
            <div style={{display: 'flex',margin: '20px'}}>
                <TextField fullWidth id="outlined-basic" label="Pincode" variant="outlined" sx={{marginRight: '10px'}}/>
                <TextField fullWidth id="outlined-basic" label="Locality" variant="outlined" />
            </div>
            <div style={{margin: '20px'}}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Address"
                    multiline
                    rows={4}
                />
            </div>
            <div style={{display: 'flex',margin: '20px'}}>
                <TextField fullWidth id="outlined-basic" label="City/Town" variant="outlined" sx={{marginRight: '10px'}}/>
                <TextField fullWidth id="outlined-basic" label="Landmark" variant="outlined" />
            </div>
            <div style={{margin: '20px'}}>
                <FormLabel >Type</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="home" control={<Radio />} label="Home" sx={{marginRight: '14%' }} />
                    <FormControlLabel value="work" control={<Radio />} label="Work" sx={{marginRight: '14%' }}/>
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </div>
          </div>
          <div className="place-order">
                    <Button checked={checked} onClick={handleContinueChange} variant="contained" sx={{width: '20%',}}>Continue</Button>
        </div>
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
