import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginApi } from "../../redux/reducers/userReducer";
import FacebookLogin from "react-facebook-login";


export default function Login() {
  const dispatch = useDispatch();
  const responseFacebook=(response)=>{
    console.log(response);
  }


  const frm = useFormik({
    initialValues: {
      
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({

      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Password không được bỏ trống")
        
    }),
    onSubmit: (values) => {
  
    dispatch(loginApi(values))

    },
  });

  return (
    <div className="login-page">
      <h3 className="text-start">Login</h3>
      <form className="loginForm" onSubmit={frm.handleSubmit}>
        <div className="form-group">
          <p>Email</p>
          <input
            className="from-control"
            type="email"
            placeholder="email"
            name="email"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          {frm.errors.email ? (
            <p className="text-danger mb-3">{frm.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group ">
          <p>Password</p>
          <input
            className="from-control"
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
     
          />

          <i
            class="fa fa-eye"
            id="togglePassword"
            onClick={() => {
              const type =
                document.querySelector("#password").getAttribute("type") ===
                "password"
                  ? "text"
                  : "password";
              document.querySelector("#password").setAttribute("type", type);
    
              document
                .querySelector("#togglePassword")
                .classList.toggle("fa fa-eye-slash");
            }}
          ></i>
        </div>
        {frm.errors.password ? (
          <p className="text-danger text-start mb-3">{frm.errors.password}</p>
        ) : (
          ""
        )}
        <div className="navigate  mb-3">
          <NavLink to="/register">Register now ?</NavLink>
          <button>Login</button>
        </div>
        <button className="accessFacebook">
        <i class="fa-brands fa-facebook-f"></i>

        <FacebookLogin 
        appId="762219268192850"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
        </button>
      </form>
    </div>
  );
}