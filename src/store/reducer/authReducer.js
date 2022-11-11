const init = {
    id: 0,
    role: '',
    username: ""
};

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                role: action.payload.id,
                username: action.payload.username
            };

        case "EDIT_SUCCESS":
            return {
                ...state,
                id: action.payload.user_id,
                username: action.payload.username
            }

        case "LOGOUT_SUCCESS":
            return init;

        default:
            return state;
    };
};

export default authReducer;