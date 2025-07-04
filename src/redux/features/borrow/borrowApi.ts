import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBorrow, IBorrowSummary } from './borrowTypes';


export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/borrow' }),
  tagTypes: ['borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<{ success: boolean; message: string; data: IBorrow }, IBorrow>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['borrow'],
    }),
    getSummary: builder.query<{ success: boolean; message: string; data: IBorrowSummary[] }, void>({
      query: () => '/',
      providesTags: ['borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetSummaryQuery } = borrowApi;