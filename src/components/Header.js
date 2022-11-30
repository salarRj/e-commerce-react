import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { REMOVE } from '../redux/actions/action';

const Header = () => {

    const [price , setPrice] = useState(0);
    // console.log(price);

    // get from store
    const getdata = useSelector((state) => state.cartReducer.carts);
    // console.log(getdata);

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()


    // delete 
    const Remove = (id) => {
        dispatch(REMOVE(id))
    }

    const total = () => {
        let price = 0;
        getdata.map((ele,k)=>{
            price = ele.price + price
        })
        setPrice(price)
    }

    useEffect(()=>{
        total();
    }, [total])

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: '60px' }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add To Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light mx-3">Home</NavLink>
                    </Nav>


                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i class="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
                    </Badge>
                </Container>


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: '24rem', padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Resturent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} style={{ width: '5rem', height: '5rem' }} alt='' />
                                                            </NavLink>

                                                        </td>
                                                        <td>
                                                            <p>Name: {e.rname}</p>
                                                            <p>Price: {e.price}</p>
                                                            <p>Quantity: {e.qnty}</p>
                                                            <p onClick={()=>Remove(e.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                        </td>
                                                        <td classname="mt-5" style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>Remove(e.id)} >
                                                            <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <p className="text-center">Total: {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: '24rem', padding: 10, position: 'relative' }}>
                                <i className='fas fa-close smallclose'
                                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: 'pointer' }}
                                    onClick={handleClose}
                                ></i>
                                <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
                                <img src='./cart.gif' alt='' className="emptycart_img" style={{ width: '5rem', padding: 10 }} />
                            </div>
                    }
                </Menu>
            </Navbar>
        </>
    )
}

export default Header 