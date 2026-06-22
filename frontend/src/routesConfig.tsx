import HomePage from "./pages/HomePage/HomePage";
import { Navigate } from "react-router-dom";
import SchemaEditPage from "./pages/SchemaEditPage/SchemaEditPage";
import InstanceEditPage from "./pages/InstanceEditPage/InstanceEditPage";
import InstanceViewPage from "./pages/InstanceViewPage/InstanceViewPage";

interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

export const routesObj = {
  items: {
    path: "/",
    element: () => <HomePage />,
  },
  schemaEdit: {
    path: "/schemas/:schemaId",
    element: () => <SchemaEditPage />,
  },
  instanceEdit: {
    path: "/instances/:instanceId",
    element: () => <InstanceEditPage />,
  },
  instanceView: {
    path: "/instances/:instanceId/view",
    element: () => <InstanceViewPage />,
  },
  default: {
    path: "*",
    element: () => <Navigate to="/" replace />,
  },
} as const;

const routes = Object.values(routesObj) satisfies readonly RouteConfig[];

export default routes;
