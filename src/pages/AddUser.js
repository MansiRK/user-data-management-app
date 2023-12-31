import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import database from "../firebase-config";
import toast, { Toaster } from "react-hot-toast";
import { ref, push, get, set } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

const initalState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  city: "",
  country: "",
};

const AddUser = () => {
  // Initialize state with default values, including "Male" as the default gender
  const [state, setState] = useState({ ...initalState, gender: "Male" });

  // eslint-disable-next-line
  const [data, setData] = useState();
  const { name, email, age, phone, gender, city, country } = state;
  const navigate = useNavigate();

  const { id } = useParams();

  const heading = id ? "Update user" : "Add User";

  useEffect(() => {
    const userRef = ref(database, "users");

    try {
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setData(userData);

          if (id) {
            setState({ ...userData[id] }); // Set form fields with user data when updating
          }
        } else {
          setData({});
        }
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }

    return () => {
      setData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value }); // Update the state when input fields change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !age || !phone || !gender || !city || !country) {
      toast.error("Please fill all details");
    } else {
      if (id) {
        const userRef = ref(database, `users/${id}`);

        try {
          await set(userRef, state);
          toast.success("User details updated successfully");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        const userRef = ref(database, "users");

        try {
          await push(userRef, state);
          toast.success("User details added successfully");
          setState(initalState); // Clear form fields after adding a user

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid add-user">
        <h4>{heading}</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name || ""}
            placeholder="John Doe"
            onChange={handleInputChange}
          />

          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email || ""}
            placeholder="johndoe@example.com"
            onChange={handleInputChange}
          />

          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            className="form-control"
            type="number"
            name="phone"
            value={phone || ""}
            placeholder="00000-00000"
            onChange={handleInputChange}
          />

          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            className="form-control"
            type="number"
            name="age"
            value={age || ""}
            placeholder="31"
            onChange={handleInputChange}
          />

          <label htmlFor="gender" className="form-label">
            Gender
          </label>

          {/* Radio buttons for gender */}
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"} // Check if gender is Male
              onChange={handleInputChange}
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"} // Check if gender is Female
              onChange={handleInputChange}
            />
            <label className="form-check-label">Female</label>
          </div>

          {/* Select input for City */}
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            className="form-select"
            name="city"
            value={city || ""}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Your City
            </option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Surat">Surat</option>
          </select>

          {/* Select input for Country */}
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            name="country"
            value={country || ""}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Your Country
            </option>
            <option value="India">India</option>
            {/* Add more country options as needed */}
          </select>

          <div className="btn-contain">
            <button className="btn btn-add">{heading}</button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
