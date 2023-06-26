import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { TechStackForm } from "./TechStackForm";

import { createTech } from "../../backend/techStackStore";

export const NewTech = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <TechStackForm
      title="NEW TECH"
      onSubmit={(values, setSubmitting) => {
        dispatch(createTech(values));
        setSubmitting(false);
        navigate("/techstack");
      }}
      initialValues={{
        name: "",
        iconImg: "",
        isInProfile: false,
      }}
    />
  );
};
