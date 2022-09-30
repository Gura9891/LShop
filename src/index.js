import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/sass/style.scss";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";



export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="profile" element={<Profile />}></Route>
      
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

reportWebVitals();
