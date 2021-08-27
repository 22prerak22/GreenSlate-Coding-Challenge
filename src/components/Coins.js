import React from "react";

const Coins = ({ coinData, coinInput, handleChange }) => {
  return (
    <div className="row">
      <h3 className="m-3">Coins Information</h3>
      <hr />
      {coinData.map((c) => {
        return (
          <div className="col-2" key={c.name}>
            <label htmlFor={c.name} className="form-label">
              {c.name}
            </label>
            <input
              id={c.name}
              className="form-control"
              value={coinInput[c.name] || ""}
              type="number"
              min={0}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Coins;
