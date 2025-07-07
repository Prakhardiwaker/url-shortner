import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routTree";
import HomePage from "../pages/HomePage";

export const HomePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
