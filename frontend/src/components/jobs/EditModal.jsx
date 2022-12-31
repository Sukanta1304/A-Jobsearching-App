import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditaJob({id}) {
  const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));
    const [error,setError]= React.useState({
      status: false,
      message: ""
    })
    const [success,setSuccess]= React.useState({
      status: false,
      message: ""
    });
  const [job, setJob] = React.useState({})
//console.log(id);
React.useEffect(() => {
axios.get(`${url}/jobs/${id}`)
.then((res)=>{
  //console.log(res); 
  setJob(res.data)
})
.catch((err)=>{
  console.log(err);
})
}, [id])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange=(e)=>{
    const {name,value}= e.target;
    setJob({
      ...job,
      [name]:value
    })
  }

  const handleSubmit=()=>{
    const {catagory,company,companyDetails,locate,position,salary,skillrequire}= job;
    // console.log(catagory,company,companyDetails,locate,position,salary,skillrequire);
    axios.put(`${url}/jobs/auth/presentjob/${id}`,
    {catagory,company,companyDetails,locate,position,salary,skillrequire},
    {
      headers:{
        token: token
      }
    })
    .then((res)=>{
      console.log(res);
      setSuccess({
        status: true,
        message: res.data
      });
      setError({
        status: false,
        message: ""
      })
    })
    .catch((err)=>{
      console.log(err);
      setSuccess({
        status: false,
        message: ""
      });
      setError({
        status: true,
        message: err.response.data
      })
    })
    setTimeout(()=>{
      handleClose();
    },1000)
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit A job"}</DialogTitle>
        <DialogContent>
        <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit a Job
          </Typography>
          {error.status &&
          <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.message}
          </Alert>
        }
        {success.status &&
            <Alert severity="success">
            {success.message}
            </Alert>
        }
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="company"
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  autoFocus
                  value={job?.company ? job.company :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="locate"
                  label="Located State"
                  name="locate"
                  value={job?.locate ? job.locate :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary Range(LPA/Year)"
                  name="salary"
                  value={job?.salary ? job.salary :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="catagory"
                  label="Job Catagory(Ex. IT/Sales/Bankign)"
                  name="catagory"
                  value={job?.catagory ? job.catagory :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Position/Designation"
                  name="position"
                  value={job?.position ? job.position :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="companyDetails"
                  label="Company Details/Website"
                  type="text"
                  id="companyDetails"
                  value={job?.companyDetails ? job.companyDetails :""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="skillrequire"
                  label="Required Skills"
                  type="text"
                  id="skillrequire"
                  value={job?.skillrequire ? job.skillrequire :""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}