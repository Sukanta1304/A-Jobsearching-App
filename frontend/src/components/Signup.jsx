import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

function Signup() {
  const url= import.meta.env.VITE_APP_BACKEND_URL;
    const [show, setShow] = useState(false);
    const [error,setError]= useState({
      status: false,
      message: ""
    })
    const [success,setSuccess]= useState(false);
    const navigate= useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const firstname= document.getElementById("firstName").value;
        const lastname= document.getElementById("lastName").value;
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;

        if(firstname==""|| lastname==""|| email==""|| password==""){
          setError({
            status:true,
            message:"All fields are mandatory"
          });
          setSuccess(false)
        }else{
          axios.post(`${url}/user/register`,{firstname,lastname,email,password})
          .then((res)=>{
          // console.log(res);
          setSuccess(true);
          setError({status:false,message:""});
          setTimeout(()=>{
            navigate("/signin")
          },1000)
          }).catch((err)=>{
            // console.log(err);
            setError({
            status:true,
            message:err?.response?.data
            });
          })
        }

      }; 

    

      const handleShow=(e)=>{
        e.target.checked? setShow(true): setShow(false)
      }

      return (
        <div>
          {error.status &&
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        }
        {success &&
            <Alert severity="success">
            Registration Successfull — Goto Login page & check it out!
            </Alert>
        }
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={show?"text":"password"}
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" onChange={handleShow}/>
                      }
                      label="Show Password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/signin">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      );
}

export default Signup