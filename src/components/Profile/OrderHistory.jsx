import React from 'react'
import { useSelector } from 'react-redux';

export default function OrderHistory() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const renderOrderTable = () => {
    if (!userLogin) {
      return <></>;
    }
    if (!userLogin.ordersHistory) {
      return <p>Chưa có order</p>;
    }

    return userLogin?.ordersHistory.map((itemA, index) => {
    // console.log(item)
      return (
        <div key={index} style={{ marginTop: "65px" }}>
          <p
            style={{
              color: "#DD2AED",
              fontSize: "20px",
            }}
          >
            + Orders have been placed on {itemA.date}
          </p>
          <table className="table">
            <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell" width={"10%"}>
                  id
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  img
                </th>
                <th className="ant-table-cell" width={"30%"}>
                  name
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  price
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  quantity
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  total
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {itemA.orderDetail?.map((item, index) => {
                // console.log(item)
                return (
                  <tr key={index}>
                    <td className="ant-table-cell">{itemA.id}</td>
                    <td className="ant-table-cell">
                      <img className=''
                        src={item.image}
                        alt="shoes"
                        width={80}
                        height={76}
                      />
                    </td>
                    <td className="ant-table-cell">{item.name}</td>
                    <td className="ant-table-cell">{item.price}</td>
                    <td className="ant-table-cell">
                      {item.quantity}
                    </td>
                    <td className="ant-table-cell">
                      {item.price * item.quantity}
                   
                    </td>
                  </tr>
                )
              })}


            </tbody>
          </table>
        </div>
      );
    });
  };
  return (
    <div>
      <div>
        {renderOrderTable()}
      </div>


    </div>
  )
}
