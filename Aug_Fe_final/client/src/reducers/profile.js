const initialState = {
    post: {},
    loadedsingle: true
}

export default function(state= initialState, action){
    const {type, payload} = action;

    switch(type) {
        case "LOAD_PROFILE":
            return {
                ...state,
                post:payload,
                loadedsingle: false
            }
        default: 
        return state
    }
}