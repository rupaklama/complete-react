export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUserAction = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});
