import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { cloudinaryConfig } from "../config/cloudinary";
import axios from "axios";
import { useUploadToCloudinaryMutation } from "../features/user/userApiSlice";

const Profile = () => {
  console.log(cloudinaryConfig);
  const fileRef = useRef(null);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({});
  console.log("this is image", image);
  const user = useSelector(selectCurrentUser);

  const [uploadToCloudinary, {isLoading}] = useUploadToCloudinaryMutation();
  // uplaod to cloudinary:-
  const handleUploadImageToCloudinary = async (image) => {
    try {
      if (!image) {
        return;
      }
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", cloudinaryConfig.upload_preset);
      const response = await uploadToCloudinary(imageData).unwrap();
      console.log("this is response", response);
      setFormData({...formData, profileImg: response?.secure_url})
      setImageUrl(response?.secure_url);
      setMessage("Image Uploaded Successfully!");
    } catch (error) {
      console.log('this is error', error)
      setMessage(error?.data?.error?.message || 'Error uploading image')
    }
  };

  console.log('this is fomrm Data', formData)

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 6000);
  }
  useEffect(() => {
    if (image) {
      handleUploadImageToCloudinary(image);
    }
  }, [image]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profileImg || user.profileImg}
          alt="Profile Picture"
          className="h-24 w-24 self-center cursor-pointer
        rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        ></img>
        {message && <p className="text-center text-green-400">{message}</p>}
        <input
          defaultValue={user.username}
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e)=>setFormData({...formData, username: e.target.value})}
          className="bg-slate-100 rounded-tr-lg rounded-bl-lg p-2"
        />
        <input
          defaultValue={user.email}
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e)=>setFormData({...formData, email: e.target.value})}
          className="bg-slate-100 rounded-tr-lg rounded-bl-lg p-2"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e)=>setFormData({...formData, password: e.target.value})}
          className="bg-slate-100 rounded-tr-lg rounded-bl-lg p-2"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
