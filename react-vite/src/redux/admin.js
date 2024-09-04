const SET_ADMIN = 'admin/setAdmin';
const REMOVE_ADMIN = 'admin/removeAdmin';

const setAdmin = (adminData) => ({
    type: SET_ADMIN,
    payload: adminData
});

export const removeAdmin = () => ({
    type: REMOVE_ADMIN
});

export const thunkGetAdmin = () => async (dispatch) => {
    const response = await fetch("/api/admin");
    if (response.ok) {
        const data = await response.json();
        dispatch(setAdmin(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const thunkAddCourse = (studentId, courseId) => async (dispatch) => {
    const response = await fetch(`/api/students/${studentId}/courses/${courseId}`, {
        method: "POST",
        header: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAdmin());
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkRemoveCourse = (studentId, courseId) => async (dispatch) => {
    const response = await fetch(`/api/students/${studentId}/courses/${courseId}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAdmin());
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { data: null };

function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN: {
            const newState = structuredClone(state);
            newState.data = structuredClone(action.payload);
            return newState;
        }
        case REMOVE_ADMIN: {
            return { data: null };
        }
        default:
            return state;
    }
}

export default adminReducer;
