import React from "react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useOAuthMutation } from "../features/auth/authApiSlice";

const OAuth = ({setError}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oAuth, { isLoading }] = useOAuthMutation();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("this ", result.user.accessToken);
      console.log("this ", await result.user.getIdToken());
      const data = {idToken: result.user.accessToken};
      const res = await oAuth(data).unwrap();
        console.log("this is res", res);
        dispatch(setCredentials(res?.Data));
        navigate("/");
    } catch (error) {
        console.log("Could not login with google", error);
        setError(error?.data?.message || 'Something went wrong!');
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-70"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
