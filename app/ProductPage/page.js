"use client";
import Image from "next/image";
import { db } from "@/FirebaseConfig/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { BsCartDash, BsPlusSquare } from "react-icons/bs";
import {
  AiOutlineDelete,
  AiOutlineMinusSquare,
  AiFillDelete,
} from "react-icons/ai";
import { React, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsPage() {
  const [cart, setCart] = useState({});
  const [hideCart, setHideCart] = useState("hidden");
  const [hideDeleteBTN, setHideDeleteBTN] = useState("hidden");
  const [productList, setProductList] = useState([]);

  const handleDragOut = (e, product) => {
    const pass = JSON.stringify(product);
    e.dataTransfer.setData("item", pass);
    setHideDeleteBTN("show");
  };

  const handleDragIn = (product, e) => {
    const item = JSON.stringify(product);
    e.dataTransfer.setData("item", item);
  };

  // INCEARESE ITEM QUANTITY INSIDE CART
  const quantityIncrement = (item, key) => {
    setCart({
      ...cart,
      [key]: {
        ...item,
        quantity: item.quantity + 1,
      },
    });
  };
  // DECEARESE ITEM QUANTITY INSIDE CART
  const quantityDecrement = (item, key) => {
    setCart({
      ...cart,
      [key]: {
        ...item,
        quantity: item.quantity - 1,
      },
    });
  };
  // ADD ITEM FROM CART
  const addItemToCart = (product) => {
    setCart({
      ...cart,
      [product.id]: { ...product.data, quantity: 1, id: product.id },
    });
  };
  // REMOVE ITEM FROM CART
  const removeItemFromCart = (product) => {
    setCart(
      Object.values(cart).filter((filterTag) => filterTag.id !== product.id)
    );
    if (Object.keys(cart).length === 1) {
      setHideCart("hidden");
    }
  };

  // MOUNT PRODUCT ON THE WEBSITE
  useEffect(() => {
    getProducts();
  }, []);

  // GET PRODUCTS FROM DATABASE
  const getProducts = async () => {
    const productCollection = collection(db, "ProductList");
    await getDocs(productCollection)
      .then((res) => {
        const products = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setProductList(products);
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div>
      <AiFillDelete
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          var obj = JSON.parse(e.dataTransfer.getData("item"));
          removeItemFromCart(obj);
          setHideDeleteBTN("hidden");
        }}
        className={` ${hideDeleteBTN} p-2 m-auto mt-2 text-4xl text-white bg-orange-600 rounded-lg`}
      />

      <div>
        <BsCartDash
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            var obj = JSON.parse(e.dataTransfer.getData("item"));
            addItemToCart(obj);
          }}
          onClick={() =>
            hideCart === "hidden" ? setHideCart("show") : setHideCart("hidden")
          }
          className="text-2xl absolute top-3 right-40 text-white"
        />
        <p className="text-l absolute top-5  right-36 text-white">
          {Object.keys(cart).length}
        </p>
      </div>
      <div className="  flex flex-wrap  ">
        {productList.map((product) => (
          <div
            key={product.id}
            draggable
            onDragStart={(e) => {
              handleDragIn(product, e);
            }}
            className=" relative bg-yellow-50 rounded-lg m-4 mb-20 w-auto h-auto pb-2  hover:shadow-lg "
          >
            <span className=" m-4 absolute right-0 bg-blue-200 p-2 rounded-md text-yellow-100">
              {product.data.discount}%
            </span>
            <Image
              priority={true}
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
                {(product.data.discount / 100) * product.data.price}
              </h5>
              <s className="opacity-10">
                <h5 className="text-sm">
                  <span className="naira">N</span>
                  {product.data.price}
                </h5>
              </s>

              <button
                className="p-2 bg-slate-500 rounded-xl text-orange-50"
                onClick={() => {
                  addItemToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={` ${hideCart} w-auto bg-red-100 p-2 mx-2 shadow-lg absolute right-4 top-12`}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          var obj = JSON.parse(e.dataTransfer.getData("item"));
          addItemToCart(obj);
        }}
      >
        {Object.entries(cart).map(([key, item]) => (
          <div
            draggable
            onDragStart={(e) => {
              handleDragOut(e, item);
            }}
            key={key}
            className="flex mt-2 border-y-amber-950 "
          >
            <Image
              className="rounded-full mt-4"
              src={item.link}
              width={50}
              height={50}
              alt="pg"
            ></Image>
            <h4 className="pt-4 mt-2 ml-4 text-2xl">{item.name}</h4>
            <p className="pt-4 ml-8 mt-4">
              <s className="naira">N</s>
              {item.quantity * item.price}
            </p>
            <p className="pt-4 ml-8 mt-4 "></p>
            <AiOutlineMinusSquare
              onClick={() => {
                quantityDecrement(item, key);
              }}
              className="text-2xl mt-8 mr-2"
            />
            <p className="text-l mt-8 ">{item.quantity}</p>
            <BsPlusSquare
              onClick={() => {
                quantityIncrement(item, key);
              }}
              className="text-2xl mt-8 ml-2"
            />
            <button>
              <AiOutlineDelete
                onClick={() => {
                  removeItemFromCart(item);
                }}
                className="text-2xl m-8"
              />
            </button>
          </div>
        ))}
        <p className="text-2xl mt-2 float-right">
          Total: <s className="naira">N</s>
          {Object.values(cart).reduce(
            (total, item) => total + item.quantity * item.price,
            0
          )}
        </p>

        <button className={`p-2 bg-blue-500 rounded-lg mt-4`}>Check Out</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductsPage;
