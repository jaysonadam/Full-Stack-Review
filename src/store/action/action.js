export const loginAction = (loginData) => {
    localStorage.setItem("userData", JSON.stringify(loginData));
  
    return {
      type: "LOGIN_SUCCESS",
      payload: loginData,
    }
};

export const keepLoginAction = ({ id, username, role }) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: { id, username, role }
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