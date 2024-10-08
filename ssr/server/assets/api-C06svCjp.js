import { r as rootApi } from "../main.js";
const userApi = rootApi.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "/profile/",
      providesTags: ["User"]
    }),
    fetchUserBalance: builder.query({
      query: () => "/profile/balance"
    }),
    updateUserCredentials: builder.mutation({
      query: (body) => ({
        url: "/profile/",
        method: "POST",
        body
      }),
      invalidatesTags: (result, error) => error ? [] : ["User"]
    }),
    updateUserPhoto: builder.mutation({
      query: (photo) => {
        const formData = new FormData();
        formData.append("photo", photo);
        return {
          url: "/profile/",
          method: "PATCH",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        };
      },
      invalidatesTags: (result, error) => error ? [] : ["User"]
    })
  })
});
const {
  useFetchUserDataQuery,
  useLazyFetchUserDataQuery,
  useFetchUserBalanceQuery,
  useLazyFetchUserBalanceQuery,
  useUpdateUserCredentialsMutation,
  useUpdateUserPhotoMutation
} = userApi;
export {
  useFetchUserDataQuery as a,
  useUpdateUserPhotoMutation as b,
  useUpdateUserCredentialsMutation as c,
  useFetchUserBalanceQuery as u
};
