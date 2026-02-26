import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import routes, { routesObj } from "./routesConfig";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} Component={route.element} />
        ))}
        <Route
          path="*"
          element={<Navigate to={routesObj.items.path} replace={true} />}
        />
      </Routes>
    </>
  );
}

export default App;
