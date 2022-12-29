import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

 function UserProfile() {
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));
    const [user, setUser] = React.useState({});
    const [error,setError]= React.useState({
        status: false,
        message: ""
      })
      const [success,setSuccess]= React.useState(false);
      const navigate= useNavigate();

    const handleChange=(e)=>{
        const {name,value}= e.target ;
        setUser({
            ...user,
            [name]:value
        })
    }

    React.useEffect(()=>{
        axios.get(`${url}/user/singleuser`,{
          headers:{
            token:token
          }
        })
        .then((res)=>{
          //console.log(res);
          setUser(res.data[0])
        })
        .catch((err)=>{
          console.log(err);
        })
      },[token])

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const {firstname,lastname,contact,address}= user;
    if(firstname==""|| lastname=="" || contact=="" || address==""){
        setError({
            status:true,
            message:"All fields are mandatory for update"
        });
        setSuccess(false);
    }else{
        axios.put(`${url}/user/edituser`,
        {firstname,lastname,contact,address},
        {
            headers:{
                token:token
            }
        }
        )
        .then((res)=>{
            // console.log(res);
            setSuccess(true);
            setError({
                status:false,
                message:""
            });
            setTimeout(()=>{
                navigate("/user/auth")
            },1000)
        })
        .catch((err)=>{
            console.log(err);
            setSuccess(false);
            setError({
                status:true,
                message: err.response.data
            })
        })
    }
  };


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
            Profile Successfully Updated
            </Alert>
        }
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={user?.firstname? user.firstname :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={user?.lastname? user.lastname :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user?.email? user.email :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact No."
                  name="contact"
                  value={user?.contact? user.contact :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Complete Address"
                  name="address"
                  value={user?.address? user.address :""}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Show Password"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default UserProfile ;