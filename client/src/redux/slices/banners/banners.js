import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../api/apiSlice";

const ENDPOINT = "/api/v1/banners";
const bannersAdapter = createEntityAdapter();

const initialState = bannersAdapter.getInitialState();

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ENDPOINT,
      providesTags: (result) => {
        if (result && Array.isArray(result.banners)) {
          const bannersIds = result?.banners?.map((banner) => banner.id);
          return [
            { type: "banner", id: "LIST" },
            ...bannersIds?.map((id) => ({ type: "banner", id })),
          ];
        } else {
          return { type: "banner", id: "LIST" };
        }
      },
    }),
    addBanner: builder.mutation({
      query: (banner) => ({
        url: ENDPOINT,
        method: "POST",
        body: {
          ...banner,
        },
      }),
      invalidatesTags: [{ type: "banner", id: "LIST" }],
    }),
    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "banner", id: arg.id }],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
} = bannerApiSlice;

export const selectBannersResult = bannerApiSlice.endpoints.getBanners.select();

const selectBannersData = createSelector(
  selectBannersResult,
  (bannerResult) => bannerResult.data
);

export const { selectAll: selectAllBanners } = bannersAdapter.getSelectors(
  (store) => selectBannersData(store) ?? initialState
);
