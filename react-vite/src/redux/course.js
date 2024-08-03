const SET_COURSES = 'courses/setCourses';
const REMOVE_COURSES = 'courses/removeCourses';

const setCourses = (courses) => ({
    type: SET_COURSES,
    payload: courses
});

export const removeCourses = () => ({
    type: REMOVE_COURSES
});

export const thunkGetCourses = () => async (dispatch) => {
    const response = await fetch("/api/courses");
    if (response.ok) {
        const data = await response.json();
        dispatch(setCourses(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const thunkGetCourseById = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCourses(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

const initialState = { courses: null };

function coursesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COURSES: {
            const newState = structuredClone(state);
            newState.courses = structuredClone(action.payload);
            return newState;
        }
        case REMOVE_COURSES: {
            return { courses: null };
        }
        default:
            return state;
    }
}

export default coursesReducer;
