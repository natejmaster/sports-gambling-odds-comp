// ... (other imports)
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import Swal from "sweetalert2";

function Signup(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [addUser] = useMutation(ADD_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Log the updated form state after the mutation has been completed
      console.log(formState);

      console.log(data);
      if (data && data.addUser) {
        // Show a SweetAlert on successful login
        Swal.fire({
          title: "Success!",
          text: "You have successfully signed up.",
          icon: "success",
          confirmButtonColor: "#050e44",
        });

        setTimeout(() => {
          Auth.login(data.addUser.token);
        }, 2000);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#050e44",
        });
      }
    } catch (e) {
      console.error(e);
    }

    // Reset the form state after handling the submit
    setFormState({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 pb-56">
      <form
        className="flex flex-col justify-center items-center white-bg rounded-xl border-royalBlue w-11/12 lg:w-7/12 shadow-xl mb-4"
        onSubmit={handleFormSubmit}
      >
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
            onChange={handleChange}
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

        <button
          className="gold-bg py-2 mt-2  px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl"
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
