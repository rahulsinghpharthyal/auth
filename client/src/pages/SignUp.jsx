import React, { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../app/api/apiSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [signUp, { isLoading, isError }] = useSignUpMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    startTransition(async () => {
      try {
        const res = await signUp(formData).unwrap();
        navigate('/sign-in');
        // console.log("this is res", res);
        // const data = await fetch("/api/auth/signup", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });
        // const res = await data.json();
        // console.log(res)
        // if (res.success === false) return setError(true);
        // navigate('/sign-in');
        // setError(false);
      } catch (error) {
        // console.log("tis is error", error);
          setError(error?.data?.message || 'An error occurred');
      }
    });
  };

  if(error) {
    setTimeout(()=>{
      setError('')
    }, 5000)
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleOnChange}
        />
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
          {isPending || isLoading ? "Please wait" : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
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

export default SignUp;
