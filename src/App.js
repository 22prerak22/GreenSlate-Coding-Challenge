import React, { useCallback, useState } from "react";
import Coin from "./components/Coins";
import Products from "./components/Products";
import Summary from "./components/Summary";
import Modal from "./components/Modal";
import {
  InitialCoinData,
  ProductData,
  coinDataDic,
  productDic,
} from "./constants";
import "./App.css";

function App() {
  const [coinData, setCoinData] = useState(InitialCoinData);
  const [productData, setProductData] = useState(ProductData);
  const [cartData, setCartData] = useState({});
  const [coinInput, setCoinInput] = useState({});
  const [open, setOpen] = useState(false);
  const [error, showError] = useState("");

  const handleCoinsChange = useCallback(
    (e) => {
      const { id, value } = e.target;

      setCoinInput({
        ...coinInput,
        [id]: value,
      });
    },
    [coinInput]
  );

  const handleProductChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      const availableQty = productData.find((p) => p.name === id).availableQty;
      setCartData({
        ...cartData,
        [id]: value > availableQty ? availableQty : value,
      });
    },
    [cartData, productData]
  );

  const orderPrice = Object.entries(cartData).reduce(
    (s, c) => s + c[1] * productDic[c[0]],
    0
  );

  const coinInputAmount = Object.entries(coinInput).reduce(
    (s, c) => s + c[1] * coinDataDic[c[0]],
    0
  );

  const handleSubmit = () => {
    let money = coinInputAmount - orderPrice;

    const Quarter = Math.floor(money / 25);
    money = money - Quarter * 25;

    const Dime = Math.floor(money / 10);
    money = money - Dime * 10;

    const Nickel = Math.floor(money / 5);
    money = money - Nickel * 5;

    const Penny = money;

    let flag = false;

    const coinDataDic = (coin, qty) => {
      if (coin.availableQty > qty) {
        coin.availableQty -= qty;
      } else {
        flag = true;
      }
      return coin;
    };

    const reduceCoinForChange = coinData.map((c) => {
      switch (c.name) {
        case "Penny":
          return coinDataDic(c, Penny, flag);
        case "Nickel":
          return coinDataDic(c, Nickel, flag);
        case "Dime":
          return coinDataDic(c, Dime, flag);
        case "Quarter":
          return coinDataDic(c, Quarter, flag);
        default:
          flag = true;
          return c;
      }
    });

    if (!flag) {
      const addCoinForChange = reduceCoinForChange.map((c) => {
        return {
          ...c,
          availableQty: c.availableQty + coinInput[c.name],
        };
      });
      setCoinData(addCoinForChange);

      const updateProductInventory = productData.map((c) => {
        return {
          ...c,
          availableQty: c.availableQty - cartData[c.name],
        };
      });
      setProductData(updateProductInventory);
      setCartData({});
      setCoinInput({});
      setOpen(false);
    } else {
      //show error
      showError("No Change for this transaction");
    }
  };

  const handlePlaceOrder = () => {
    showError("");
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <>
      <div className="container">
        <div className="row">
          <Coin
            coinData={coinData}
            coinInput={coinInput}
            handleChange={handleCoinsChange}
          />
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-6">
            <Products
              cartData={cartData}
              productData={productData}
              handleChange={handleProductChange}
            />
          </div>

          <div className="col-6 align-self-center">
            <Summary
              orderPrice={orderPrice}
              coinInputAmount={coinInputAmount}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
      {open && (
        <Modal
          onClose={closeModal}
          title="Order Summary"
          handleSubmit={handleSubmit}
        >
          <ul className="list-group">
            {Object.entries(cartData).map((c) => {
              return (
                <li key={c} className="list-group-item">
                  <b>{c[0]}</b> with qty: {c[1]}{" "}
                </li>
              );
            })}
          </ul>
          <div className="row justify-content-end p-3 ">
            Order Total: {orderPrice} cents
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
