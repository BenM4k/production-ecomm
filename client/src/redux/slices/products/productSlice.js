import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from '../../api/apiSlice';

const ENDPOINT = '/api/v1/products';
const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ENDPOINT,
            providesTags: (result) => result ? [
                { type: 'product', id: 'LIST' },
                ...result?.ids?.map((id) => ({ type: 'product', id})),
            ] : { type: 'product', id: 'LIST'},
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: ENDPOINT,
                method: 'POST',
                body: {
                  ...product,
                },
              }),
              invalidatesTags: [
                { type: 'product', id: 'LIST' },
              ],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `${ENDPOINT}/${id}`,
                method: 'DELETE',
                body: { id },
              }),
            invalidatesTags: (arg) => [
            { type: 'product', id: arg.id },
            ],
        }),
    }),
});

export const {
    useAddProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery
} = productApiSlice;

export const selectProductsResult = productApiSlice.endpoints.getProducts.select();

const selectProductsData = createSelector(
    selectProductsResult,
    (productResult) => productResult.data,
)

export const {
    selectAll: selectAllProducts,
} = productsAdapter.getSelectors((store) => selectProductsData(store) ?? initialState )

