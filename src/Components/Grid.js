import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: #33ff86;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  border; 2px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
`;

const Button = styled.button`
  color: black;
  margin-top: 10px;
  width: 8vw;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bolder;
  background-color: #add8e6;
`;

const Counters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

var _ = require("lodash");

//setting list of operations to every neighbor
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function Grid() {
  //setting variables and state.
  const [running, setrunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const [generation, setGeneration] = useState(0);
  const timeRef = useRef(200);
  const [sum, setSum] = useState(0);
  const numRows = 35;
  const numCols = 80;
  const colors = ["#427BFF", "#7044FF", "#FFDB2C", "#FFB92C"];
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  //creating grid and setting to all zeros
  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    console.log(rows);
    return rows;
  }

  const [grid, setGrid] = useState(initialState);

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      let validGrid = false;
      validGrid = false;
      // creat copy of grid
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //checking to see if out of bounds.
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            //counting number of neighbors
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              validGrid = true;
              gridCopy[i][k] = 1;
            }
          }
        }
        // counting generation
        if (validGrid) {
          setGeneration((num) => num + 1);
        }
        //counting number of alive cells
        setSum(
          gridCopy.flat().reduce((acc, cv) => {
            return acc + cv;
          })
        );
      });
    });
    setTimeout(runSim, timeRef.current);
  }, [timeRef.current]);
  console.log(timeRef.current);
  return (
    <MainContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            setrunning(!running);
            if (!running) {
              runningRef.current = true;
              runSim();
            }
          }}
        >
          {!runningRef.current ? "Start" : "Stop"}
        </Button>

        {/* set grid with random live cells */}
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Random
        </Button>

        {/* reset all values to initial state to clear */}
        <Button
          onClick={() => {
            setGrid(initialState);
            setGeneration(0);
            setSum(0);
          }}
        >
          Clear
        </Button>

        <Button
          onClick={() => {
            timeRef.current = 2;
          }}
        >
          Fast
        </Button>
        <Button
          onClick={() => {
            timeRef.current = 200;
          }}
        >
          Normal
        </Button>
        <Button
          onClick={() => {
            timeRef.current = 400;
          }}
        >
          Slow
        </Button>
      </ButtonContainer>
      <Counters>
        <h2> Generation: {generation}</h2>
        <h2> Cells: {sum}</h2>
      </Counters>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},15px)`,
        }}
      >
        {/* drawing grid */}
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                //using immer to make a copy and utilize double buffer
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 14,
                height: 15,
                //changing background depending on amount of cells
                backgroundColor:
                  grid[i][k] && sum > 200
                    ? _.sample(colors)
                    : grid[i][k] && sum > 100
                    ? "#4666FF"
                    : grid[i][k] && sum >= 0
                    ? "#FE000D"
                    : undefined,
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
    </MainContainer>
  );
}
export default Grid;
