import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "@shared/types"

import { profileApi } from "../api"


type User = {
	name: string,
	password?: string,
	email: string
}

interface InitialState {
  user: User | null
  isAuthenticated: boolean
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(profileApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(profileApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })

  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated

export const selectCurrent = (state: AppState) => state.auth.current

export const selectUser = (state: AppState) => state.auth.user