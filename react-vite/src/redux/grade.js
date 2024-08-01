const SET_GRADES = 'grades/setGrades';
const REMOVE_GRADES = 'grades/removeGrades';

const setGrades = (grades) => ({
    type: SET_GRADES,
    payload: grades
});

export const removeGrades = () => ({
    type: REMOVE_GRADES
});

export const thunkGetGrade = () => async (dispatch) => {
    const response = await fetch("/api/grades");
    if (response.ok) {
        const data = await response.json();
        dispatch(setGrades(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

// export const thunkUpdateGrade = (data) => async (dispatch) => {
//     const response = await fetch("/api/grade", {
//         method: "PUT",
//         header: { "Content-Type": "application/json" },
//         body: data
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(thunkGetGrade());
//         return data;
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//     } else {
//         return { server: "Something went wrong. Please try again" }
//     }
// }

const initialState = { data: null };

function gradesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GRADES: {
            const newState = structuredClone(state);
            newState.data = structuredClone(action.payload);
            return newState;
        }
        case REMOVE_GRADES: {
            return { data: null };
        }
        default:
            return state;
    }
}

export default gradesReducer;
