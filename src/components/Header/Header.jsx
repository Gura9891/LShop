import React from "react";
import logo from "../../assets/img/image3.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/tools";
import { getProfileAction } from "../../redux/reducers/userReducer";
import { clearCartsAction } from "../../redux/reducers/productReducer";


export default function Header() {
  const { arrCart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const totalQuantity = arrCart.reduce((total, item) => {
    return (total += item.quantityBuy);
  }, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrCarts = [];
  const clearCarts = () => {
    dispatch(clearCartsAction(arrCarts));
  };

  
  const checkLogin = () => {
    if (userLogin) {
        navigate("/cart");
       
    } else {
      alert("đăng nhâp để vào giỏ hàng");
      return navigate("/login");
    }
  };
  const renderLoginNavItem = () => {
    if (!userLogin) {
      return (
        <li className="nav-item d-flex ">
          <NavLink className="nav-link " to="/login">
            Login
          </NavLink>
     
          <NavLink className="user-register " to="/register">Register</NavLink>
   
        </li>
      );
    }
    return (
      <li className="d-flex topc">
        <div className="nav-item" >
          <NavLink className="nav-link" to="/profile" >
            Hello <span >{userLogin.name}</span>!
          </NavLink>
        </div>
        <div className="nav-item logout">
          <NavLink
            className=" nav-link"
            to="/"
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              dispatch(getProfileAction());
              clearCarts()
            }}
          >
            Log out
          </NavLink>
        </div>
      </li>
    );
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <NavLink to="/#"  onClick={() => {  window.scrollTo(0, 0); }}>
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="user-interact ">
          <div className="search-header">       
            <NavLink className="search-btn" to="/search">
              <i class="fa-solid fa-magnifying-glass"></i>
            </NavLink>
          </div>

          <div className="cart">
            <div className="cart-icon">
         
                <i class="fa-solid fa-cart-shopping ms-2"  onClick={() => {
                      checkLogin();
                    }}></i>
          
              <span>({totalQuantity})</span>
            </div>
          </div>
          <div className="user-login">
            <NavLink to="/login">{renderLoginNavItem()}</NavLink>
          </div>
  
        </div>
      </div>
    </header>
  );
}
