import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerComponent from "../components/PlayerComponent";

export default function Players() {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  };

  const fetchApi = () => {
    fetch("http://jnt.wbgl.eu/api/players", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
    setDataLoaded(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchApi();
    }
  });

  const navigate = useNavigate();

  const renderPlayers = () => {
    let tempArr = [];
    for (let index = 0; index < data.length; index++) {
      const c = (
        <PlayerComponent
          key={index}
          playerId={data[index].id}
          playerPhoto={data[index].user_photo}
          playerName={data[index].username}
          playerTokens={data[index].betting_points}
        />
      );
      tempArr.push(c);
    }
    return tempArr;
  };

  return (
    <>
      <div
        className="absolute left-4 top-4 px-4 py-2 rounded-full bg-secondary cursor-pointer"
        onClick={() => navigate(-1)}
      >
        &#8592;
      </div>
      <div className="flex flex-wrap flex-row h-screen justify-evenly mx-auto">
        <div className="m-auto flex flex-row gap-8 flex-wrap container justify-center">
          {renderPlayers()}
        </div>
      </div>
    </>
  );
}
