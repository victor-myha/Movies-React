import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEV_FLAGS } from '../../utils/constants';

export type UserStateType = {
  user: UserType | null;
  isAuthorized: boolean;
};

const initialState: UserStateType = {
  user: null,
  isAuthorized: DEV_FLAGS.IS_AUTH,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth(state, { payload }: PayloadAction<UserType>) {
      state.user = payload;
      state.isAuthorized = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthorized = false;
    },
  },
});

export const { auth, logout } = userSlice.actions;
export default userSlice.reducer;
