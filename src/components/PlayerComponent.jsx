import { useState } from "react";

export default function PlayerComponent(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [numCount, setNumCount] = useState(0);

  function handleIncrement() {
    let fD = new FormData();

    fD.append("userId", props.playerId);
    fD.append("tokenAmount", numCount);

    const requestOptions = {
      method: "POST",
      body: fD,
    };

    fetch(
      "http://jnt.wbgl.eu/api/control-panel/war-token/increment",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setIsClicked(false);
          setNumCount(0);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDecrement() {
    let fD = new FormData();

    fD.append("userId", props.playerId);
    fD.append("tokenAmount", numCount);

    const requestOptions = {
      method: "POST",
      body: fD,
    };

    fetch(
      "http://jnt.wbgl.eu/api/control-panel/war-token/decrement",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setIsClicked(false);
          setNumCount(0);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const toggleClick = () => setIsClicked((isClicked) => !isClicked);

  return (
    <div className="w-2/5 rounded overflow-hidden shadow-lg bg-secondary p-2 relative">
      <div
        className={`${
          isClicked ? "opacity-100 visible" : "opacity-0 invisible"
        } absolute transition-all transform duration-500 left-0 flex flex-col justify-center gap-x-2 right-0 ml-auto mr-auto text-center top-[40%]`}
      >
        <input
          type="text"
          value={numCount}
          onChange={() => setNumCount(event.target.value)}
          className="mb-2 max-w-[50px] outline-none text-xs text-black px-2 py-1 mx-auto"
        />
        <div className="flex flex-row justify-center">
          <span
            className="bg-white rounded-full text-black px-2 z-10"
            onClick={() => handleIncrement()}
          >
            +
          </span>
          <span
            className="bg-white rounded-full text-black px-2 z-10"
            onClick={() => handleDecrement()}
          >
            -
          </span>
        </div>
      </div>
      <img
        src={`http://jnt.wbgl.eu/api/${props.playerPhoto}`}
        className={`w-full object-cover h-[200px]`}
        onClick={() => toggleClick()}
      />
      <span className="text-sm" onClick={() => toggleClick()}>
        {props.playerName} / {props.playerTokens}
      </span>
    </div>
  );
}
