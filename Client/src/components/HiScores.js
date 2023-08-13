import React, { useEffect, useState } from "react";

function HiScore({ name, score, index }) {
  return (
    <>
      <tr className="ms-5">
        <td>{index}</td>
        <td>{name}</td>
        <td>{score}</td>
      </tr>
    </>
  );
}

export default function HiScores() {
  const [hiscores, setHiscores] = useState([]);

  useEffect(() => {
    async function getHiscores() {
      const response = await fetch(`http://localhost:4000/hiscores/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const hiscores = await response.json();
      setHiscores(hiscores);
    }

    getHiscores();

    return;
  }, [hiscores.length]);

  function hiScores() {
    return hiscores.map((hiscore, index) => {
      return (
        <HiScore
          index={index + 1}
          name={hiscore.name}
          score={hiscore.hiscore}
        ></HiScore>
      );
    });
  }
  return (
    <div className="mt-3 mx-3">
      <h3 className="h3">Hiscores</h3>
      <div className="row">
        <div className="col-md-4">
          <table
            className="table table-striped table-hover"
            style={{ marginTop: 20 }}
          >
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Moves</th>
              </tr>
            </thead>
            <tbody>{hiScores()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
