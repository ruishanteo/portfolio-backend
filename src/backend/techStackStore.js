import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "./Firebase";
import { handleApiCall } from "./FirebaseHooks";

const techStackSlice = createSlice({
  name: "techstack",
  initialState: {
    techStack: [],
    tech: undefined,
  },
  reducers: {
    saveTechStackToStore: (state, action) => {
      state.techStack = action.payload;
      state.tech = undefined;
    },
    saveTechToStore: (state, action) => {
      state.tech = action.payload;
    },
  },
});

export async function fetchTechStack(dispatch, getState) {
  const response = await getDocs(collection(db, "techStack"));
  const techStack = response.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .sort((a, b) => a.name > b.name);
  dispatch(techStackSlice.actions.saveTechStackToStore(techStack));
}

export function createTech(tech) {
  return async (dispatch, getState) => {
    return await handleApiCall(
      setDoc(doc(db, "techStack", tech.name.toLowerCase()), {
        name: tech.name,
        iconImg: tech.iconImg,
        isInProfile: tech.isInProfile,
      })
    );
  };
}

export function readTech(id) {
  return async (dispatch, getState) => {
    const response = await getDoc(doc(db, "techStack", id));
    if (response.exists()) {
      dispatch(
        techStackSlice.actions.saveTechToStore({
          ...response.data(),
          id: response.id,
        })
      );
    } else {
      techStackSlice.actions.saveTechToStore(undefined);
    }
  };
}

export function editTech(tech, id) {
  return async (dispatch, getState) => {
    dispatch(deleteTech(id));
    dispatch(createTech(tech));
    dispatch(fetchTechStack);
  };
}

export function deleteTech(id) {
  return async (dispatch, getState) => {
    await handleApiCall(deleteDoc(doc(db, "techStack", id)));
    dispatch(fetchTechStack);
  };
}

export const techStackReducer = techStackSlice.reducer;
