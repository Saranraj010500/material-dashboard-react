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
import { useState } from "react";
import { useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

const Login = () => {
  const newErrors = {};
  let register = JSON.parse(localStorage.getItem("users"));
  const Navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
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

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    // Check if the JSON server is running
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000"); // Change the URL to your JSON server endpoint
        if (response.ok) {
          setIsServerRunning(true);
        } else {
          setIsServerRunning(false);
        }
      } catch (error) {
        setIsServerRunning(false);
      }
    };
    // Call the function to check the server status
    checkServerStatus();
  }, []);

  const _toCheckServerisRunningOrNot = async () => {
    try {
      console.log("try");
      // If the server is running, send data to JSON server
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.email,
          password: formData.password,
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
  // ************************************************* Email Validation ***************************************************
  const _emailValidation = async () => {
    if (formData.email === "" || formData.email === null) {
      newErrors.email = "Please enter email";
    } else if (formData.email !== "") {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      } else {
        newErrors.email = " ";
        let storage = localStorage.getItem("users");
        console.log(storage, "Storage");
        if (storage !== null) register = JSON.parse(localStorage.getItem("users"));
        //********************************************* Server is Running ****************************************************
        if (isServerRunning) {
          let reg = false;
          console.log("Running");
          let userData = await _getUserData();
          console.log(userData, "UserData");
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
          register.push({ email: formData.email, password: formData.password });
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
    }
  };

  const handleSubmit = async () => {
    _passwordValidation();
    _emailValidation();
    setErrors(newErrors);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
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
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default Login;
