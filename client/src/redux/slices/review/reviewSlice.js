import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from '../../api/apiSlice';

const ENDPOINT = '/api/v1/reviews';
const reviewsAdapter = createEntityAdapter();

const initialState = reviewsAdapter.getInitialState();

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ENDPOINT,
            providesTags: (result) => {
                if (result && Array.isArray(result.reviews)) {
                    const reviewsIds = result.reviews.map((review) => review.id);
                    return [
                        { type: 'review', id: 'LIST' },
                        ...reviewsIds.map((id) => ({ type: 'review', id })),
                    ];
                } else {
                    return { type: 'review', id: 'LIST' };
                }
            }
        }),
        addReview: builder.mutation({
            query: (review) => ({
                url: ENDPOINT,
                method: 'POST',
                body: {
                  ...review,
                },
              }),
              invalidatesTags: [
                { type: 'review', id: 'LIST' },
                { type: 'product', id: 'LIST' },
              ],
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `${ENDPOINT}/${id}`,
                method: 'DELETE',
                body: { id },
              }),
            invalidatesTags: (arg) => [
            { type: 'review', id: arg.id },
            ],
        })
    }),
});

export const {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsQuery
} = reviewsApiSlice;

export const selectReviewsResult = reviewsApiSlice.endpoints.getReviews.select()

const selectReviewsData = createSelector(
    selectReviewsResult,
    (reviewResult) => reviewResult.data,
)

export const {
    selectAll: selectAllReviews,
} = reviewsAdapter.getSelectors((store) => selectReviewsData(store) ?? initialState )
