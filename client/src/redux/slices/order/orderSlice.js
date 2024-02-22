import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../api/apiSlice";

const ENDPOINT = "/api/v1/orders";
const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState();

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ENDPOINT,
      providesTags: (result) => {
        if (result && Array.isArray(result.orders)) {
          const ordersIds = result.orders.map((order) => order.id);
          return [
            { type: "order", id: "LIST" },
            ...ordersIds.map((id) => ({ type: "order", id })),
          ];
        } else {
          return { type: "order", id: "LIST" };
        }
      },
    }),
    getSingleOrder: builder.query({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, args) => {
        return [
          { type: "order", id: "LIST" },
          { type: "order", id: args },
        ];
      },
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: ENDPOINT,
        method: "POST",
        body: {
          ...order,
        },
      }),
      invalidatesTags: [
        { type: "order", id: "LIST" },
        { type: "product", id: "LIST" },
        { type: "user", id: "LIST" },
      ],
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: `${ENDPOINT}/${order?.id}`,
        method: "PUT",
        body: { ...order },
      }),
      invalidatesTags: [{ type: "order", id: "LIST" }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "order", id: arg.id }],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
} = orderApiSlice;

export const selectOrdersResult = orderApiSlice.endpoints.getOrders.select();

const selectOrdersData = createSelector(
  selectOrdersResult,
  (orderResult) => orderResult.data
);

export const { selectAll: selectAllorders } = ordersAdapter.getSelectors(
  (store) => selectOrdersData(store) ?? initialState
);
