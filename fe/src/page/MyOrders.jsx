import { useSelector } from "react-redux"
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  console.log(orders);

  return (
    <div>
      <div className="shadow-md p-4 font-semibold">
        <h1>Order</h1>
      </div>
      {
        !orders[0] && (
          <NoData />
        )
      }

      {
        orders.map((order, index) => {
          return (
            <div key={order._id + index + "order"} className="rounded border p-4 text-sm">
              <p>Order No {index + 1}: {order.orderId}</p>
              <div className="flex gap-3">
                <img
                  src={order.product_detail.image[0]}
                  className="w-14 h-14"
                />
                <p className="font-medium">{order.product_detail.name}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders