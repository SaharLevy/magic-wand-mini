import HomePage from "./pages/HomePage/HomePage";
import { Navigate } from "react-router-dom";
import SchemaCreationPage from "./pages/SchemaCreationPage/SchemaCreationPage";

interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

export const routesObj = {
  items: {
    path: "/",
    element: () => <HomePage />,
  },
  schemaCreation: {
    path: "/createSchema",
    element: () => <SchemaCreationPage />,
  },
  default: {
    path: "*",
    element: () => <Navigate to="/" replace />,
  },
} as const;

const routes = Object.values(routesObj) satisfies readonly RouteConfig[];

export default routes;
