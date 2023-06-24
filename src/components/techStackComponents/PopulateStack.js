import { useDispatch } from "react-redux";

import { createTech } from "../../backend/techStackStore";

const normalProfileStack = [
  "Git",
  "Github",
  "Java",
  "JavaScript",
  "MaterialUI",
  "MySQL",
  "Redux",
  "React",
  "Node.js",
  "Postgresql",
  "Python",
  "Typescript",
  "VSCode",
];
const normalNonProfileStack = [
  "AngularJS",
  "Bash",
  "Flutter",
  "Gitlab",
  "Go",
  "Next.js",
];

const exceptionProfileStack = ["Firebase"];
const exceptionNonProfileStack = [];

export const PopulateStack = () => {
  const dispatch = useDispatch();

  normalProfileStack.forEach((tech) => {
    dispatch(
      createTech({
        name: tech,
        iconImg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`,
        isInProfile: true,
      })
    );
  });
  normalNonProfileStack.forEach((tech) => {
    dispatch(
      createTech({
        name: tech,
        iconImg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`,
        isInProfile: false,
      })
    );
  });

  exceptionProfileStack.forEach((tech) => {
    dispatch(
      createTech({
        name: tech,
        iconImg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-plain.svg`,
        isInProfile: true,
      })
    );
  });
  exceptionNonProfileStack.forEach((tech) => {
    dispatch(
      createTech({
        name: tech,
        iconImg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-plain.svg`,
        isInProfile: false,
      })
    );
  });
};
