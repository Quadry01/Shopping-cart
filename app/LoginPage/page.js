"use client";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../FirebaseConfig/Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REDIRECT USER AFTER SIGNIN
  const RedirectUser = (e) => {
    window.location.replace("ProductPage");
  };

  // LOGIN USER WITH EMAIL AND PASSWORD
  const LoginWithEmail = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      RedirectUser();
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        alert("Enter a valid Email and Password");
      } else if (email === "" && password === "") {
        alert("Enter a valid Email and Password");
      } else if (err.code === "auth/internal-error") {
        alert("Check Internet conection");
      }
    }
  };
  // LOGIN USER WITH GOOGLE MAIL
  const LoginWithGoogle = async (e) => {
    try {
      e.preventDefault();
      await signInWithPopup(auth, provider);
      console.log(auth.currentUser, auth.currentUser.photoURL);
      RedirectUser();
    } catch (error) {
      if (error.code === "auth/internal-error") {
        alert("Check Internet conection");
      } else if (error.code === "auth/popup-closed-by-user") {
        alert("Popup closed by user");
      }
    }
  };

  return (
    <div className="flex justify-center my-20  ">
      <div className="bg-cyan-900 w-1/3 h-96 p-24 shadow-lg text-center">
        <FiShoppingCart className="m-auto text-white text-8xl" />
        <span className=" text-white text-2xl"> Super Shopping</span>
      </div>

      <div className="w-1/3 h-96 bg-yellow-100 shadow-lg">
        <form className="pl-20 pt-8">
          <label> Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-3/4 h-8 p-2"
            value={email}
          ></input>
          <br />
          <label>Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 h-8 p-2 "
            value={password}
          ></input>
          <br />
          <button
            onClick={LoginWithEmail}
            className=" mt-3 p-2 bg-slate-500 rounded-md text-white"
          >
            Login
          </button>
          <br />
          <button
            onClick={LoginWithGoogle}
            className="bg-white w-2/3 h-8 mt-10 text-center rounded-md"
          >
            Login with Google <FcGoogle className="inline text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
