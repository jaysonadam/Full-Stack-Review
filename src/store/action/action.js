export const loginAction = (loginData) => {
    localStorage.setItem("userData", JSON.stringify(loginData));
  
    return {
      type: "LOGIN_SUCCESS",
      payload: loginData,
    }
};

export const keepLoginAction = ({ id, username, role, fullname }) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: { id, username, role, fullname }
    };
};

export const editAction = (editData) => {
    localStorage.setItem("userData", JSON.stringify(editData));
  
    return {
      type: "EDIT_SUCCESS",
      payload: editData
    }
};

export const logoutAction = () => {
    localStorage.removeItem("userData");
    return {
    type: "LOGOUT_SUCCESS",
    };
};