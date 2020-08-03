import { API } from "../../backend";

export const getProduct = () =>{
    return fetch(`${API}product`,{method:"GET"})
    .then(res=>{
        return res.json();
    })
    .catch(e=>console.log('Error : '+ e)
    )
}