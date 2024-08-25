const initialState = {
    products: [],
    product : null,
    record : null,
    error : null,//changes
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case "FETCH_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                product: null,
            };

        case "ADD_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                product: null,
            };
            
            case "SELECT_PRODUCTS":
                return{
                    ...state,
                    product: action.payload,
                };

            case "UPDATE_PRODUCTS":
                    return{
                        ...state,
                        product: action.payload,
                    };
                    
                    case 'DELETE_PRODUCT':
                        return {
                            ...state,
                            products: state.products.filter(product => product.id !== action.payload)
                        };


                case "RECORD_UPDATED":
                    return {
                        ...state,
                        record: action.payload
                    }
        
                case "RECORD_ERROR":
                    return {
                        ...state,
                        error: action.payload
                    }
        
                default:
                    return state;
    
    }
}

export default productReducer;