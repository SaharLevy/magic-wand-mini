import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import routes, { routesObj } from "./routesConfig";
import PageWrapper from "./shared/components/PageWrapper/PageWrapper";

function App() {
  return (
    <>
      <PageWrapper>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.element}
            />
          ))}
          <Route
            path="*"
            element={<Navigate to={routesObj.items.path} replace={true} />}
          />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
