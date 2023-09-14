"use client";
import Image from "next/image";
import { db } from "@/FirebaseConfig/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { BsCartDash } from "react-icons/bs";

import { React, useEffect, useState } from "react";

function ProductsPage() {
  const [productList, setProductList] = useState([]);
  // MOUNT PRODUCT ON THE WEBSITE
  useEffect(() => {
    getProducts();
  }, []);
  // GET PRODUCTS FRONM DATABASE
  const getProducts = () => {
    const productCollection = collection(db, "ProductList");
    getDocs(productCollection)
      .then((res) => {
        const products = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setProductList(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-20  ">
      <BsCartDash className="text-2xl absolute top-3 right-40 text-white" />
      <div className="  flex flex-wrap ">
        {productList.map((product) => (
          <div
            key={product.id}
            className=" relative bg-yellow-50 rounded-lg m-4 mb-20 w-48 cursor-pointer hover:shadow-lg "
          >
            <span className=" m-4 absolute right-0 bg-blue-200 p-2 rounded-md text-yellow-100">
              -{Math.floor((product.data.price1 / product.data.price2) * 100)}%
            </span>
            <Image
              className="rounded-lg "
              src={product.data.link}
              width={200}
              height={200}
              alt="Picture of the author"
            />
            <div className="pl-2 ">
              <h4 className="text-lg">{product.data.name}</h4>

              <h5 className="text-base">
                <span className="naira">N</span>
                {product.data.price1}
              </h5>
              <s className="opacity-60">
                <h5 className="text-sm">
                  <span className="naira">N</span>
                  {product.data.price2}
                </h5>
              </s>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
