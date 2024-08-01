const SET_ACCOUNTS = 'data/setAccounts';
const REMOVE_ACCOUNTS = 'data/removeAccounts';

const setAccounts = (accounts) => ({
    type: SET_ACCOUNTS,
    payload: accounts
});

export const removeAccounts = () => ({
    type: REMOVE_ACCOUNTS
});

export const thunkGetAccount = () => async (dispatch) => {
    const response = await fetch("/api/account");
    if (response.ok) {
        const data = await response.json();
        dispatch(setAccounts(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const thunkUpdateAccount = (data) => async (dispatch) => {
    const response = await fetch("/api/account", {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        body: data
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetAccount());
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { data: null };

function accountsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCOUNTS: {
            const newState = structuredClone(state);
            newState.data = structuredClone(action.payload);
            return newState;
        }
        case REMOVE_ACCOUNTS: {
            return { data: null };
        }
        default:
            return state;
    }
}

export default accountsReducer;
