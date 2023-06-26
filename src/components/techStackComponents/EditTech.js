import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TechStackForm } from "./TechStackForm";

import { editTech, readTech } from "../../backend/techStackStore";

export const EditTech = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const techId = params.techId;
  const [loading, setLoading] = useState(true);

  const tech = useSelector((state) => state.techstack.tech);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(readTech(techId));
    setLoading(false);
  }, [dispatch, techId]);

  useEffect(() => {
    onUpdate();
  }, [onUpdate]);

  if (loading || !tech) {
    return <></>;
  }

  return (
    <TechStackForm
      title="EDIT TECH"
      onSubmit={(values, setSubmitting) => {
        dispatch(editTech(values, techId));
        setSubmitting(false);
        navigate("/techstack");
      }}
      initialValues={tech}
    />
  );
};
