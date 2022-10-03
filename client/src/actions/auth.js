export const userLoggedIn = (user) => ({
    type: 'USER_LOGGED_IN',
    user
})
export const userLoggedOut = () => ({
    type: 'USER_LOGGED_OUT',
})

export const userBalanceUpdated = (user) => ({
    type: 'USER_BALANCE_UPDATE',
    user
})


// export const login = (credentials) => dispatch =>
//     api.user.login(credentials).then(user => {
//         localStorage.user = user.email;
//         dispatch(userLoggedIn(user))
//     });

// export const logout = () => dispatch => {
//     localStorage.removeItem('user');
//     dispatch(userLoggedOut());
// }

// export const signup = (data) => dispatch =>
//     api.user.signup(data).then(user => dispatch(userLoggedIn(user)));