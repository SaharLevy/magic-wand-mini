import { Route, Routes } from "react-router-dom";
import routes from "./routesConfig";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} Component={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
