export const keys = {
  shoppingCart: 'shoppingCart',
  price: 'price',
  coupon: 'coupon',
  orderNumber: 'orderNumber',
};

export const getShoppingCart = () => {
  const shoppingCart = window.localStorage.getItem(keys.shoppingCart);
  return shoppingCart !== null ? JSON.parse(shoppingCart) : {};
};

export const updateShoppingCart = (shoppingCart) => {
  window.localStorage.setItem(
    keys.shoppingCart,
    JSON.stringify(shoppingCart)
  );
};

export const getPrice = () => {
  const price = window.localStorage.getItem(keys.price);
  return price !== null ? Number(price) : 0;
};

export const decreasePrice = (price) => {
  window.localStorage.setItem(keys.price, getPrice() - price);
};

export const increasePrice = (price) => {
  window.localStorage.setItem(keys.price, getPrice() + price);
};

export const updatePrice = (isDecrease, price) => {
  if (isDecrease) {
    decreasePrice(price);
  } else {
    increasePrice(price);
  }
};

export const getQuantity = (id) => {
  const shoppingCart = getShoppingCart();
  return id in shoppingCart ? Number(shoppingCart[id].quantity) : 1;
};

export const getIsForCheckout = (id) => {
  const shoppingCart = getShoppingCart();
  return id in shoppingCart ? Boolean(shoppingCart[id].isForCheckout) : true;
};

export const getSelectedCoupon = () => {
  const selectedCoupon = window.localStorage.getItem(keys.coupon);
  return selectedCoupon !== null ? selectedCoupon : '';
};

export const updateSelectedCoupon = (coupon) => {
  window.localStorage.setItem(keys.coupon, coupon);
};

export const getOrderNumber = () => {
  const orderNumber = window.localStorage.getItem(keys.orderNumber);
  return orderNumber !== null ? orderNumber : '';
};

export const updateOrderNumber = (orderNumber) => {
  window.localStorage.setItem(keys.orderNumber, orderNumber);
};

export const clearShoppingCart = (newKeys) => {
  if (newKeys) {
    newKeys.map((key) => window.localStorage.removeItem(key));
  } else {
    Object.keys(keys).map((key) => window.localStorage.removeItem(key));
  }
};

const storage = {
  keys,
  getShoppingCart,
  updateShoppingCart,
  getPrice,
  decreasePrice,
  increasePrice,
  updatePrice,
  getQuantity,
  getIsForCheckout,
  getSelectedCoupon,
  updateSelectedCoupon,
  getOrderNumber,
  updateOrderNumber,
  clearShoppingCart
};

export default storage;
