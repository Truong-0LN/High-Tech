export const getListLocationSelector = state =>
  state.locationReducer.listlocation;
export const getOneAddressSelector = state => state.locationReducer.location;
export const getShippingAddress = state =>
  state.locationReducer.shippingAddress;
