import MatchComponent from "../components/MatchComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Matches() {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  };

  const fetchApi = () => {
    fetch("http://jnt.wbgl.eu/api/matches", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
    setDataLoaded(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchApi();
    }
  });

  const renderMatches = () => {
    let tempArr = [];
    for (let index = 0; index < data.length; index++) {
      const c = (
        <MatchComponent
          matchId={data[index].id}
          matchData={data[index]}
          key={index}
        />
      );
      tempArr.push(c);
    }
    return tempArr;
  };

  const navigate = useNavigate();
  return (
    <>
      <div
        className="absolute left-4 top-4 px-4 py-2 rounded-full bg-secondary cursor-pointer"
        onClick={() => navigate(-1)}
      >
        &#8592;
      </div>
      <div className="flex gap-y-4 mt-10 flex-col justify-center items-center">
        {renderMatches()}
      </div>
    </>
  );
}
