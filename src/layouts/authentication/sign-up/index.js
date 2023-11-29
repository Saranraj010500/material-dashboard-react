/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, json } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useNavigate } from "react-router-dom";

// import { useNavigate  } from "react-router-dom";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import { useEffect } from "react";

const Registration = () => {
  const newErrors = {};
  let register = JSON.parse(localStorage.getItem("users"));
  const Navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const [isServerRunning, setIsServerRunning] = useState(false);

  const _getUserData = async () => {
    let response;
    try {
      response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      return { error: "User Data not found!" };
    }
  };

  useEffect(() => {
    // Check if the JSON server is running
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000"); // Change the URL to your JSON server endpoint
        if (response.ok) {
          console.log("Running - true");
          setIsServerRunning(true);
        } else {
          console.log("Running - false");
          setIsServerRunning(false);
        }
      } catch (error) {
        console.log("catch");
        setIsServerRunning(false);
      }
    };
    // Call the function to check the server status
    checkServerStatus();
  }, []);

  const _validateField = (key) => {
    switch (key) {
      case "name":
        if (formData.name === "" || formData.name === null) {
          newErrors.name = "Please enter the name";
        } else if (formData.name.length < 3) {
          newErrors.name = "Please enter atleast 3 letters";
        } else if (formData.name.length >= 3) {
          newErrors.name = " ";
          if (register === "") {
          }
        }
        break;
      case "email":
        if (formData.email === "" || formData.email === null) {
          newErrors.email = "Please enter email";
        } else if (formData.email !== "") {
          if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
          }
        }
        break;

      case "password":
        if (formData.password === "" || formData.password === null) {
          newErrors.password = "Please enter password";
        } else if (formData.password.length < 7) {
          newErrors.password = "Please enter atleast 7 letters";
        } else if (formData.password.length >= 7) {
          newErrors.password = " ";
        }
      default:
        console.log("hvhhb");
        break;
    }
    setErrors(newErrors);
  };
  // ************************************************* Name Validation ***************************************************
  const _nameValidation = () => {
    if (formData.name === "" || formData.name === null) {
      newErrors.name = "Please enter the name";
    } else if (formData.name.length < 3) {
      newErrors.name = "Please enter atleast 3 letters";
    } else if (formData.name.length >= 3) {
      newErrors.name = " ";
      if (register === "") {
      }
    }
  };
  // ************************************************* Password Validation ***************************************************
  const _passwordValidation = () => {
    if (formData.password === "" || formData.password === null) {
      newErrors.password = "Please enter password";
    } else if (formData.password.length < 7) {
      newErrors.password = "Please enter atleast 7 letters";
    } else if (formData.password.length >= 7) {
      newErrors.password = " ";
    }
  };
  const _toCheckServerisRunningOrNot = async () => {
    try {
      console.log("try");
      // If the server is running, send data to JSON server
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
      });
      if (response.ok) {
        console.log("try - send");
        console.log("Data sent to JSON server:", formData);
      } else {
        console.error("Failed to send data to JSON server.");
      }
    } catch (error) {
      console.error("Error occurred while sending data to JSON server:", error);
    }
  };

  // ************************************************* Email Validation ***************************************************
  const _emailValidation = async () => {
    if (formData.email === "" || formData.email === null) {
      newErrors.email = "Please enter email";
    } else if (formData.email !== "") {
      newErrors.email = " ";
      let storage = localStorage.getItem("users");
      console.log(storage, "Storage");
      if (storage !== null) register = JSON.parse(localStorage.getItem("users"));
      //********************************************* Server is Running ****************************************************
      if (isServerRunning) {
        let reg = false;
        console.log("Running");
        let userData = await _getUserData();
        console.log(userData, "USerData");
        let inVaild = userData.filter((item) => {
          console.log(item, "item");
          if (formData.email === item.Email) {
            console.log("Item -Email");
            return true;
          }
        });
        console.log(inVaild, "invlalid");
        if (inVaild.length > 0) {
          alert("Email Already Exist");
          return;
        } else {
          reg = true;
        }
        _toCheckServerisRunningOrNot();
      }
      //************************************************** Server is not Running ***************************************
      else if (!isServerRunning) {
        console.log("JSON Server is not Running");
        if (!Array.isArray(register) || register === "") {
          register = [];
          console.log(register, "register");
        }
        if (register == "") {
          console.log("jchjch");
          register.push({ email: formData.email, password: formData.password });
          console.log(formData, "Login Success - Step 1");
          Navigate("/authentication/sign-in");
        } else if (register !== "") {
          let inVaild = register.find((item) => {
            console.log(item, "item");
            if (formData.email === item.email) {
              return true;
              // console.log("Saran");
            }
          });
          if (inVaild) {
            console.log(inVaild, "invalid");
            alert("Email Already Exist");
            window.location.reload();
          } else {
            // If JSON server is not running, store data in local storage
            register.push({ email: formData.email, password: formData.password });
            // Redirect to login after successful registration
            Navigate("/authentication/sign-in");
          }
        }
      }
      console.log("Storing data in local storage:", formData);
      let str = JSON.stringify(register);
      localStorage.setItem("users", str);
      console.log(register, "registered data");
    }
  };
  // ************************************************* OnClick Submit ***************************************************
  const handleSubmit = () => {
    _nameValidation();
    _passwordValidation();
    _emailValidation();
    setErrors(newErrors);
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                name="name"
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => _validateField("name")}
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => _validateField("email")}
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                variant="standard"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => _validateField("password")}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default Registration;
