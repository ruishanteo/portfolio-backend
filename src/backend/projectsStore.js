import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "./Firebase";
import { handleApiCall } from "./FirebaseHooks";

function convertTime(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  return `${day} ${month} ${year}`;
}

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    project: undefined,
  },
  reducers: {
    saveProjectsToStore: (state, action) => {
      state.projects = action.payload;
    },
    saveProjectToStore: (state, action) => {
      state.project = action.payload;
    },
    resetStore: (state) => {
      state.projects = [];
      state.project = undefined;
    },
  },
});

export async function fetchProjects(dispatch, getState) {
  const response = await getDocs(collection(db, "projects"));

  const projects = response.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      startDate: convertTime(data.startDate.toDate()),
      endDate: convertTime(data.endDate.toDate()),
    };
  });
  dispatch(projectsSlice.actions.saveProjectsToStore(projects));
}

export function createProject(project) {
  return async (dispatch, getState) => {
    return await handleApiCall(
      addDoc(collection(db, "projects"), {
        ...project,
      })
    );
  };
}

export function readProject(id) {
  return async (dispatch, getState) => {
    const response = await getDoc(doc(db, "projects", id));
    if (response.exists()) {
      const data = response.data();
      dispatch(
        projectsSlice.actions.saveProjectToStore({
          ...data,
          id: response.id,
          startDate: data.startDate.toDate().toString(),
          endDate: data.endDate.toDate().toString(),
        })
      );
    }
  };
}

export function clearStore(dispatch, getState) {
  dispatch(projectsSlice.actions.resetStore());
}

export function editProject(project, id) {
  return async (dispatch, getState) => {
    return await updateDoc(doc(db, "projects", id), {
      ...project,
    });
  };
}

export function deleteProject(projectId) {
  return async (dispatch, getState) => {
    return await handleApiCall(deleteDoc(doc(db, "projects", projectId)));
  };
}

export const projectsReducer = projectsSlice.reducer;
