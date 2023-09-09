/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {VITE_BACKEND_URL} from "../App"

const Product = ({ product, getProducts }) => {
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
      toast.success("Deleted product successfully");
      getProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={product.image} className="w-full h-28 object-cover" />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{product.name}</h2>
        <div className="text-sm">{product.quantity}</div>
        <div className="text-sm">Price ${product.price}</div>

        <div className="mt-2 flex gap-4 h-8">
          <Link
            to={`/edit/${product._id}`}
            className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover: cursor pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteProduct(product._id)}
            className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover: cursor pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
