import React from "react";

const Summary = ({ orderPrice, handlePlaceOrder, coinInputAmount }) => {
  return (
    <div className="row m-3">
      <div className="row justify-content-end">
        <h3 className="m-2">
          Order Total: <b>{orderPrice} cents</b>
        </h3>
        <h3 className="m-2">
          Coin Input: <b>{coinInputAmount} cents</b>
        </h3>

        {orderPrice > coinInputAmount && (
          <div className="alert alert-danger" role="alert">
            Add Few more Coins
          </div>
        )}
      </div>

      <div className="row justify-content-end">
        <div className="col-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={handlePlaceOrder}
            disabled={coinInputAmount < orderPrice}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
