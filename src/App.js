import React from "react";
import Grid from "./Components/Grid";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Layout>
      <h1>Game of Life</h1>
      <Layout>
        <Grid></Grid>
      </Layout>
    </Layout>
  );
}

export default App;
