import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import routes from "./routesConfig";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} Component={route.element} />
        ))}
      </Routes>
      <Toaster position="bottom-left" richColors />
    </>
  );
}

export default App;
