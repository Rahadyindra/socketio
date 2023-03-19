import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:4000");

function App() {
  const [drawing, setDrawing] = useState([]);

  useEffect(() => {
    socket.on("drawing", (data) => {
      setDrawing((prevDrawing) => [...prevDrawing, data]);
    });
  }, []);

  const handleMouseMove = (event) => {
    if (!socket) {
      return;
    }
    const coordinates = [event.clientX, event.clientY];
    socket.emit("drawing", coordinates);
    setDrawing((prevDrawing) => [...prevDrawing, coordinates]);
  };

  return (
    <div>
      <div onMouseMove={handleMouseMove}>
        <svg width="10000" className="shadow-xl" height="500">
          {drawing.map((coordinates, index) => (
            <circle key={index} cx={coordinates[0]} cy={coordinates[1]} r="5" />
          ))}
        </svg>
      </div>
      <div>
        <button
          onClick={() => {
            setDrawing([]);
          }}
          className="mt-10 ml-20 px-2 py-1 shadow-md bg-gray-300 hover:bg-gray-400 rounded font-medium text-lg"
        >
          Clear Drawing
        </button>
      </div>
    </div>
  );
}

export default App;
