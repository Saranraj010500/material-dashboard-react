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

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import data from "../../../Data/db.json";
import { CleaningServices } from "@mui/icons-material";

function Cover() {
  const [formData, setformData] = useState({
    Name: "",
    email: "",
    password: "",
  });
  console.log(formData);
  const [errors, setErrors] = useState({
    Name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e,'EEEEEE')
    setformData({ ...formData, [name]: value });
  };
  console.log(data, "saj");
  const submit = () => {
    const newErrors = {};
    let register = JSON.parse(localStorage.getItem("users"));
    if (formData.email === "" || formData.email === null) {
      newErrors.email = "Please enter email";
    } else if (formData.email !== "") {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      } else {
        newErrors.email = " ";
        let reg = false;
        if (!Array.isArray(data.users) || register === "") {
          reg = true;
        } else if (register !== "") {
          let inVaild = data.users.filter((item) => {
            console.log(item);
            if (formData.email === item.Email) {
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
          data.users.push({ Email: formData.email, Password: formData.password });
        }
        if (reg == true) {
          console.log("DFGHJK");
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Name: formData.Name,
              Email: formData.email,
              Password: formData.password,
            }),
          });
          localStorage.setItem("users", JSON.stringify(data));
        } else {
          alert("Something went wrong to register your account!.");
        }
      }
    }
    if (formData.Name === "") {
      newErrors.Name = "Please enter the name";
    } else if (formData.Name.length < 3) {
      newErrors.Name = "Please enter atleast 3 letters";
    } else if (formData.Name.length >= 3) {
      newErrors.Name = " ";
      if (register === "") {
      }
    }
    if (formData.password === "" || formData.password === null) {
      newErrors.password = "Please enter password";
    } else if (formData.password.length < 7) {
      newErrors.password = "Please enter atleast 7 letters";
    } else if (formData.password.length >= 7) {
      newErrors.password = " ";
    }
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
                name="Name"
                variant="standard"
                value={formData?.Name}
                onChange={handleInputChange}
                fullWidth
              />
              <MDBox color="red" fontSize="12px">
                {errors.Name}
              </MDBox>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                name="email"
                variant="standard"
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
                variant="standard"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
              />
              <MDBox color="red" fontSize="12px">
                {errors.password}
              </MDBox>
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
              <MDButton variant="gradient" color="info" fullWidth onClick={submit}>
                sign in
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
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
