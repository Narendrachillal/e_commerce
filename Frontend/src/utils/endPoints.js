const baseURL = "import.meta.env.VITE_API_URL";
const API = {
  allproducts: `${baseURL}allproducts`,
  getCart: `${baseURL}getcart`,
  addToCart: `${baseURL}addtocart`,
  removeFromCart: `${baseURL}removefromcart`,
};
export default API;
