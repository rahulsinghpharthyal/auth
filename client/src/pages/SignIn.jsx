import React, { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [signIn, { isLoading }] = useSignInMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(formData.email && formData.password)) {
      setError("All fields are required");
      return;
    }
    startTransition(async () => {
      try {
        const res = await signIn(formData).unwrap();
        console.log("tis is res", res);
        dispatch(setCredentials(res?.Data));
        navigate("/");
        // const data = await fetch("/api/auth/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });
        // const res = await data.json();
        // console.log("this is error", error);
        // console.log(res);
        // if (res.success === false) return setError(true);
        // navigate("/");
      } catch (error) {
        console.log("this is error", error);
        setError(error?.data?.message || "Something went wrong");
      }
    });
  };

  if (error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <button
          disabled={isPending || isLoading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isPending || isLoading ? "Please wait" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && (
        <div>
          <p className="text-red-700 mt-5">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
