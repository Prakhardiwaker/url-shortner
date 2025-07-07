import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routTree";
import DashBoardPage from "../pages/DashBoardPage";
import { checkAuth } from "../utils/helper.js";

export const DashBoardPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoardPage,
  beforeLoad: checkAuth,
});
