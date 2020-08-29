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
        case "ADD_ITEM":
            const index = state.items.findIndex(el => el.details === payload.details)
            console.log(index)
            if (index === -1){
                return {
                ...state,
                post: [ ...state.items, payload ]
            }
            } else {
                return {
                    ...state,
                    items : state.items.map((item,i) => 
                index === i ? {...item, quantity: item.quantity + 1}
                : item)}
            }
        case "TOTAL":
            return {
                ...state,
                total: payload
            }
        default: 
        return state
    }
}