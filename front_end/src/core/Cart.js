import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './Helper/CartHelper';
import PaymentB from './PaymentB';

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload,setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    const loadAllProducts = (products) => {
        return (
            <div>
                {
                    products.map((products, index) => 
                         (
                            <Card
                            key={index}
                            product = {products}
                            addtoCart = {false}
                            removeFromCart = {true}
                            reload={reload}
                            setReload={setReload}

                            />
                        )
                    )
                }
            </div>
        )
    }
    const loadCheckout = () => {
        return (
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }
    return (
        <Base title="Cart" description="">
            <div className="row text-center">
                <div className="col-6">
                    {products.length !== 0 ? loadAllProducts(products) : <h1>No Products</h1> }
                </div>
                <div className="col-6">
                    {/* {loadCheckout()} */}
        {products.length > 0 ? (
            <PaymentB 
                products={products}
                setReload={setReload}
            />

        ) : (
            <h3>Cart is Empty</h3>
        )}
                </div>
            </div>
        </Base>
    );
}

export default Cart;
