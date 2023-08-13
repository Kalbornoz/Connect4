import { useNavigate } from "react-router";
import { useState } from "react";
import "../App.css";

export default function MyForm({ gameIsOver, moves }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const newRecord = { name: name, hiscore: moves };
    await fetch("http://localhost:4000/hiscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setName("");
    navigate("/hiscores");
  }

  if (gameIsOver) {
    return (
      <form onSubmit={onSubmit}>
        <div className="row mt-5 ms-3">
          <div className="col-md-5">
            <h1 className="border-bottom">
              Enter in your name to be added to the Hiscores!
            </h1>
          </div>
        </div>
        <div className="row mt-2 ms-3">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 ms-3">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="score">Score</label>
              <input
                type="text"
                className="form-control"
                id="score"
                value={moves}
                readOnly={true}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 ms-3">
          <div className="col-md-3">
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
