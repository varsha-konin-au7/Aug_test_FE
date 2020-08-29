import axios from 'axios'

export const loadingpost = (id) =>async dispatch => {
    try{
        console.log(id)
        console.log(`/api/v1/post/${id.id}`)
        const res = await axios.get(`/api/v1/post/${id.id}`)
        console.log(res.data)
        dispatch({
            type:"LOAD_PROFILE",
            payload: res.data
        })
    }catch(err){
        console.log(err)
    }
} 

export const pushing = ({detail, price} ) => dispatch => {
    try{
        
        dispatch({
            type:"ADD_ITEM",
            payload: {
                details:detail, price, quantity:1
            }
        })
    }catch(err){
        console.log(err)
    }
} 

export const totalling = ({total}) => dispatch =>  {
try{
    dispatch({
        type:"TOTAL",
        payload: total
    })
}catch(err){
    console.log(err)
}
}