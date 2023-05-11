import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState('');
  const chngPassField = {
    name: "New Password",
    type: "password",
    placeholder: "New Password",
    req: true,
    onChange: chngPass,
  };
  const chngOldPassField = {
    name: "Old Password",
    type: "password",
    placeholder: "Old Password",
    req: true,
    onChange: chngPass,
  };

  console.log(pass);

  function chngPass(e) {
    setPass(e.target.value);
  }

  return (
    <div className="w-full h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mb-10 text-center">Settings</h1>
      <form method="POST" action="#" >
        <div className="w-96 flex flex-col justify-between gap-5 bg-neutral-950 p-5 rounded">
          <h2 className="text-3xl text-white font-bold mb-5">
            Change Password
          </h2>
          <Input field={chngOldPassField} />
          <Input field={chngPassField} />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;