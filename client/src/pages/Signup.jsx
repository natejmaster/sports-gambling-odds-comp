// ... (other imports)
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

function Signup(props) {
  // const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  // const [addUser] = useMutation(ADD_USER);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const mutationResponse = await addUser({
  //     variables: {
  //       email: formState.email,
  //       password: formState.password,
  //       username: formState.username,
  //     },
  //   });
  //   const token = mutationResponse.data.addUser.token;
  //   Auth.login(token);
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  return (
    <div className="flex flex-col justify-center items-center mt-5 pb-56">
      <form className="flex flex-col justify-center items-center white-bg rounded-xl border-royalBlue w-11/12 lg:w-7/12 shadow-xl mb-4">
        {/* onSubmit={handleFormSubmit} */}

        <h2 className="text-3xl heading text text-center mt-2">Signup</h2>

        <div className="flex flex-col  lg:w-7/12">
          <label className="royalBlue" htmlFor="username">
            Username:
          </label>
          <input
            className="p-2 rounded-xl mb-3 border-inputGold shadow-xl"
            placeholder="YourUsername"
            name="username"
            type="text"
            id="username"
            // onChange={handleChange}
          />
        </div>
        <div className="flex flex-col lg:w-7/12">
          <label className="royalBlue" htmlFor="email">
            Email:
          </label>
          <input
            className="p-2 rounded-xl mb-3 border-inputGold shadow-xl"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            // onChange={handleChange}
          />
        </div>
        <div className="flex flex-col lg:w-7/12">
          <label className="royalBlue" htmlFor="pwd">
            Password:
          </label>
          <input
            className="p-2 rounded-xl mb-3 border-inputGold shadow-xl"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            // onChange={handleChange}
          />
        </div>

        <button
          className="gold-bg py-2 px-4 rounded-xl mybtn mb-7 mt-2 font-bold text-xl shadow-xl"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Link className="text-xl royalBlue underline" to="/login">
        ← Go to Login
      </Link>
    </div>
  );
}

export default Signup;
