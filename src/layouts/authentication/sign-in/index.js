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

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const submit = () => {
    const newErrors = {};
    let filter =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (formData.password == "" || formData.password == null) {
      newErrors.password = "Please enter password";
    }
    if (formData.email == "" || formData.email == null) {
      newErrors.email = "Please enter email";
    } else if (formData.email != "" && formData.password != "") {
      newErrors.email = "Please enter password";
      if (filter.test(formData.email)) {
        console.log("Saran");
        newErrors.email = " ";
        let login = JSON.parse(localStorage.getItem("users"));
        console.log(login, "Logins");
        let itemData = login.find((item) => {
          console.log("fghJKLjh");
          if (formData.email === item.Email && formData.password === item.Password) {
            let login_user = JSON.parse(localStorage.getItem("Users_login"));
            if (!Array.isArray(login_user)) {
              login_user = [];
              console.log(login_user, "gjjh");
            }
            if (login_user == "") {
              console.log("jchjch");
              login_user.push({ login_email: formData.email, login_password: formData.password });
              alert("Registered Successfully");
              navigate("/authentication/dashboard");
            }
            let str = JSON.stringify(login_user);
            localStorage.setItem("Users_login", str);
            console.log(login_user, "String");
            return true;
          }
        });
        if (!itemData) {
          alert("Invalid Useranme or Password");
          window.location.reload();
        }
        if (itemData) {
          console.log("gggggg", itemData.Email, itemData.Password);
          if (itemData.Email === formData.email && itemData.Password == formData.password) {
            navigate("/dashboard");
          } else if (itemData.Email == formData.email && itemData.Password != formData.password) {
            alert("Please Check your Username or Password");
          } else {
            alert("Invalid Useranme or Password");
          }
        }
      } else if (!filter.test(formData.email)) {
        newErrors.email = "Please enter valid email";
      }
    } else if (filter.test(formData.email)) {
      newErrors.email = " ";
    }
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
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <MDBox color="red" fontSize="12px">
                {errors.email}
              </MDBox>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
              />
              <MDBox color="red" fontSize="12px">
                {errors.password}
              </MDBox>
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
              <MDButton variant="gradient" color="info" fullWidth onClick={submit}>
                sign up
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
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
