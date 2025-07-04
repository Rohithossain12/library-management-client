import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook } from './bookTypes';


export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}


export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/books' }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query<IBook[], void>({
            query: () => '/',
            providesTags: ['books'],
            transformResponse: (response: IApiResponse<IBook[]>) => response.data,
        }),
        getBookById: builder.query<IBook, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: IApiResponse<IBook>) => response.data,
        }),
        addBook: builder.mutation<IBook, Partial<IBook>>({
            query: (book) => ({
                url: '/',
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['books'],
            transformResponse: (response: IApiResponse<IBook>) => response.data,
        }),
        updateBook: builder.mutation<IBook, { id: string; rest: Partial<IBook> }>({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['books'],
            transformResponse: (response: IApiResponse<IBook>) => response.data,
        }),
        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['books'],
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApi;



