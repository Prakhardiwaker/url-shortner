import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routTree";
import AuthPage from "../pages/AuthPage";

export const AuthPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});
