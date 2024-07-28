const SET_DASH = 'dash/setDash';
const REMOVE_DASH = 'dash/removeDash';

const setDash = (dash) => ({
    type: SET_DASH,
    payload: dash
});

export const removeDash = () => ({
    type: REMOVE_DASH
});

export const thunkGetDash = () => async (dispatch) => {
    const response = await fetch("/api/dash");
    if (response.ok) {
        const data = await response.json();
        dispatch(setDash(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { dash: null };

function dashReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DASH: {
            const newState = structuredClone(state);
            newState.dash = structuredClone(action.payload)
            return newState;
        }
        case REMOVE_DASH: {
            const newState = structuredClone(state);
            newState.dash = null
            return newState;
        }
        default:
            return state;
    }
}

export default dashReducer;
