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

import data from "userdata.json";
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
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [isServerRunning, setIsServerRunning] = useState(false);
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
  const handleSubmit = async () => {
    let register = JSON.parse(localStorage.getItem("users"));
    let reg = false;
    if (isServerRunning) {
      if (!Array.isArray(data.users) || register === "") {
        reg = true;
      } else if (register !== "") {
        let inVaild = data.users.filter((item) => {
          console.log(item);
          if (formData.email === item.Email) {
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
        // data.users.push({Email: formData.email, Password: formData.password });
      }
      try {
        // If the server is running, send data to JSON server
        const response = await fetch("http://localhost:5000/users", {
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
          console.log("Data sent to JSON server:", formData);
        } else {
          console.error("Failed to send data to JSON server.");
        }
      } catch (error) {
        console.error("Error occurred while sending data to JSON server:", error);
      }
    } else {
      if (!Array.isArray(data.users) || register === "") {
        reg = true;
      } else if (register !== "") {
        let inVaild = data.users.filter((item) => {
          console.log(item);
          if (formData.email === item.Email) {
            console.log("DFGHJKL");
            return true;
          }
        });
        console.log(inVaild);
        if (inVaild.length > 0) {
          alert("Email Already Exist");
          return;
        } else {
          reg = true;
        }

        // data.users.push({Email: formData.email, Password: formData.password });
      }
    }
    // const validateForm = () => {
    //   let isValid = true;
    //   const newErrors = {};

    //   // Email validation
    //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
    //     newErrors.email = "Enter a valid email address";
    //     isValid = false;
    //   }

    //   if (!formData.password.trim()) {
    //     newErrors.password = "Password is required";
    //     isValid = false;
    //   }

    //   setErrors(newErrors);
    //   return isValid;
    // };

    // const handleSubmit = () => {
    //   if (validateForm()) {
    //     // Simulate user authentication by checking the credentials
    //     // (Replace this with actual authentication logic)

    //     // console.log(login);
    //     console.log(data, "DATA");
    //     if (!Array.isArray(data.users) || register === "") {
    //       reg = true;
    //     } else if (register !== "") {
    //       let inVaild = data.users.filter((item) => {
    //         console.log(item);
    //         if (formData.email === item.Email) {
    //           console.log("DFGHJKL");
    //           return true;
    //         }
    //       });
    //       console.log(inVaild);
    //       if (inVaild.length > 0) {
    //         alert("Email Already Exist");
    //         return;
    //       } else {
    //         reg = true;
    //       }

    //       // data.users.push({Email: formData.email, Password: formData.password });
    //     }
    //   }
    // };
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
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              {/* <MDBox color="red" fontSize="12px">
                {errors.email}
              </MDBox> */}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              {/* <MDBox color="red" fontSize="12px">
                {errors.password}
              </MDBox> */}
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
