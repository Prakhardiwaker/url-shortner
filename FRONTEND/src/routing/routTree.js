import { createRootRoute } from "@tanstack/react-router";
import { HomePageRoute } from "./homepage";
import { AuthPageRoute } from "./auth.route";
import { DashBoardPageRoute } from "./dashboard";
import RootLayout from "../RootLayout";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  HomePageRoute,
  AuthPageRoute,
  DashBoardPageRoute,
]);
