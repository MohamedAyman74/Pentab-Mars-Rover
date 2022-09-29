import React from "react";
import "./ObstaclesList.css";

function ObstaclesList({ obstacles, handleDeleteObstacles }) {
  return (
    <>
      <ul>
        <li>
          {obstacles.map((obstacle, idx) => {
            const x = obstacle[0];
            const y = obstacle[1];
            return (
              <div key={`${x},${y}`}>
                x: {obstacle[0]}, y: {obstacle[1]}
                <button
                  onClick={() => handleDeleteObstacles(idx)}
                  className="Delete-Btn"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </li>
      </ul>
    </>
  );
}

export default ObstaclesList;
