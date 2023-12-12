import { Outlet } from "react-router";
import { NavigationBar } from "./NavigationBar";

export const MainLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};