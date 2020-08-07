import { API } from "../../backend";
const orderHelper = (userId, token, orderData) => {
    const formData = new FormData()

    for (const name in orderData)
        formData.append(name, orderData[name]);

        return fetch(`${API}order/add/${userID}/${token}/`,{
            method:"POST",
            body:formData
        })
        .then((res)=>{
            console.log(JSON.stringify(res));
            return res.json()
        })
        .catch(err => console.log(err))
}

export default orderHelper;
