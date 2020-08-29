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
