import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { page, searchValue, perPage },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/get-orders?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { page, searchValue, perPage, sellerId },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/get-orders/${sellerId}?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_order = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/order/${orderId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/order/${orderId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async (
    { orderId, info },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/admin/order-status-update/${orderId}`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update",
  async (
    { orderId, info },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/seller/order-status-update/${orderId}`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_admin_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrder;
    },
    [get_admin_order.fulfilled]: (state, { payload }) => {
      state.order = payload.order;
    },
    [admin_order_status_update.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
    },
    [admin_order_status_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_seller_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.order;
      state.totalOrder = payload.totalOrder;
    },
    [get_seller_order.fulfilled]: (state, { payload }) => {
      state.order = payload.order;
    },
    [seller_order_status_update.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
    },
    [seller_order_status_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
