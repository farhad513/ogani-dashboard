import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller_order,
  messageClear,
  seller_order_status_update,
} from "../../store/reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);
  const status_update = (e) => {
    e.preventDefault();
    dispatch(
      seller_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl text-white">Order Details</h2>
          <select
            onChange={status_update}
            value={status}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="placed">Placed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-white">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-white text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Delivered By : {order.shippingInfo}
                  </h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2 className="text-lg">Payment Status : </h2>
                  <span>{order.payment_status}</span>
                </div>
                <span className="text-sm">Price : ${order.price}</span>
                <div className="mt-4 flex flex-col gap-4">
                  {order?.products &&
                    order?.products?.map((p, i) => (
                      <div key={i} className="text-white">
                        <div className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            src={p.images[0]}
                            alt=""
                          />
                          <div className="">
                            <h2>{p.name}</h2>
                            <p className="text-sm">
                              <span>Brand : {p.brand}</span>
                            </p>
                            <p className="text-sm">
                              <span>Quantity : {p.quantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
