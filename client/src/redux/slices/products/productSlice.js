import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../api/apiSlice";

const ENDPOINT = "/api/v1/products";
const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ENDPOINT,
      providesTags: (result) => {
        if (result && Array.isArray(result.products)) {
          const productIds = result.products.map((product) => product.id);
          return [
            { type: "product", id: "LIST" },
            ...productIds.map((id) => ({ type: "product", id })),
          ];
        } else {
          return { type: "product", id: "LIST" };
        }
      },
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: ENDPOINT,
        method: "POST",
        body: {
          ...product,
        },
      }),
      invalidatesTags: [{ type: "product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${ENDPOINT}/${product.id}`,
        method: "PUT",
        body: { ...product },
      }),
      invalidatesTags: [{ type: "product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "product", id: arg.id }],
    }),
    getStoreProduct: builder.query({
      query: (page) => `/api/v1/store-products?page=${page}&pageSize=12`,
      providesTags: (result) => {
        if (result && Array.isArray(result.products)) {
          const productIds = result.products.map((product) => product.id);
          return [
            { type: "product", id: "LIST" },
            ...productIds.map((id) => ({ type: "product", id })),
          ];
        } else {
          return { type: "product", id: "LIST" };
        }
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, args) => {
        return [{ type: "product", id: args }];
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetStoreProductQuery,
  useGetSingleProductQuery,
} = productApiSlice;

export const selectProductsResult =
  productApiSlice.endpoints.getProducts.select();

const selectProductsData = createSelector(
  selectProductsResult,
  (productResult) => productResult.data.products
);

export const { selectAll: selectAllProducts } = productsAdapter.getSelectors(
  (store) => selectProductsData(store) ?? initialState
);
