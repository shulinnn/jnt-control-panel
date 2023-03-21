import { useEffect, useState } from "react";

export default function MatchComponent(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [kurzTeamA, setKurzTeamA] = useState(0);
  const [kurzTeamB, setKurzTeamB] = useState(0);
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);

  function renderTeam(teamId) {
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <img
          src={
            new URL(
              `../assets/${props.matchData.teams[teamId].team_logo}`,
              import.meta.url
            ).href
          }
          width={50}
        />
        <span>{props.matchData.teams[teamId].team_name}</span>
      </div>
    );
  }

  useEffect(() => {
    setScoreTeamA(props.matchData.scores[0]);
    setScoreTeamB(props.matchData.scores[1]);
    setKurzTeamA(props.matchData.exchange_rates[0]);
    setKurzTeamB(props.matchData.exchange_rates[1]);
  }, []);

  const handleSubmit = () => {
    let fD = new FormData();
    fD.append("scoreTeamA", scoreTeamA);
    fD.append("scoreTeamB", scoreTeamB);
    fD.append("kurzTeamA", kurzTeamA);
    fD.append("kurzTeamB", kurzTeamB);
    fD.append("matchId", props.matchData.id);

    fetch("http://jnt.wbgl.eu/api/controls-panel/match/", {
      method: "POST",
      body: fD,
    })
      .then((response) => {
        console.log(response.json());
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={`w-4/5 rounded overflow-hidden shadow-lg border-2 border-secondary bg-secondary transition-all duration-300 p-4 relative cursor-pointer ${
          isClicked ? "border-green-400" : "border-secondary"
        }`}
        onClick={() => setIsClicked((isClicked) => !isClicked)}
      >
        <div className="flex flex-row justify-between items-center gap-x-8">
          {renderTeam(0)}
          <div className="w-1/3 h-full flex-row gap-x-4 items-center flex justify-center relative">
            <span>{props.matchData.scores[0]}</span>
            <span className={`text-2xl shadow-lg transition-all duration-500`}>
              VS
            </span>
            <span>{props.matchData.scores[1]}</span>
          </div>
          {renderTeam(1)}
        </div>
      </div>
      <div
        className={`flex-col bg-secondary overflow-hidden flex justify-between p-4 gap-y-4 gap-x-4 w-4/5 transition-all duration-300 ${
          isClicked ? "opacity-100 max-h-96" : "opacity-0 hidden max-h-0"
        }`}
      >
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-y-2">
            <label>Skóre Team 1</label>
            <input
              type="text"
              value={scoreTeamA}
              onChange={() => setScoreTeamA(event.target.value)}
              placeholder="score team A"
              className="bg-primary p-4 border-2 border-transparent duration-500 ease-in transition-colors focus:outline-none focus:border-2 focus:border-green-400"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label>Kurz Team 1</label>
            <input
              type="text"
              value={kurzTeamA}
              onChange={() => setKurzTeamA(event.target.value)}
              placeholder="kurz team A"
              className="bg-primary p-4 border-2 border-transparent duration-500 ease-in transition-colors focus:outline-none focus:border-2 focus:border-green-400"
            />
          </div>
        </div>
        <div
          className="bg-primary px-8 py-4 cursor-pointer flex justify-center border border-black"
          onClick={() => handleSubmit()}
        >
          Odeslat
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-y-2">
            <label>Skóre Team 2</label>
            <input
              type="text"
              value={scoreTeamB}
              onChange={() => setScoreTeamB(event.target.value)}
              placeholder="score team B"
              className="bg-primary p-4 border-2 border-transparent duration-500 ease-in transition-colors focus:outline-none focus:border-2 focus:border-green-400"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Kurz Team 2</label>
            <input
              type="text"
              value={kurzTeamB}
              onChange={() => setKurzTeamB(event.target.value)}
              placeholder="kurz team B"
              className="bg-primary p-4 border-2 border-transparent duration-500 ease-in transition-colors focus:outline-none focus:border-2 focus:border-green-400"
            />
          </div>
        </div>
      </div>
    </>
  );
}
