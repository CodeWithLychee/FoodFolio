import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RequestAcc() {
  const register = (event) => {
    event.preventDefault();
    let data = {
      mess_id: inputMessId,
    };

    fetch("http://localhost:3000/api/request/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("Request sent successfully");
      } else {
        response.json().then((data) => {
          alert(data.errors[0].msg);
        });
      }
    });
  };

  const [inputMessId, setInputMessId] = useState("");
  const changeMessId = (event) => {
    setInputMessId(event.target.value);
  };

  const messIdField = {
    name: "mess_id",
    type: "number",
    placeholder: "Enter Mess ID",
    req: true,
    onChange: changeMessId,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="flex justify-center items-center text-2xl font-bold leading-tight tracking-tight text-white">
          Request account from Mess Manager
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={register}>
          <Input field={messIdField} />
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 focus:ring-blue-800"
          >
            Request
          </button>
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth"
              className="font-medium hover:underline text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
