import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import apiSlice from "../../api/apiSlice";
import phone from "../../../assets/watch_1.webp";

const bannersAdapter = createEntityAdapter();

const initialState = bannersAdapter.getInitialState();

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "/banners",
      transformResponse: (res) => {
        const banners = res?.map((banner) => {
          if (!banner.id) banner.id = uuid();
          if (!banner.img) banner.img = phone;
          return banner;
        });
        return bannersAdapter.setAll(initialState, banners);
      },
      providesTags: (result) =>
        result
          ? [
              { type: "banner", id: "LIST" },
              ...result?.ids?.map((id) => ({ type: "banner", id })),
            ]
          : [{ type: "banner", id: "LIST" }],
    }),
    addBanner: builder.mutation({
      query: (banner) => ({
        url: "/banners",
        method: "POST",
        body: {
          ...banner,
          id: uuid(),
        },
      }),
      invalidatesTags: [{ type: "banner", id: "LIST" }],
    }),
    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/banners/${id}`,
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
