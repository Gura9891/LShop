import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/tools";
// import { history } from "../../index";

const initialState = {
  arrProduct: [],
  detailProduct: {},
  arrCart: [],
  quantityBuy: 1,
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.arrProduct = action.payload;
    },
    getDetailProduct: (state, action) => {
      state.detailProduct = action.payload;
    },
    addToCart: (state, action) => {
      let index = state.arrCart.findIndex(
        (pro) => pro.id === action.payload.id
      );
      if (index !== -1) {
        state.arrCart[index].quantityBuy += state.quantityBuy;
      } else {
        let quantityBuy = state.quantityBuy;
        state.arrCart.push({ ...action.payload, quantityBuy });
      }
    },
    changeQuantity: (state, action) => {
      if (action.payload) {
        state.quantityBuy += 1;
      } else {
        if (state.quantityBuy > 1) {
          state.quantityBuy -= 1;
        }
      }
    },
    changeQuantityCart: (state, action) => {
      let { type, id } = action.payload;
      let index = state.arrCart.findIndex((pro) => pro.id === id);
      if (type) {
        state.arrCart[index].quantityBuy += 1;
      } else {
        if (state.arrCart[index].quantityBuy > 1) {
          state.arrCart[index].quantityBuy -= 1;
        } else {
          state.arrCart.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.arrCart = state.arrCart.filter(
        (pro) => pro.id !== action.payload
      );
    },

    pushProductOrders: (state, { payload }) => {
      let prod = { ...payload };
      let newArrProductsOrder = [...state.arrCart];
      let sp = newArrProductsOrder.find((p) => p.id === prod.id && Number(p.size) === Number(prod.size));
      if (sp) {
        sp.quantity += prod.quantity;
      } else {
        newArrProductsOrder.push(prod);
      }
      state.arrCart = newArrProductsOrder;
    },
    clearCartsAction: (state, action) => {
      state.arrCart = action.payload;
    },

  },
});

export const {
  getAllProduct,
  getDetailProduct,
  addToCart,
  changeQuantity,
  changeQuantityCart,
  removeFromCart,
  pushProductOrders,
  clearCartsAction
} = productReducer.actions;

export default productReducer.reducer;

// ---------------API---------------------
export const getProductApi = () => {
  return async (dispatch) => {
    const result = await http.get("/product");
    dispatch(getAllProduct(result.data.content));
  };
};
export const getDetailApi = (id) => {
  return async (dispatch) => {
    const result = await http.get(`/product/getbyid?=${id}`);
    dispatch(getDetailProduct(result.data.content));
  };
};

