import React, { useState } from "react";
import "./CSS/Login.css";

export const Login = () => {
  const [enquiryData, setEnquiryData] = useState({
    Name: "",
    Email: "",
    Phone: "",
  });

  let name, value;

  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setEnquiryData({ ...enquiryData, [name]: value });
  };

  // connecting firebase
  const submitData = async (e) => {
    e.preventDefault();
    const { Name, Email, Phone } = enquiryData;

    if (Name && Email && Phone) {
      const res = await fetch(
        "https://apexwatch-cbf33-default-rtdb.firebaseio.com/userEnquiryDataBase.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name, Email, Phone }),
        }
      );

      if (res) {
        setEnquiryData({ Name: "", Email: "", Phone: "" });
        alert("data stored");
      } else {
        alert("please fill the data");
      }
    } else {
      alert("please fill the data");
    }
  };

  return (
    <div className="login">
      <form method="POST">
        <div className="login-container">
          <h1>Check Availability</h1>
          <div className="login-fields">
            <input
              type="text"
              name="Name"
              placeholder="Your Name"
              value={enquiryData.Name}
              onChange={postUserData}
            />
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              value={enquiryData.Email}
              onChange={postUserData}
            />

            <input
              type="text"
              name="Phone"
              placeholder="Your Number"
              value={enquiryData.Phone}
              onChange={postUserData}
            />
          </div>
          <button onClick={submitData}>Continue</button>

          <div className="login-agree">
            <input type="checkbox" name="" id="" checked />
            <p>By continuing, I agree to the terms of use and privacy policy</p>
          </div>
        </div>
      </form>
    </div>
  );
};
