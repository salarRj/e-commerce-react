import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import CardData from './CardData';
import './style.css'
import { ADD } from '../redux/actions/action';


const Cards = () => {

    const dispatch = useDispatch()

    const [data, setData] = useState(CardData)

    const send = (e) => {
        // console.log(e);

        dispatch(ADD(e))
    }

    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Add To Cart Project</h2>

            <div className='row d-flex justify-content-center align-items-center'>
                {
                    data.map((element, id) => {
                        return (
                            <Card style={{ width: '22rem', border: "none"}} className="mx-2 mt-4 card_style">
                                <Card.Img variant="top" src={element.imgdata} style={{height:"16rem"}} className="mt-3" />
                                <Card.Body>
                                    <Card.Title>{element.rname}</Card.Title>
                                    <Card.Text>
                                        Price: Rs. {element.price}
                                    </Card.Text>
                                    <div className='button_div d-flex justify-content-center'>
                                    <Button onClick={()=>send(element)} variant="primary" className='col-lg-12'>Add To Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards