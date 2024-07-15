import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.ts";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFaliure,
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutStart,
  signOutSuccess
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  console.log(file);
  console.log(formData);
  /*
  firebase storage
  allow read 
  allow write: if
  request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches("image/.*")
   */
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch("localhost:3000/auth/signout")
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutFaliure(data.message))
        return
      }
      dispatch(signOutSuccess(data.success))
    } catch (error) {

    }
  }

  function handleFileUpload(file: any) {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapShot: any) => {
      const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      setFileperc(Math.round(progress));
    });
    (error: any) => {
      setfileUploadError(true);
      console.log(error);
    };
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    };
  }
  const fileRef = useRef(null);

  const handleDelete = async (e: any) => {
    try {
      dispatch(deleteUserStart())
      const response = await fetch(`localhost:3000/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await response.json()
      if (data.success === false) {
        dispatch(deleteUserFaliure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error: any) {
      dispatch(deleteUserFaliure(error.message))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(
        `localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content- Type": "application/json",
            //why is it neccesary to send and recieve api with JSON.Parse and Stringify
          },
          body: JSON.stringify(formData),
        }
      );
      const data = response.json();
      if (data.success === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error: any) {
      dispatch(updateUserFaliure(error.message));
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* <form className="flex flex-col" onSubmit={handleSubmit}>  why is this not recieving an event arguements*/}
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onChange={(e) => setFile(e.target.files[0])}
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
          src={"../assets/react.svg"}
          //src={formData.avatar || currentUser.avatar}
          alt="img"
        />

        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload (Image must be less than 2MB)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image Sucessfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-sm"
          id="username"
          defaultValue={currentUser.username}
          onChange={(e) =>
            setFormData((prev) => {
              return {
                ...prev,
                [e.target.id]: e.target.value,
              };
            })
          }
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-sm"
          id="email"
          defaultValue={currentUser.email}
          onChange={(e) =>
            setFormData((prev) => {
              return {
                ...prev,
                [e.target.id]: e.target.value
              };
            })
          }
        />

        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-sm"
          id="password"
          onChange={(e) =>
            setFormData((prev) => {
              return {
                ...prev,
                [e.target.id]: e.target.value,
              };
            })
          }
        />

        <button
          type="submit"
          className="bg-red-600 text-white p-3 uppercase hover:opacity-95 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
          update
        </button>

        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90" to='/create-listing'>Create Listing</Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete account</span>

        <span className="text-red-700 cursor-pointer"onClick={handleSignOut}>Signout</span>
      </div>

      <p className="text-red-700 mt-5 ">{error ? error : ""}</p>

      <p className="text-green-700 mt-5 ">{updateSuccess ? "success" : ""}</p>
    </div>
  );
};

export default Profile;
