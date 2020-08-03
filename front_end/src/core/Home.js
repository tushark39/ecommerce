import React,{useState,useEffect} from 'react'
import { getProduct } from "./Helper/coreapicall";
export default function Home(){
    const [products,setProducts] = useState([])
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
    }
    useEffect(()=>{
        loadAllProducts();
    },[])
    return(
        <div>
            <h1>Home</h1>
            <div className="row">
                {
                    products.map((res,index)=>{
                    return(
                        <div key={index}>
                        &nbsp;&nbsp; <h2>&nbsp;&nbsp;{res.name}</h2>&nbsp;&nbsp;
                        </div>
                    )
                  })
                }
            </div>
        </div>
    )
}