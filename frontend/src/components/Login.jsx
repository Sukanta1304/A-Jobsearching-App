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
import ForgotPassword from './ForgotPassword';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

function Login() {
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const [show, setShow] = useState(false);
    const navigate= useNavigate();
    const [error,setError]= useState({
      status: false,
      message: ""
    })
    const [success,setSuccess]= useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        if(email==""|| password==""){
          setError({
            status:true,
            message:"Please Enter Email and Password Correctly"
          })
          setSuccess(false)
        }else{
          axios.post(`${url}/user/login`,{email,password})
          .then((res)=>{
            // console.log(res);
          setSuccess(true);
          setError({
            status:false,
            message:""
          });
          localStorage.setItem("jobPortalToken",JSON.stringify(res.data.token))
          setTimeout(()=>{
            navigate("/user/auth")
          },1000)
          })
          .catch((err)=>{
            // console.log(err.response.data);
            setError({
              status:true,
              message: err.response.data
            });
            setSuccess(false);
          })
        }
        // const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get("email"),
        //   password: data.get("password")
        // });
       
      };

      const handleShow=(e)=>{
        e.target.checked? setShow(true): setShow(false)
      }

      return (
        <Container component="main" maxWidth="xs">
        {error.status &&
          <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.message}
          </Alert>
        }
        {success &&
            <Alert severity="success">
            Login Successfull
            </Alert>
        }
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={show ? "text":"password"}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" onChange={handleShow} />}
                label="Show Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/signup">
                  Don't have an account? Sign Up?
                  </Link>
                </Grid>
                <Grid item>
                  <ForgotPassword/>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      );
}

export default Login;