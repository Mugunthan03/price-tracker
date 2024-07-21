import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Product = () => {
  const [productLink, setProductLink] = useState("");
  const [productData, setProductData] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/fetch-product',
        { productLink, category }
      );
      setProductData(response.data);
      setError(null);
    } catch (err) {
      setError("Invalid URL or failed to fetch product data");
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="mt-3 mx-5 lg:mx-20 flex flex-col gap-5"
        onSubmit={fetchProductData}
      >
        <input
          type="text"
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          required
          placeholder="Enter product URL"
          className="border-2 border-[#113f67] outline-none p-1  md:p-3 rounded-md"
        />

        <div className="flex justify-between gap-5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border-2 rounded-md border-black p-1 md:p-3 w-full"
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home & Kitchen</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="others">Others</option>
          </select>
          <button
            type="submit"
            className="bg-[#698474] p-1 md:p-3 rounded-md w-full font-bold hover:bg-opacity-90 transition-all duration-300"
          >
            Get Price
          </button>
        </div>
      </form>
      {loading && <Spinner />}
      {error && <p className="mx-20 mt-5 text-red-500 ">{error}</p>}

      {productData && (
        <div className="mx-5 lg:mx-20 mt-10 flex gap-5 flex-wrap md:flex-nowrap">
          <div>
            {productData.productImage && (
              <img
                src={productData.productImage}
                alt={productData.productName}
                className="w-[300px] h-[250px] object-contain"
              />
            )}
          </div>
          <div>
            <h2 className="text-sm md:text-lg font-normal">
              {productData.productName}
            </h2>
            <p className="text-lg mt-3 lg:text-2xl font-bold">
              Amazon Price: ₹{productData.productPrice}
            </p>
            <p className="text-base lg:text-xl mt-2 text-green-500 font-bold">
              Discounted Price: ₹{productData.productDiscountPrice} (10% off)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
