import React,{useState} from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import './Dashboard.scss'
import UserService from '../../services/UserService';
import Grid from '@mui/material/Grid';
import bookimage from '../../assets/Image 12@2x.png'
import { Button, createTheme, IconButton, PaginationItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch ,useSelector} from 'react-redux'
import { getWishlistItems, getCartItems } from '../../store/actions/cartActions';
import CircularProgress from '@mui/material/CircularProgress';
import bookgif from '../../assets/1481.gif'


const userService = new UserService();
  const theme = createTheme({
      palette: {
          myColor:{
              main: "#A03037",
              contrastText: 'white'
          }
      }
  });
  const a = () =>{
      return (
        <IconButton sx={{border: '1px solid #e2e2e2',borderRadius: '50%'}}><ChevronLeftIcon /></IconButton>
      )
  }
  const b = () => {
      return (
    <IconButton sx={{border: '1px solid #e2e2e2',borderRadius: '50%'}}><ChevronRightIcon /></IconButton>
      )
  }

function Dashboard() {
    const [sort, setSortValue] = React.useState('');
    const [books, setBooks] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const items = useSelector(state=>state.items);
    const wishlist = useSelector(state=>state.wishlist);
    const [searchWord,setSearchWord] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    
    async function getCart()  {
        dispatch(getCartItems('dashboard'));
     }
     async function getWishlist()  {
        dispatch(getWishlistItems());
     }
    const [page, setPage] = React.useState(1);
    const [booksPerPage, setBooksPerPage] = useState(8);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const indexOfLastBook = page * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const display = (currentBooks) => {
        return (
            <Box>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 6, md: 8 }}>
                    {
                    currentBooks.map((book)=>(
                        <Grid item xs={6} sm={3} md={2} >
                            <div className="all-books">
                            <Box  sx={{display:'flex', flexDirection:'column',backgroundColor: '#F5F5F5',minHeight: '320px'}}>                        
                                <div className="alchemist">
                                    <img src={bookimage} />
                                </div>  
                                <div className="book-details">
                                    <div className="book-title">{book.bookName}</div>
                                    <div className="book-author">by {book.author}</div>
                                    <div className="book-price">Rs {book.price}</div>                                
                                <div>
                                    {dynamicButton(book)}
                                </div>
                                </div>
                            </Box>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                </Box>
        )
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };    
     const dynamicButton = (book) => {  
        let bookIds = [];
        items.items.map(ele => {
            bookIds.push(ele.product_id._id)
        })  
        let wishlistBookIds = [];
            wishlist.wishlist.map(book => {
            wishlistBookIds.push(book.product_id._id)
        })      
        if (bookIds.includes(book._id)) {
          return (   
              <div>           
            <Button fullWidth variant="contained" sx={{marginTop: '12px'}}> ADDED TO BAG </Button>
            </div>
          )
        }
        else if(wishlistBookIds.includes(book._id)){
            return (
                <div>
                <Button fullWidth style={{marginTop: '12px',border: '1px solid',backgroundColor: '#ffffff',color: '#000000',cursor: 'pointer'}}>ADDED TO WISHLIST</Button>
                </div>
            )
        }
        else {
          return (
            <div className="add-buttons">
                <Button fullWidth onClick={()=>handleAddToBag(book)} style={{border: '1px solid',backgroundColor: '#A03037',color: '#f1f1f1',cursor: 'pointer',marginRight: '10px'}}>ADD TO BAG</Button>
                <Button fullWidth onClick={()=>handleAddToWishlist(book)} style={{border: '1px solid',backgroundColor: '#ffffff',color: '#000000',cursor: 'pointer'}}>WISHLIST</Button>
            </div>)
        }
    
      }
      const handleAddToWishlist = (book) => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        userService.addToWishlist(`/add_wish_list/${book._id}`,{},config)
        .then((res)=>{
            console.log("Books added to wishlist");
            getWishlist();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
 
    const handleAddToBag = (book) => {
        let config = {
                headers: {
                       'x-access-token' : localStorage.getItem("token"),
                }
            };
        userService.addToCart(`/add_cart_item/${book._id}`,{},config)
        .then((res)=>{
            console.log("Books added to cart");
            getCart();
        })
        .catch((err)=>{
            console.log(err);
        });
    };
            
    const displayBooks = () => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        userService.displayBooks("/get/book",config)
        .then((res)=>{
            setTimeout(()=>{
                setLoading(false)},2000
            );
            setBooks(res.data.result);
            console.log(res.data.result);
            console.log("Books displayed");
        })
        .catch((err)=>{
            setTimeout(()=>{
                setLoading(false)},2000
            );
            console.log(err);
        });
    }
    const sortLowToHigh = () => {
        books.sort((a,b) => {
            return a.price - b.price;
        });
    }
    const sortHighToLow = () => {
        books.sort((a,b) => {
            return b.price - a.price;
        });
    }
    const sortAToZ = () => {
        books.sort((a,b) => {
            let textA = a.bookName.toUpperCase();
            let textB = b.bookName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    const sortZToA = () => {
        books.sort((a,b) => {
            let textA = a.bookName.toUpperCase();
            let textB = b.bookName.toUpperCase();
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
    }
    React.useEffect(()=>{
    },[books]);
    React.useEffect(()=>{
        getCart();
        getWishlist();
    },[])
    React.useEffect(()=>{
        setLoading(true);
        displayBooks();
    },[items]);
    React.useEffect(()=>{
        setLoading(true);
    displayBooks();
    },[wishlist]);
  
    return (
        <div className="dashboard-container">            
            {loading ? <div className="preloaders"><img src={bookgif}/></div> : 
            <div>         
            <Header setSearchWord={setSearchWord}/>
            <Box sx={{marginLeft: '15%',marginRight: '15%',minHeight: '90vh',marginTop: '100px'}}>
                <Box sx={{display: 'flex',justifyContent: 'space-between',marginTop: '2%',marginBottom: '2%'}}>
                    <p className="books">Books <span style={{color: 'grey',fontSize: '18px'}}>({books.length})</span></p>
                    <div>
                    <Button
                        sx={{border: '1px solid',color: 'black',borderColor: 'black',marginTop: '10%'}}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Sort By Relevance
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={sortLowToHigh}>Price: Low to High</MenuItem>
                            <MenuItem onClick={sortHighToLow}>Price: High to Low</MenuItem>
                            <MenuItem onClick={sortAToZ}>A - Z</MenuItem>
                            <MenuItem onClick={sortZToA}>Z - A</MenuItem>
                                            
                        </Menu>
                    </div>
                </Box>
                <div>{ searchWord.length !=0 ? display(currentBooks.filter(ele => (ele.bookName.toLowerCase().includes(searchWord.toLowerCase()) || (ele.author.toLowerCase().includes(searchWord.toLowerCase())) ))) : display(currentBooks)}</div>
            </Box>
            <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex',justifyContent: 'center', margin: '25px'}}>
                <Pagination count={Math.ceil(books.length / booksPerPage)} page={page} shape="rounded" onChange={handlePageChange} color="myColor"
                    renderItem={(item) => (
                    <PaginationItem
                    components={{previous: a,next: b }}
                    {...item}
                    />
                )}
                />
            </Box>
            </ThemeProvider>
            <Footer/>
            </div> }
        </div>
    )
}


export default Dashboard
