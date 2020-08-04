import React from 'react';
import ImageHelper from './Helper/ImageHelper';
import { Redirect } from "react-router-dom";

const isAuthenticated = false

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false
}) => {
 

    const cartTitle = product.name ? product.name : "Dummy Name"
    const cartDescription = product.description ? product.description : "Dummy description"
    const cartPrice = product.price ? product.price : "Dummy price"

    const addToCart = () => {
        if (isAuthenticated) {
            console.log('Added to cart')
        } else {
            console.log('Login Please!!')
        }
    }
    // const getRedirect = redirect => {
    //     if (redirect) {
    //         return <Redirect to="/cart" />
    //     }
    // }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={() => addToCart()}
                    className="btn btn-block btn-outline-success mt-2 mb-2 "
                >
                    Add to Cart
                </button>
            )
        )
    }
    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
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
                        <button
                            onClick={() => { }}
                            className="btn btn-block btn-outline-danger mt-2 mb-2"
                        >
                            Remove from cart
              </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
