import React,{useState} from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import './Dashboard.scss'
import UserService from '../../services/UserService';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import bookimage from '../../assets/Image 12@2x.png'
import { Button, createTheme, IconButton, PaginationItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const userService = new UserService();
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); 
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

    const [page, setPage] = React.useState(1);
    const [booksPerPage, setBooksPerPage] = useState(12);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const indexOfLastBook = page * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
            
    const displayBooks = () => {
        let config = {
            headers: {
                'x-access-token' : localStorage.getItem("token"),
            }
        };
        userService.displayBooks("/get/book",config)
        .then((res)=>{
            console.log(res.data.result);
            setBooks(res.data.result);
            console.log("Books displayed");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    React.useEffect(()=>{
        displayBooks();
   },[]);
  
    return (
        <div>
            <Header />
            <Box sx={{marginLeft: '10%',marginRight: '10%',minHeight: '90vh'}}>
                <Box sx={{display: 'flex',justifyContent: 'space-between',marginTop: '1%'}}>
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
                            <MenuItem value={10}>Price: Low to High</MenuItem>
                            <MenuItem value={20}>Price: High to Low</MenuItem>
                            <MenuItem value={30}>Newest Arrivals</MenuItem>
                                            
                        </Menu>
                    </div>
                </Box>
                <Box>
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }}>
                    {
                    currentBooks.map((book)=>(
                        <Grid item xs={6} sm={3} md={2} >
                        <Item>
                            <div className="all-books">
                            <Box  sx={{display:'flex', flexDirection:'column',backgroundColor: '#F5F5F5'}}>                        
                                <div className="alchemist">
                                    <img src={bookimage} />
                                </div>  
                                <div className="book-details">
                                    <div className="book-title">{book.bookName}</div>
                                    <div className="book-author">by {book.author}</div>
                                    <div className="book-price">Rs {book.price}</div>                                
                                <div className="add-buttons">
                                    <Button fullWidth style={{border: '1px solid',backgroundColor: '#A03037',color: '#f1f1f1',cursor: 'pointer',marginRight: '10px'}}>ADD TO BAG</Button>
                                    <Button fullWidth style={{border: '1px solid',backgroundColor: '#ffffff',color: '#000000',cursor: 'pointer'}}>WISHLIST</Button>
                                </div>
                                </div>
                            </Box>
                            </div>
                        </Item>
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </Box>
            <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex',justifyContent: 'center', margin: '25px'}}>
                <Pagination count={Math.ceil(books.length / 12)} page={page} shape="rounded" onChange={handlePageChange} color="myColor"
                    renderItem={(item) => (
                    <PaginationItem
                    components={{previous: a,next: b }}
                    {...item}
                    />
                )}
                />
            </Box>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default Dashboard
