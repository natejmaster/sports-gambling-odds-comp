import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Swal from "sweetalert2";
function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      if (token) {
        // Show a SweetAlert on successful login
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonColor: "#050e44",
        });
        setTimeout(() => {
          Auth.login(token);
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 pb-56">
      <form
        className="flex flex-col justify-center items-center white-bg rounded-xl border-royalBlue w-11/12 lg:w-7/12 shadow-xl mb-4"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-3xl heading text text-center mt-2">Login</h2>
        <div className="flex flex-col  lg:w-7/12">
          <label className="royalBlue" htmlFor="email">
            Email address:
          </label>
          <input
            className="p-2 rounded-xl mb-3 border-inputGold shadow-xl"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="">The provided credentials are incorrect</p>
          </div>
        ) : null}

        <button
          className="gold-bg py-2 mt-2  px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Link className="text-xl royalBlue underline" to="/signup">
        ← Go to Signup
      </Link>
    </div>
  );
}

export default Login;
