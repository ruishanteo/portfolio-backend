import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { Provider as ReduxProvider } from "react-redux";
import { auth } from "./backend/Firebase.js";

import { Header } from "./components/Header.js";
import { Home } from "./pages/Home.js";
import { EditProject } from "./components/EditProject.js";
import { NewProject } from "./components/NewProject.js";

import Login from "./pages/Login";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { projectsReducer } from "./backend/projectsStore.js";

function App() {
  const [user, loading] = useAuthState(auth);

  const store = configureStore({ reducer: projectsReducer });
  let theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "Cambria"].join(","),
    },
    status: {
      danger: "#ebaaa7",
    },
    palette: {
      primary: {
        main: "#576b86",
        darker: "#053e85",
      },
      neutral: {
        main: "#576b86",
        contrastText: "#fff",
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
                    <Route path="/new" element={<NewProject />} />
                    <Route
                      path="/project/:projectId"
                      element={<EditProject />}
                    />
                    <Route path="/*" element={<Home />} />
                  </Routes>
                </>
              ) : (
                <>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
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
