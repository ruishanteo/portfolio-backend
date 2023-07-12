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

const experiencesSlice = createSlice({
  name: "experiences",
  initialState: {
    experiences: [],
    experience: undefined,
  },
  reducers: {
    saveExperiencesToStore: (state, action) => {
      state.experiences = action.payload;
      state.experience = undefined;
    },
    saveExperienceToStore: (state, action) => {
      state.experience = action.payload;
    },
    resetStore: (state) => {
      state.experiences = [];
      state.experience = undefined;
    },
  },
});

export function clearStore(dispatch, getState) {
  dispatch(experiencesSlice.actions.resetStore());
}

export async function fetchExperiences(dispatch, getState) {
  const response = await getDocs(collection(db, "experiences"));
  const experiences = response.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      startDate: convertTime(data.startDate.toDate()),
      endDate: convertTime(data.endDate.toDate()),
    };
  });
  dispatch(experiencesSlice.actions.saveExperiencesToStore(experiences));
}

export function createExperience(experience) {
  return async (dispatch, getState) => {
    return await handleApiCall(
      addDoc(collection(db, "experiences"), {
        ...experience,
      })
    );
  };
}

export function readExperience(id) {
  return async (dispatch, getState) => {
    const response = await getDoc(doc(db, "experiences", id));
    if (response.exists()) {
      const data = response.data();
      dispatch(
        experiencesSlice.actions.saveExperienceToStore({
          ...data,
          id: response.id,
          startDate: data.startDate.toDate().toString(),
          endDate: data.endDate.toDate().toString(),
        })
      );
    }
  };
}

export function editExperience(experience, id) {
  return async (dispatch, getState) => {
    await updateDoc(doc(db, "experiences", id), {
      ...experience,
    });
    dispatch(fetchExperiences);
  };
}

export function deleteExperience(id) {
  return async (dispatch, getState) => {
    await handleApiCall(deleteDoc(doc(db, "experiences", id)));
    dispatch(fetchExperiences);
  };
}

export const experiencesReducer = experiencesSlice.reducer;
