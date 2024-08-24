import React from "react";
import Header from "../Header/Header";
import { MainUiWrapper } from "./style";
import Board from "../Board/Board";

function MainUi() {
  return (
    <div>
      <Header />
      <MainUiWrapper>
        <Board />
      </MainUiWrapper>
    </div>
  );
}

export default MainUi;
