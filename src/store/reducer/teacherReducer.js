const init = {
    id: 0,
    role: '',
    username: '',
    fullname: '',
    class: ''
};

const teacherReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.teacher_id,
                role: action.payload.role,
                username: action.payload.username,
                fullname: action.payload.fullname,
                class: action.payload.class
            };

        case "LOGOUT_SUCCESS":
            return init;

        default:
            return state;
    };
};

export default teacherReducer;