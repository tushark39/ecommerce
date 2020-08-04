import React,{useState,useEffect} from 'react'
import { getProduct } from "./Helper/coreapicall";
import Base from './Base';
import Card from './Card';

export default function Home(){
    const [products,setProducts] = useState([])
    // eslint-disable-next-line
    const [error,setError] = useState(false)
    const loadAllProducts = () => {
        getProduct()
        .then((data)=>{
                        
            if(data.error){
                setError(data.error)
                console.log(data.error); 
            }
            else{
                setProducts(data)
            }
        })
        .catch(e=>setError(e))
    }
    useEffect(()=>{
        loadAllProducts();
    },[])
    return(
        <Base 
        title="Home Page"
        description="Welcome To T-Shirt Store"
        >
            {/* <h1>Home</h1> */}
            <div className="row">
                {
                    products.map((res,index)=>{
                    return(
                        <div key={index} className="col-4 mb-4">
                        <Card product={res}/>
                        </div>
                    )
                  })
                }
            </div>
        </Base>
    )
}