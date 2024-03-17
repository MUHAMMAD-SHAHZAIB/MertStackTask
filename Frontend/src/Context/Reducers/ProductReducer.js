export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    case "SET_API_CART":
      return {
        ...state,
        isLoading: false,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      console.log(action.payload);
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    case "FILTER_BY_SEARCH":
      const searchTerm = action.payload.toLowerCase();
      const filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        products: filteredProducts,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
