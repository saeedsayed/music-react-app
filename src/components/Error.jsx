import React from "react";

const Error = ({ error }) => (
  <div className="w-full flex justify-center items-center">
    <h1 className="font-bold text-2xl text-white mt-2">
      Something Went Wrong. Please Try Again
      {error && error}
    </h1>
  </div>
);

export default Error;
