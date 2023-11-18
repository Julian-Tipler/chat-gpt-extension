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

// body (600px)
//    navigation bar (fixed height)
//    main content (take up remaining space)
//    
