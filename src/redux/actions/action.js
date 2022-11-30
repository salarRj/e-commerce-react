export const ADD = (item) => {
    return {
        type: 'ADD_CART',
        payload: item
       }
}


// REMove items
export const REMOVE = (id) => {
    return {
        type: 'REMOVE_CART',
        payload: id
       }
}

// remove singal item
export const REM = (itam) => {
    return {
        type: 'RMV_ONE',
        payload: itam
       }
}
