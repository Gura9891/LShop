import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
  http
} from "../../util/tools";
import { history } from "../../index";


const initialState = {
  // userSignup:[],
  userLogin: getStoreJson(USER_LOGIN),
  userFavorite: getStoreJson("USER_FAV"),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload
    },
    getUserFavAction: (state, action) => {

      state.userFavorite = action.payload;
    },
  },
});


export const { getProfileAction, getUserFavAction } = userReducer.actions;

export default userReducer.reducer;




export const registerApi = (userRegister) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/users/signup", userRegister);

      alert("Đăng ký thành công!");
      history.push("/login");

    } catch (err) {
      alert("Tài khoản đã tồn tại");
      history.push("/register");

    }
  };
};


export const signupApi = (values) => {
  return async () => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: values,
      });
      alert(result.data.message);

    } catch (err) {

      alert(err.response?.data.message);
    }
  };
};

export const loginApi = (values) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        data: values,
      });
      setCookie(ACCESS_TOKEN, result.data.content.accessToken);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);

      dispatch(getProfileApi())
      alert(result.data.message);
      history.push("/profile");

    } catch (err) {

      alert(err.response?.data.message);
      history.push("/register");
    }
  };
};


export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })

      const action = getProfileAction(result.data.content)
      dispatch(action)

      setStoreJson(USER_LOGIN, result.data.content)
    } catch (err) {


    }
  }

};


export const updateProfileApi = (userUpdate) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/updateProfile", userUpdate);

      dispatch(getProfileApi());
      alert('Cập nhật dữ liệu thành công!')
    } catch (err) {

      alert("Cập nhật dữ liệu không thành công!");
    }
  };
};

export const getProductsFavoriteApi = (
  accessToken = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/Users/getproductfavorite");

      setStoreJson("USER_FAV", result.data.content);
      dispatch(getUserFavAction(result.data.content));
    } catch (err) {
      alert("Eror!")
    }
  };
};
export const fbLoginApi = (fbToken) => {
  return async (dispatch) => {
    try {

      const result = await http.post("/Users/facebooklogin", fbToken);

      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);

      dispatch(getProfileApi());
      alert("Đăng nhập thành công!");
      history.push("/profile");
    } catch (err) {


    }
  };
};