import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { Provider as ReduxProvider } from "react-redux";
import { auth } from "./backend/Firebase.js";

import { Header } from "./components/Header.js";
import { Home } from "./pages/Home.js";

import { Projects } from "./pages/Projects.js";
import { EditProject } from "./components/projectComponents/EditProject.js";
import { NewProject } from "./components/projectComponents/NewProject.js";

import { Experiences } from "./pages/Experiences.js";
import { EditExperience } from "./components/experienceComponents/EditExperience.js";
import { NewExperience } from "./components/experienceComponents/NewExperience.js";

import { TechStack } from "./pages/TechStack.js";
import { NewTech } from "./components/techStackComponents/NewTech.js";
import { EditTech } from "./components/techStackComponents/EditTech.js";

import Login from "./pages/Login";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { experiencesReducer } from "./backend/experiencesStore.js";
import { projectsReducer } from "./backend/projectsStore.js";
import { techStackReducer } from "./backend/techStackStore.js";

function App() {
  const [user, loading] = useAuthState(auth);

  const store = configureStore({
    reducer: {
      experiences: experiencesReducer,
      projects: projectsReducer,
      techstack: techStackReducer,
    },
  });
  let theme = createTheme({
    typography: {
      fontFamily: ["Roboto"].join(","),
    },
    palette: {
      primary: {
        main: "#cbe0fb",
        dark: "#053e85",
      },
      secondary: {
        main: "#968a79",
        dark: "#fbe6cb",
      },
    },
  });

  if (loading) return;

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <ReduxProvider store={store}>
            <Router>
              {user ? (
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                      exact
                      path="/experiences/new"
                      element={<NewExperience />}
                    />
                    <Route
                      exact
                      path="/experiences/:experienceId"
                      element={<EditExperience />}
                    />
                    <Route
                      exact
                      path="/experiences"
                      element={<Experiences />}
                    />

                    <Route
                      exact
                      path="/projects/new"
                      element={<NewProject />}
                    />
                    <Route
                      exact
                      path="/projects/:projectId"
                      element={<EditProject />}
                    />
                    <Route exact path="/projects" element={<Projects />} />

                    <Route exact path="/techstack/new" element={<NewTech />} />
                    <Route
                      exact
                      path="/techstack/:techId"
                      element={<EditTech />}
                    />
                    <Route exact path="/techstack" element={<TechStack />} />

                    <Route path="/*" element={<Home />} />
                  </Routes>
                </>
              ) : (
                <>
                  <Routes>
                    <Route path="/*" element={<Login />} />
                  </Routes>
                </>
              )}
            </Router>
          </ReduxProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
