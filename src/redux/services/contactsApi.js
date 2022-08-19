import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62f3ed9cb81dba4a013f0fc6.mockapi.io/api/v1' }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => `/contacts`,
            providesTags: ['Contact'],
        }),
        getContactById: builder.query({
            query: (id) => `/contacts/${id}`,
            providesTags: ['Contact'],
        }),
        addContact: builder.mutation({
            query: values => ({
                url: '/contacts',
                method: 'POST',
                body: values,
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
        updateContact: builder.mutation({
            query: fields => ({
                url: `/contacts/${fields.id}`,
                method: 'PUT',
                body: fields,
            }),
            invalidatesTags: ['Contact'],
        }),
        toggleFavourite: builder.mutation({
            query: ({ id, favourite }) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: {favourite},
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const { useGetContactsQuery, useGetContactByIdQuery, useAddContactMutation, useDeleteContactMutation, useUpdateContactMutation, useToggleFavouriteMutation } = contactsApi;