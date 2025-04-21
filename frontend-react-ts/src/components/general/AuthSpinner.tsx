import { PiDetective } from "react-icons/pi"; // Ensure this is the correct library

const AuthSpinner = () => {
  return (
    <div className="w-80 h-80 max-auto flex justify-center items-center relative ">
      <div className="absolute w-full h-full inset-0 border-8 border-purple-300 border-t-purple-700 rounded-full animate-spin"></div>
      <h1>
        <PiDetective className="w-40 h-40 text-purple-700"></PiDetective>
      </h1>
    </div>
  );
};

export default AuthSpinner;
