import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../api/apiSlice";
import { v4 as uuid } from "uuid";
import phone from "../../../assets/phone_2.png";

const testimonialsAdapter = createEntityAdapter();

const initialState = testimonialsAdapter.getInitialState();

export const testimonialSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/testimonials",
      transformResponse: (res) => {
        const testimonials = res?.map((test) => {
          if (!test.id) test.id = uuid();
          if (!test.img) test.img = phone;
          return test;
        });
        return testimonialsAdapter.setAll(initialState, testimonials);
      },
      providesTags: (result) =>
        result
          ? [
              { type: "testimonial", id: "LIST" },
              ...result?.ids?.map((id) => ({ type: "testimonial", id })),
            ]
          : { type: "testimonial", id: "LIST" },
    }),
    addTestimonial: builder.mutation({
      query: (testimonial) => ({
        url: "/testimonials",
        method: "POST",
        body: {
          ...testimonial,
          id: uuid(),
        },
      }),
      invalidatesTags: [{ type: "testimonial", id: "LIST" }],
    }),
    deleteTestimonial: builder.mutation({
      query: ({ id }) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "testimonial", id: arg.id }],
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
} = testimonialSlice;

export const selectTestimonialsResult =
  testimonialSlice.endpoints.getTestimonials.select();

const selectTestimonialsData = createSelector(
  selectTestimonialsResult,
  (testimonialResult) => testimonialResult.data
);

export const { selectAll: selectAllTestimonials } =
  testimonialsAdapter.getSelectors(
    (store) => selectTestimonialsData(store) ?? initialState
  );
