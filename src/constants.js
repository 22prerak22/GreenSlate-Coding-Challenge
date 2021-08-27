export const InitialCoinData = [
  {
    name: "Penny",
    value: 1,
    availableQty: 100,
  },
  {
    name: "Nickel",
    value: 5,
    availableQty: 10,
  },
  {
    name: "Dime",
    value: 10,
    availableQty: 5,
  },
  {
    name: "Quarter",
    value: 25,
    availableQty: 25,
  },
];

export const ProductData = [
  {
    name: "Coke",
    value: 25,
    availableQty: 5,
  },
  {
    name: "Pepsi",
    value: 36,
    availableQty: 15,
  },
  {
    name: "Soda",
    value: 45,
    availableQty: 3,
  },
];

export const coinDataDic = InitialCoinData.reduce(
  (a, c) => ({ ...a, [c.name]: c.value }),
  {}
);
export const productDic = ProductData.reduce(
  (a, c) => ({ ...a, [c.name]: c.value }),
  {}
);
