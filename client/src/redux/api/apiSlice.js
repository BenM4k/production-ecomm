import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


const baseQueryWithAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.originalStatus === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult?.data, user }));
            result = await baseQuery(args, api, extraOptions);
        }else {
            api.dispatch(logOut());
        }
    }

    return result;
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    endpoints: () => ({}),
});

export default apiSlice;