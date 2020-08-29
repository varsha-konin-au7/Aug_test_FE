const initialState = {
    isAuthenticated: false,
    user: null,
    copyPost: [],
    productfetch: true
}
 
export default function(state= initialState, action){
    const {type, payload} = action;

    switch(type) {
        case "LOGIN_SUCCESS":
            console.log(payload)
            return {
                ...state,
                isAuthenticated: true
            }
        case "USER_LOADED":
            console.log("Loading user===>>", payload)
            return {
                ...state,
                user: payload,
                isAuthenticated: true
            }
        case "POST_LOADED":
            console.log("pAuylod in product loading==>>", payload)
            return{
                ...state,
                copyPost: payload.data,
                productfetch: false
            }
        case "AUTH_ERROR":
            return{
                ...state,
                isAuthenticated: false
            }
        default: 
        return state
    }
}