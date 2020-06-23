import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

// Set the number of rows and columns.  Make this adjustable later
const numRows = 25;
const numCols = 25;

const Grid = () => {
  // Creating a grid and grid state and looping over it setting all initial values to 0
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (var i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  // Simulation function
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <div>
      <button onClick={() => setRunning(!running)}>
        {/* Togfgle start and stop */}
        {running ? "Stop" : "Start"}
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              //Make grid clickable
              onClick={() => {
                //Setting grid to new copy so that it is mutable
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              //Setting width, height, and background color.  Make this editable later
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
