import React,{useState} from 'react';
import ImageHelper from './Helper/ImageHelper';
import { Redirect } from "react-router-dom";
import {addItemToCart,removeItemFromCart} from './Helper/CartHelper'
import { isAuthenticated } from '../auth/Helper'

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f
}) => {

    const [redirect,setRedirect] = useState(false)

    const cartTitle = product.name ? product.name : "Dummy Name"
    const cartDescription = product.description ? product.description : "Dummy description"
    const cartPrice = product.price ? product.price : "Dummy price"

    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product,()=>{setRedirect(true)})
            console.log('Added to cart')
        } else {
            window.location.replace("/signin");
           console.log('Login Please!!')
        }
    }
    // eslint-disable-next-line
    const getRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addtoCart && (
                <button
                    onClick={() => addToCart()}
                    className="btn btn-block btn-outline-success mt-2 mb-2 "
                >
                    Add to Cart
                </button>
            )
        )
    }
    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product.id)
                        setReload(!reload)
                        console.log('removed from cart ')}
                    }
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }
    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
            {getRedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap text-center">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">Rs.{cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
