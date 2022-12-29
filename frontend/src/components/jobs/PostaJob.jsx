import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Postjobs() {

    const [error,setError]= React.useState({
        status: false,
        message: ""
      })
    const [success,setSuccess]= React.useState(false);
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));
    const navigate= useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const company=document.getElementById("company").value;
    const locate=document.getElementById("locate").value;
    const position=document.getElementById("position").value;
    const companyDetails=document.getElementById("companyDetails").value;
    const salary=document.getElementById("salary").value;
    const skillrequire=document.getElementById("skillrequire").value;
    const catagory=document.getElementById("catagory").value;
    
    if(company,locate,position,companyDetails,salary,
        skillrequire,catagory){
    // console.log(company,locate,position,companyDetails,salary,
    //     skillrequire,catagory);
        axios.post(`${url}/jobs//auth/addjob`,{
            company,locate,position,companyDetails,salary,
            skillrequire,catagory},{
                headers:{
                    token:token
                }
            })
        .then((res)=>{
            console.log(res);
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
                message:err.response.data
            })
        })
        }else{
            setSuccess(false);
            setError({
                status:true,
                message:"Please fill all the fields. "
            })
        }
  };

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
            Hurray !! New Job posted Successfully.
            </Alert>
        }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Post a Job
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                //   autoComplete="given-name"
                //   name="firstName"
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="locate"
                  label="Located State"
                //   name="lastName"
                //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary Range(LPA/Year)"
                //   name="lastName"
                //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="catagory"
                  label="Job Catagory(Ex. IT/Sales/Bankign)"
                //   name="lastName"
                //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Position/Designation"
                //   name="email"
                //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                //   name="password"
                  label="Company Details/Website"
                  type="text"
                  id="companyDetails"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                //   name="password"
                  label="Required Skills"
                  type="text"
                  id="skillrequire"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}