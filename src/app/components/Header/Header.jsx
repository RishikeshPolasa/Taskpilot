import React from "react";
import { HeaderWrapper, ProjectName } from "./Style";

function Header() {
  const projectName = "WSI Tracker";
  return (
    <HeaderWrapper>
      <ProjectName>{projectName}</ProjectName>
    </HeaderWrapper>
  );
}

export default Header;
