import React from "react";
import { Navbar, NavItem } from "@first-apps/mf-components";

export const Navigation = () => {
  return (
    <Navbar row alignCenter>
      <NavItem to="/home">Home</NavItem>
      <NavItem>Movies</NavItem>
      <NavItem>Series</NavItem>
      <NavItem>Most Popular</NavItem>
    </Navbar>
  );
};
