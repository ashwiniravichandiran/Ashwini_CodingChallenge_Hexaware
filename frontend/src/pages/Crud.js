import { useState, useEffect } from "react";
import {getPlayers,addPlayer,updatePlayer,deletePlayer, getPlayerById} from '../api.js';

function Crud() {
  const [players, setPlayers] = useState([]);
  const [view, setView] = useState("list");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [formData, setFormData] = useState({
    playerId: "",
    playerName: "",
    jerseyNumber: "",
    role: "",
    totalMatches: "",
    teamName: "",
    country: "",
    description: ""
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = () => {
    getPlayers()
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const searchPlayer = () => {
  if (!searchId) {
    fetchPlayers();
    return;
  }

  getPlayerById(searchId)
    .then((res) => {
      setPlayers([res.data]); 
    })
    .catch(() => {
      alert("Player not found");
    });
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.playerName || !formData.role) {
      alert("Player Name & Role required");
      return;
    }

    if (editingPlayer) {
      updatePlayer(editingPlayer.playerId, formData)
        .then(() => {
          fetchPlayers();
          setView("list");
          setEditingPlayer(null);
          resetForm();
        })
        .catch(() => alert("Update failed"));
    } else {
      addPlayer(formData)
        .then(() => {
          fetchPlayers();
          setView("list");
          resetForm();
        })
        .catch((err) => {
  console.error(err.response?.data || err);
  alert(err.response?.data || "Error");
});
    }
  };

  const resetForm = () => {
    setFormData({
      playerId: "",
      playerName: "",
      jerseyNumber: "",
      role: "",
      totalMatches: "",
      teamName: "",
      country: "",
      description: ""
    });
  };

  const handleDelete = (id) => {
    deletePlayer(id)
      .then(() => fetchPlayers())
      .catch(() => alert("Delete failed"));
  };

  const openEdit = (p) => {
    setEditingPlayer(p);
    setFormData(p);
    setView("form");
  };

  const openAdd = () => {
    setEditingPlayer(null);
    resetForm();
    setView("form");
  };

  if (view === "form") {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h4>{editingPlayer ? "Update Player" : "Add Player"}</h4>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                            className="form-control"
                            placeholder="Player ID"
                            value={formData.playerId}
                            disabled={editingPlayer !== null}
                            onChange={(e) =>
                                setFormData({ ...formData, playerId: Number(e.target.value) })
                            }
                            />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input className="form-control" placeholder="Player Name"
                      value={formData.playerName}
                      onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <input className="form-control" placeholder="Jersey Number"
                      value={formData.jerseyNumber}
                      onChange={(e) => setFormData({...formData, jerseyNumber: Number(e.target.value)})}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <select className="form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="">Select Role</option>
                      <option>Batsman</option>
                      <option>Bowler</option>
                      <option>Keeper</option>
                      <option>All Rounder</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <input className="form-control" placeholder="Total Matches"
                      value={formData.totalMatches}
                      onChange={(e) => setFormData({...formData, totalMatches: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input className="form-control" placeholder="Team Name"
                      value={formData.teamName}
                      onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input className="form-control" placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea className="form-control" placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-success w-100">
                    {editingPlayer ? "Update" : "Add Player"}
                  </button>

                  <button type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => setView("list")}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
return (
  <div className="container py-5">

    <div className="d-flex justify-content-between mb-4">
      <h1 className="text-dark"> Cricket Players </h1>

      <button className="badge btn-muted text-dark" onClick={openAdd}>
        + Add Player
      </button>
    </div>

    <div className="row mb-3">
  <div className="col-md-4">
    <input
      className="form-control"
      placeholder="Search by Player ID"
      value={searchId}
      onChange={(e) => setSearchId(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <button className="btn btn-success" onClick={searchPlayer}>
      Search
    </button>
  </div>

  <div className="col-md-2">
    <button className="btn btn-secondary" onClick={fetchPlayers}>
      Reset
    </button>
  </div>
</div>


    <div className="table-responsive">
      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Jersey</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          {players.length > 0 ? (
            players.map((p) => (
              <tr key={p.playerId}>
                <td>{p.playerId}</td>
                <td>{p.playerName}</td>
                <td>{p.role}</td>
                <td>{p.jerseyNumber}</td>

                <td className="text-end">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => openEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.playerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No players found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  </div>
);
}

export default Crud;