import { thunkGetCourseById } from "./course";
import { thunkGetGrade } from "./grade";
import { thunkGetDash } from "./dash";

const SET_LESSONS = 'lessons/setLessons';
const REMOVE_LESSONS = 'lessons/removeLessons';

const setLessons = (lessons) => ({
    type: SET_LESSONS,
    payload: lessons
});

export const removeLessons = () => ({
    type: REMOVE_LESSONS
});

export const thunkCompleteLesson = (lessonId, child = undefined) => async (dispatch) => {
    let response;
    if (child) {
        response = await fetch(`/api/lessons/${lessonId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                complete: true,
                child
            })
        });
    } else {
        response = await fetch(`/api/lessons/${lessonId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ complete: true })
        });
    }
    if (response.ok) {
        const data = await response.json();
        dispatch(setLessons(data));
        dispatch(thunkGetGrade());
        dispatch(thunkGetDash());
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
        if (data.course) dispatch(thunkGetCourseById(data.course));
        else if (data.children[0][0]) dispatch(thunkGetCourseById(data.children[0][0]?.course));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const thunkCreateLesson = (courseId, lessonData) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetLessonById(data.id));
        dispatch(thunkGetDash());
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteLesson = (lessonId) => async (dispatch) => {
    const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeLessons())
        return { message: "Deleted Successfully" }
    }
    else return { error: "Unable to delete lesson" };
}

export const thunkEditLesson = (lessonId, lessonData) => async (dispatch) => {
    const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData)
    });
    if (response.ok) {
        dispatch(thunkGetCourseById(lessonId));
    }
    else return { error: "Unable to edit lesson" };
}

export const thunkAssignLesson = (lessonId, studentId) => async (dispatch) => {
    const response = await fetch(`/api/lessons/${lessonId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: studentId })
    });
    if (response.ok) {
        dispatch(thunkGetDash());
        const data = await response.json();
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
