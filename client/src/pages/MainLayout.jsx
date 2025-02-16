import React from "react";
import { Outlet } from "react-router-dom";

//Components:-
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
