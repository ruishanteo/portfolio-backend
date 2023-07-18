import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Timestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { ProjectForm } from "./ProjectForm";

import {
  clearStore,
  editProject,
  readProject,
} from "../../backend/projectsStore";

export const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;
  const [loading, setLoading] = useState(true);

  const project = useSelector((state) => state.projects.project);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(readProject(projectId));
    setLoading(false);
  }, [dispatch, projectId]);

  useEffect(() => {
    onUpdate();
    return () => {
      dispatch(clearStore);
    };
  }, [dispatch, onUpdate]);

  if (loading || !project) {
    return <></>;
  }

  return (
    <ProjectForm
      title="EDIT PROJECT"
      onSubmit={(values, setSubmitting) => {
        dispatch(
          editProject(
            {
              ...values,
              startDate: Timestamp.fromDate(new Date(values.startDate)),
              endDate: Timestamp.fromDate(new Date(values.endDate)),
            },
            projectId
          )
        );
        setSubmitting(false);
        navigate("/projects");
      }}
      initialValues={{
        ...project,
        startDate: dayjs(new Date(project.startDate)),
        endDate: dayjs(new Date(project.endDate)),
      }}
    />
  );
};
