import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logoimage from '../../assets/education.svg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector} from 'react-redux'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        color: '#9D9D9D',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '550px',
      },
    },
  }));

function Header() {
  const items = useSelector(state=>state);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: '#A03037'}}>
                <Toolbar>
                    <Box sx={{marginLeft: '13%',display: 'flex'}}>
                        <img src={logoimage}/>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block',marginLeft: '5%' } }}
                        >
                            Bookstore
                        </Typography>
                    </Box>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon sx={{color: '#9D9D9D'}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1}} />
                    <Box sx={{marginRight: '1%'}}>
                        <PersonOutlineOutlinedIcon sx={{color: '#f1f1f1',cursor: 'pointer'}}/>
                        <Typography sx={{fontSize: '14px'}}>Account</Typography>
                    </Box>
                    <Box sx={{marginRight: '15%'}}>
                      <Badge badgeContent={items.items.items.length}>
                        <ShoppingCartOutlinedIcon sx={{color: '#f1f1f1',cursor: 'pointer'}}/>
                      </Badge>
                        <Typography sx={{fontSize: '14px'}} >Cart</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            </Box>
        </div>
    )
}

export default Header
