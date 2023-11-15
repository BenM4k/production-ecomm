import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from '../../api/apiSlice';

const ENDPOINT = '/api/v1/orders';
const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState();

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ENDPOINT,
            providesTags: (result) => result ? [
                { type: 'order', id: 'LIST' },
                ...result?.ids?.map((id) => ({ type: 'order', id})),
            ] : { type: 'order', id: 'LIST'},
        }),
        addOrder: builder.mutation({
            query: (order) => ({
                url: ENDPOINT,
                method: 'POST',
                body: {
                  ...order,
                },
              }),
              invalidatesTags: [
                { type: 'order', id: 'LIST' },
              ],
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `${ENDPOINT}/${id}`,
                method: 'DELETE',
                body: { id },
              }),
            invalidatesTags: (arg) => [
            { type: 'order', id: arg.id },
            ],
        })
    }),
});

export const {
    useAddOrderMutation,
    useDeleteOrderMutation,
    useGetOrdersQuery
} = orderApiSlice;

export const selectOrderResult = orderApiSlice.endpoints.getOrders.select()

const selectOrdersData = createSelector(
    selectOrderResult,
    (orderResult) => orderResult.data,
)

export const {
    selectAll: selectAllOrders,
} = ordersAdapter.getSelectors((store) => selectOrdersData(store) ?? initialState )
