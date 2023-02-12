import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(username, email, password, file);
    try {
      //   const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-zinc-800  text-white h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-700 w-96 p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-400 p-2 w-full bg-zinc-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        {/* <div className="flex items-center mb-4">
          <label htmlFor="password" className="block font-bold mb-2 pr-2">
            Add Profile Image
          </label>
          <MdAddPhotoAlternate />
          <input
            type="file"
            id="file"
            // value={password}
            onChange={(e) => setFile(e.target.value)}
            className="hidden border border-gray-400 p-2 w-full"
          />
        </div> */}
        <div className="mb-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            required
            type="file"
            id="file"
          />

          <label className="flex items-center" htmlFor="file">
            <MdAddPhotoAlternate />
            <span>Add an avatar</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-zinc-500 text-white p-2 rounded-lg hover:bg-zinc-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
