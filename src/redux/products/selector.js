export const getProductsSelector = state => state.productsReducer.products;
export const getProductSelector = state => state.productsReducer.product;
export const getProductByTypeSelector = state =>
  state.productsReducer.productsByType;
export const getListFavoriteSelector = state =>
  state.productsReducer.listFavorite;
