import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Timestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { ExperienceForm } from "./ExperienceForm";

import { createExperience } from "../../backend/experiencesStore";

export const NewExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ExperienceForm
      title="NEW EXPERIENCE"
      onSubmit={(values, setSubmitting) => {
        dispatch(
          createExperience({
            ...values,
            startDate: Timestamp.fromDate(new Date(values.startDate)),
            endDate: Timestamp.fromDate(new Date(values.endDate)),
          })
        );
        setSubmitting(false);
        navigate("/experiences");
      }}
      initialValues={{
        title: "",
        description: "",
        startDate: "",
        endDate: dayjs(),
      }}
    />
  );
};
