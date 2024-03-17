import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { ProductReducer } from "./Reducers/ProductReducer";

const ProductContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  cart: [],
  searchQuery: "",
};

const API = "http://localhost:3000/items/";

const ProductProvider = ({ children }) => {
  // Get All Data From Backend
  const getProducts = async (url) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // Get Single Item From Backend
  const getSingleItem = async (url) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.get(`${API}/${url}`);
      const carts = await res.data;
      dispatch({ type: "SET_API_CART", payload: carts });
      console.log(products);
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  return (
    <ProductContext.Provider
      value={{ ...state, dispatch, getSingleItem }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
