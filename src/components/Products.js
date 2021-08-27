import React from "react";

const Products = ({ productData, cartData, handleChange }) => {
  return (
    <div className="row">
      <h3 className="m-3">Products Information</h3>
      <hr />
      {productData.map((c) => {
        return (
          <div className="row m-2" key={c.name}>
            <div className="col-6">
              <h4 htmlFor={c.name} className="form-label">
                {c.name}
              </h4>
              <h6>
                {c.availableQty} drinks available, Cost={c.value}
              </h6>
            </div>
            <div className="col-4">
              <input
                id={c.name}
                className="form-control p-3"
                value={cartData[c.name] || ""}
                type="number"
                min={0}
                onChange={handleChange}
                disabled={c.availableQty === 0}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
