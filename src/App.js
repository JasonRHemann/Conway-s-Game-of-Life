import React from "react";
import Grid from "./Components/Grid";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #33caff;
  height: 100vh;
`;

const ContainerRules = styled.div`
  display: flex;
  flex-direction: row;
`;
const Header = styled.h1`
  font-size: 40px;
`;

const Rules = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin-left: 30px;
`;

function App() {
  return (
    <Layout>
      <Header>Game of Life</Header>
      <ContainerRules>
        <Layout>
          <Grid></Grid>
        </Layout>
        <Rules>
          <h2>Rules</h2>
          <ol>
            <li>
              {" "}
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.{" "}
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.{" "}
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction
            </li>
          </ol>
        </Rules>
      </ContainerRules>
    </Layout>
  );
}

export default App;
