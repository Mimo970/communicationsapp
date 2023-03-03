import { AuthContext } from "contexts/AuthContext";
import { db, storage, auth } from "../../firebase";
import {
  getDocFromCache,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { MdOutlineCancel } from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { uuidv4 } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { ChatContext } from "contexts/ChatContext";
import toast, { Toaster } from "react-hot-toast";

const MyAccount = () => {
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const [color, setColor] = useState("#000000");
  const [aboutMe, setAboutMe] = useState("");
  const [img, setImg] = useState(null);
  // const [settingsUser, setSettingsUser] = useState({});

  const notify = () =>
    toast.success("Profile Updated!", {
      duration: 4000,
      position: "top-right",

      // Styling
      // style: {},
      // className: "",

      // Custom Icon

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleChange = (e) => {
    setAboutMe(e.target.value);
    // console.log(aboutMe);
  };

  const handleSave = async (e) => {
    // e.preventDefault();

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `avatars/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    updateProfile(auth.currentUser, {
      photoURL: url || currentUser.uid.photoURL,
    })
      .then(() => {
        console.log("profile updated!!");
        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log(error);
        // An error occurred
        // ...
      });

    await updateDoc(doc(db, "users", currentUser.uid), {
      // date: Timestamp.now(),
      photoURL: url || currentUser.photoURL,
      aboutMeColor:
        color !== myUserData.aboutMeColor && color !== "#000000"
          ? color
          : myUserData.aboutMeColor,
      aboutMe: aboutMe || myUserData.aboutMe,
    }).then(() => {
      console.log("user updated!!");
      notify();
      // Profile updated!
      // ...
    });
  };
  const useUserData = (uid) => {
    useEffect(() => {
      const getUserData = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      if (uid) {
        getUserData();
      }
    }, [uid]);

    return userData;
  };
  const myUserData = useUserData(currentUser.uid);

  const backtoHome = (e) => {
    e.preventDefault();

    router.push("/");
  };
  // console.log(myUserData);
  // console.log(Object.entries(data));
  // console.log(Object.entries(data || {}));

  return (
    <>
      <Toaster />
      <div className="pt-5 bg-zinc-700 h-screen  ">
        <div className=" flex flex-col max-w-4xl mx-auto bg-zinc-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-4">My Account</h1>
            <span className="cursor-pointer" onClick={backtoHome}>
              <div className="flex flex-col items-center">
                <MdOutlineCancel size={40} />
                <span>ESC</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4  ">
            <div className="w-full md:w-1/4">
              <h1 className="text-lg font-bold">Preview</h1>
              <div className="border rounded p-4">
                <img
                  className="rounded-full w-11 h-11 object-center"
                  src={currentUser.photoURL}
                  alt=""
                />

                <div className="mt-4">
                  <h2 className="text-lg font-bold">Username</h2>
                  <p className="text-gray-500">@{currentUser.displayName}</p>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-bold">Email</h2>
                  <p className="text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-lg font-bold mb-2">Account Settings</h2>
              <div className="border rounded p-4 flex flex-col gap-10">
                <div>
                  <div className="flex ">
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => setImg(e.target.files[0])}
                      id="file"
                    />
                    <label
                      htmlFor="file"
                      className="mx-1 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
                    >
                      Change Avatar
                    </label>

                    <button className="mx-1 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded">
                      Remove Avatar
                    </button>
                  </div>
                </div>
                <div>
                  <ChromePicker
                    // className="chrome-picker"
                    // size={12}
                    // white="#fff"
                    // grey="#333"
                    // styles={{ default: { picker: { color: "#D71818" } } }}
                    color={color}
                    onChange={handleColorChange}
                    disableAlpha
                  />
                </div>
                <div>
                  <h1>About Me</h1>
                  <div>
                    <textarea
                      className="rounded"
                      name="aboutMe"
                      id="aboutMe"
                      value={aboutMe}
                      onChange={handleChange}
                      cols="40"
                      rows="8"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="self-end mt-3 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
