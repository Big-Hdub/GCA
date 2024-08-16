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

export const thunkCreateCourse = (courseData) => async (dispatch) => {
    const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
    });
    if (response.ok) {
        dispatch(thunkGetCourses());
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeCourses())
        return { message: "Deleted Successfully" }
    }
    else return { error: "Unable to delete course" };
}

export const thunkEditCourse = (courseId, courseData) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
    });
    if (response.ok) {
        dispatch(thunkGetCourseById(courseId));
    }
    else return { error: "Unable to edit course" };
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
