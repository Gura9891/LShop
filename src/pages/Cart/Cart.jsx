import React, { useEffect } from "react";
import TableCart from "../../components/TableCart/TableCart";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { http, getStoreJson } from "../../util/tools";
import { clearCartsAction } from "../../redux/reducers/productReducer";

import { pushProductOrders } from "../../redux/reducers/productReducer";

export default function CartC() {
  const navigator = useNavigate()
  const { arrCart } = useSelector(state => state.productReducer)
  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.userReducer)


  const orderProducts = async () => {


    try {
      let arrProductsOrderFilter = arrCart.filter((item) => item !== null)
      if (arrProductsOrderFilter.length > 0) {
        let orderProducts = arrProductsOrderFilter?.reduce((order, product) => {
          order.push({
            "productId": product?.id,
            "quantity": product?.quantity
          })
          return order

        }, [])
        let dataOrder = {
          "orderDetail": orderProducts,
          "email": userLogin.email
        }

        const result = await http.post('/Users/order', dataOrder);
        alert("Đặt hàng thành công!");
        navigator('/profile')
        return dataOrder;
       

      }
      else {

        navigator('/login')
      }
    }
    catch (err) {

    }

  };
  const arrCarts = [];
  const clearCarts = () => {
    dispatch(clearCartsAction(arrCarts));
  };


  useEffect(() => {
    let arrProductOrder = getStoreJson('arrProductOrder');
    if (arrProductOrder !== null) {
      const action = pushProductOrders(arrProductOrder);
      dispatch(action);
    }
  }, [])


  return (
    <section className="cart_detail">
      <div className="container">
        <h1 className="cart_detail-title">Carts</h1>
        <TableCart />
        <div className="text-end">
          <button
            className="btn cart_detail-btn"
            onClick={() => {
              orderProducts();
              setTimeout(() => {
                clearCarts();
              }, 2000);
              toast.success("Order success");
            }}
          >
            Submit order
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
