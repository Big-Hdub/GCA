import { thunkGetCourseById } from "./course";

const SET_LESSONS = 'lessons/setLessons';
const REMOVE_LESSONS = 'lessons/removeLessons';

const setLessons = (lessons) => ({
    type: SET_LESSONS,
    payload: lessons
});

export const removeLessons = () => ({
    type: REMOVE_LESSONS
});

export const thunkCompleteLesson = (lessonId) => async (dispatch) => {
    const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setLessons(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const thunkGetLessonById = (lessonId) => async (dispatch) => {
    const response = await fetch(`/api/lessons/${lessonId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setLessons(data));
        dispatch(thunkGetCourseById(data.course))
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

const initialState = { lessons: null };

function lessonsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LESSONS: {
            const newState = structuredClone(state);
            newState.lessons = structuredClone(action.payload);
            return newState;
        }
        case REMOVE_LESSONS: {
            return { lessons: null };
        }
        default:
            return state;
    }
}

export default lessonsReducer;
