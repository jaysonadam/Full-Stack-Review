const init = {
    user_id: 0,
    role: '',
    username: '',
    fullname: '',
    stream_id: ''
};

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.user_id,
                role: action.payload.role,
                username: action.payload.username,
                fullname: action.payload.fullname,
                stream_id: action.payload.stream_id
            };

        case "LOGOUT_SUCCESS":
            return init;

        default:
            return state;
    };
};

export default authReducer;