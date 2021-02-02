import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import img from "./landingImg.png";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function useImageZoom(maxZoomLevel = 5) {
  const minZoomLevel = 1;

  const [zoomLevel, setZoomLevel] = React.useState(minZoomLevel);
  const [rotate, setRotate] = React.useState(false);

  function zoomIn() {
    setRotate(false);
    setZoomLevel((zoomLevel) =>
      zoomLevel < maxZoomLevel ? zoomLevel + 1 : zoomLevel
    );
  }

  function zoomOut() {
    setRotate(false);
    setZoomLevel((zoomLevel) =>
      zoomLevel > minZoomLevel ? zoomLevel - 1 : minZoomLevel
    );
  }

  function resetZoom() {
    setRotate(false);
    setZoomLevel(minZoomLevel);
  }

  function rotation() {
    setRotate(true);
  }

  const zoomStyles = {
    transform: rotate ? `rotate(90deg)` : `scale(${zoomLevel})`,
  };

  const handlers = {
    zoomIn,
    zoomOut,
    rotation,
    resetZoom,
  };

  return [zoomStyles, handlers];
}

function App() {
  const [zoomStyles, handlers] = useImageZoom();
  const inputRef = useRef(null);
  const [text, setText] = useState("SUNNY");
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div
            className="col"
            style={{ textAlign: "center", borderRight: "1px solid lightgrey" }}
          >
            <div className="">
              <img
                style={{ ...zoomStyles }}
                onClick={handlers.resetZoom}
                src={img}
              />
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  disabled={disabled}
                  style={{
                    background: disabled ? "transparent" : "white",
                    border: "none",
                    textAlign: "center",
                    fontSize: "20px",
                    color: disabled ? "white" : "black",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col" style={{ textAlign: "left" }}>
            <button
              onClick={handlers.zoomIn}
              style={{
                width: "100px",
                height: "50px",
                margin: "10px 10px 10px 10px",
              }}
              className="btn btn-primary"
            >
              ZOOM IN
            </button>
            <br />
            <button
              onClick={handlers.zoomOut}
              style={{
                width: "100px",
                height: "50px",
                margin: "10px 10px 10px 10px",
              }}
              className="btn btn-primary"
            >
              ZOOM OUT
            </button>
            <br />
            <button
              onClick={() => setDisabled(!disabled)}
              style={{
                width: "100px",
                height: "50px",
                margin: "10px 10px 10px 10px",
              }}
              className="btn btn-primary"
            >
              NEW TEXT BLOCK
            </button>
            <br />
            <button
              onClick={handlers.rotation}
              style={{
                width: "100px",
                height: "50px",
                margin: "10px 10px 10px 10px",
              }}
              className="btn btn-primary"
            >
              ROTATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
