export const getUser = state => state.user.id + '***';
export const getUserFunc = state => (id) => state.user.id + '***' + id;

export const getToken = state => getUser(state).token;