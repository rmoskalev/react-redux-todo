import { createSlice } from '@reduxjs/toolkit';
import { TOKEN_KEY } from '@shared/constants';
import { profileEndpoints } from '../api';

type State = string | null;

const initialState: State = localStorage.getItem(TOKEN_KEY);

const saveToken = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token);
	return token;
};

const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
	return null;
};

export const {
	name: tokenSliceName,
	reducer: tokenReducer,
	selectors: { selectToken },
} = createSlice({
	name: 'token',
	initialState,
	selectors: {
		selectToken: state => state,
	},
	reducers: {
		resetToken: () => removeToken(),
	},
	extraReducers: builder => {
		const { loginUser, logoutUser, userSelect, registerUser } =
			profileEndpoints;

		builder.addMatcher(logoutUser.matchFulfilled, removeToken);

		builder.addMatcher(userSelect.matchRejected, state => {
			if (!state) return null;
			return removeToken();
		});

		builder.addMatcher(loginUser.matchFulfilled, (_, { payload }) => {
			return payload?.token ? saveToken(payload.token) : removeToken();
		});

		builder.addMatcher(registerUser.matchFulfilled, (_, { payload }) => {
			return payload?.token ? saveToken(payload.token) : removeToken();
		});
	},
});
