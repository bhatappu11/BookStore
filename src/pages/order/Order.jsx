import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './Order.scss'
import upper from '../../assets/upper.png'
import lower from '../../assets/lower.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router';

function Order() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="order-container">
                <div>
                    <img className="upper" src={upper}/>
                </div>
                <div>
                <p className="order-placed">Order Placed Successfully</p>
                </div>
                <div>
                    <img className="lower" src={lower} />
                </div>
                <div>
                    <p className="order-details">Hurray!!! your order is confirmed <br></br> the order id is #123456 save the order id for<br></br> further communication..</p>
                </div>
                <div className="order-table">
                    <table>
                        <tr>
                            <th>Email Us</th>
                            <th>Contact Us</th>
                            <th>Address</th>
                        </tr>
                        <tr>
                            <td>admin@bookstore.com</td>
                            <td>+91 8163475881</td>
                            <td>
                            42, 14th Main, 15th Cross, Sector 4 ,opp to BDA 
                            complex, near Kumarakom restaurant, HSR Layout,
                             Bangalore 560034
                            </td>
                        </tr>
                    </table>
                </div>   
                <div>
                <Button onClick={() => { navigate('/dashboard') }} style={{marginTop:"50px", padding:"10px 60px"}} variant="contained">Continue Shopping</Button>
                </div>     
            </div>
            <Footer />
        </div>
    )
}

export default Order
