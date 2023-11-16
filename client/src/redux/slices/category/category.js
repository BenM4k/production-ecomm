import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from '../../api/apiSlice';

const ENDPOINT = '/api/v1/categories';
const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ENDPOINT,
            providesTags: (result) => {
                if (result && Array.isArray(result.categories)) {
                    const categoriesIds = result.categories.map((category) => category.id);
                    return [
                        { type: 'category', id: 'LIST' },
                        ...categoriesIds.map((id) => ({ type: 'category', id })),
                    ];
                } else {
                    return { type: 'category', id: 'LIST' };
                }
            }
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: ENDPOINT,
                method: 'POST',
                body: {
                  ...category,
                },
              }),
              invalidatesTags: [
                { type: 'category', id: 'LIST' },
              ],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${ENDPOINT}/${id}`,
                method: 'DELETE',
                body: { id },
              }),
            invalidatesTags: (arg) => [
            { type: 'category', id: arg.id },
            ],
        })
    }),
});

export const {
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery
} = categoryApiSlice;

export const selectCategoriesResult = categoryApiSlice.endpoints.getCategories.select()

const selectCategoriesData = createSelector(
    selectCategoriesResult,
    (categoryResult) => categoryResult.data,
)

export const {
    selectAll: selectAllCategories,
} = categoriesAdapter.getSelectors((store) => selectCategoriesData(store) ?? initialState )
