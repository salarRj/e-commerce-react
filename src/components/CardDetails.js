import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import CardData from './CardData';
import "./style.css";
import { cartReducer } from '../redux/reducers/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ADD, REMOVE, REM } from '../redux/actions/action';

const CardDetails = () => {
    // get Id from Header
    const { id } = useParams();
    // console.log(id);

    // get from store
    const getdata = useSelector((state) => state.cartReducer.carts);
    // console.log(getdata);


    const dispatch = useDispatch()
    const history = useNavigate();

    // add data
    const send = (e) => {
        // console.log(e);

        dispatch(ADD(e))
    }

    // remove one
    const remove = (item) => {
        dispatch(REM(item))
    }

    // delete 
    const Remove = (id) => {
        dispatch(REMOVE(id));
        history("/");
    }

    




    const compair = () => {
        let compareData = getdata.filter((e) => {
            return e.id == id
        });
        setData(compareData);
    }

    useEffect(() => {
        compair();
    }, [id])

    const [data, setData] = useState([])
    return (
        <>
            <div className='container mt-2'>
                <h2 className='text-center'>Items Details Page</h2>

                <section className='container mt-3'>
                    <div className='iteamsdetails'>
                        {
                            data.map((ele, id) => {
                                return (
                                    <>

                                        <div className="items_img">
                                            <img src={ele.imgdata} alt="" />
                                        </div>
                                        <div className="details">
                                            <Table>
                                                <tr>
                                                    <td>
                                                        <p> <strong>Restaurant</strong>  : {ele.rname}</p>
                                                        <p> <strong>Price</strong>  : {ele.price}</p>
                                                        <p> <strong>Dishes</strong>  : {ele.address}</p> 
                                                        <p> <strong>Total</strong>  :  {ele.price * ele.qnty}</p>
                                                        <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:'pointer',background:'#ddd',color:'#111'}}>
                                                            <sapn style={{fontSize:24}} onClick={ele.qnty <=1 ?()=>Remove(ele.id) : ()=>remove(ele)}>-</sapn>
                                                            <sapn style={{fontSize:24}}>{ele.qnty}</sapn>
                                                            <sapn style={{fontSize:24}} onClick={()=>send(ele)}>+</sapn>
                                                        </div> 
                                                    </td>
                                                    <td>
                                                        <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}> {ele.rating}	</span></p>
                                                        <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                                                        <p><strong>Remove :</strong> <span ><i onClick={()=>Remove(ele.id)} className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                                                    </td>
                                                </tr>
                                            </Table>
                                        </div>

                                    </>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default CardDetails