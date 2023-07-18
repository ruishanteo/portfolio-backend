import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Timestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { ExperienceForm } from "./ExperienceForm";

import {
  clearStore,
  editExperience,
  readExperience,
} from "../../backend/experiencesStore";

export const EditExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const experienceId = params.experienceId;
  const [loading, setLoading] = useState(true);

  const experience = useSelector((state) => state.experiences.experience);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(readExperience(experienceId));
    setLoading(false);
  }, [dispatch, experienceId]);

  useEffect(() => {
    onUpdate();
    return () => {
      dispatch(clearStore);
    };
  }, [dispatch, onUpdate]);

  if (loading || !experience) {
    return <></>;
  }

  return (
    <ExperienceForm
      title="EDIT EXPERIENCE"
      onSubmit={(values, setSubmitting) => {
        dispatch(
          editExperience(
            {
              ...values,
              startDate: Timestamp.fromDate(new Date(values.startDate)),
              endDate: Timestamp.fromDate(new Date(values.endDate)),
            },
            experienceId
          )
        );
        setSubmitting(false);
        navigate("/experiences");
      }}
      initialValues={{
        ...experience,
        startDate: dayjs(new Date(experience.startDate)),
        endDate: dayjs(new Date(experience.endDate)),
      }}
    />
  );
};
