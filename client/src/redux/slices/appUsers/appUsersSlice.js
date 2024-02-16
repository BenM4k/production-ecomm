import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../api/apiSlice";

const ENDPOINT = "/api/v1/users";
const appUsersAdapter = createEntityAdapter();

const initialState = appUsersAdapter.getInitialState();

export const appUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ENDPOINT,
      providesTags: (result) => {
        if (result && Array.isArray(result.users)) {
          const usersIds = result.users.map((user) => user.id);
          return [
            { type: "user", id: "LIST" },
            ...usersIds.map((id) => ({ type: "user", id })),
          ];
        } else {
          return { type: "user", id: "LIST" };
        }
      },
    }),
    getUser: builder.query({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, args) => {
        return [{ type: "user", id: args }];
      },
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: ENDPOINT,
        method: "POST",
        body: {
          ...user,
        },
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `${ENDPOINT}/${user.id}`,
        method: "PUT",
        body: {
          ...user,
        },
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "user", id: arg.id }],
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = appUsersApiSlice;

export const selectUsersResult = appUsersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const { selectAll: selectAllUsers } = appUsersAdapter.getSelectors(
  (store) => selectUsersData(store) ?? initialState
);
