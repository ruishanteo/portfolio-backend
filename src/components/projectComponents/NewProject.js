import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Timestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { ProjectForm } from "./ProjectForm";

import { createProject } from "../../backend/projectsStore";

export const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ProjectForm
      title="NEW PROJECT"
      onSubmit={(values, setSubmitting) => {
        dispatch(
          createProject({
            ...values,
            startDate: Timestamp.fromDate(new Date(values.startDate)),
            endDate: Timestamp.fromDate(new Date(values.endDate)),
          })
        );
        setSubmitting(false);
        navigate("/projects");
      }}
      initialValues={{
        thumbnailImg: "",
        fullSizedImg: "",
        title: "",
        description: "",
        startDate: "",
        endDate: dayjs(),
        techStack: [],
        links: [],
      }}
    />
  );
};
