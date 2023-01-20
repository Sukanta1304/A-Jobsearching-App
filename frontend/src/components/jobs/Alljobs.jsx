import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditaJob from './EditModal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function AllJobs() {
    const [jobs,setJobs]= React.useState([]);
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

    const [query,setQuery]= React.useState([]);

    React.useEffect(() => {
    axios.get(`${url}/jobs`)
    .then((res)=>{
        // console.log(res);
        setJobs(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    }, [token]);

    const getFiltered=()=>{
      axios.get(`${url}/jobs?q=${query}`)
      .then((res)=>{
        //console.log(res);
        setJobs(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const deleteJob=(id)=>{
      
      let text = "Are you sure you want to delete the Job?";
      if (confirm(text) == true) {
        axios.delete(`${url}/jobs/auth/delete/${id}`,{
          headers:{
            token:token
          }
        })
        .then((res)=>{
          //console.log(res);
          setSuccess({
            status: true,
            message: "Job deleted Successfully"
          });
          setError({
            status: false,
            message: ""
          })
        })
        .catch((err)=>{
          //console.log(err);
          setSuccess({
            status: false,
            message: ""
          });
          setError({
            status: true,
            message: "You are allowed to delete only the job you posted"
          })
        })
      } else {
        text = "You canceled!";
      }
  }

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Stack direction="row" spacing={50}>
          <Typography variant="h6" color="inherit" noWrap>
            Available jobs
          </Typography>
          <Box>
          <input type="text" 
          style={{width:'300px', height:'30px'}}
          placeholder='Search your favourite job by your skills or location '
          onChange={(e)=>setQuery(e.target.value)}
          />
          <Button size="medium" variant='contained'
          onClick={getFiltered}>Search</Button>
          </Box>
          </Stack>
          
        </Toolbar>
      </AppBar>
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
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 0,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 0}}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {jobs && jobs.map((job) => (
              <Grid item key={job._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3">
                      {job.company}
                    </Typography>
                    <Typography variant="b" component="h4">
                      Role : {job.position}
                    </Typography>
                    <Typography variant="b" component="h4">
                      Salary : {job.salary} LPA/year
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Stack direction="row" spacing={2}>
                  <Link to={`/user/applyajob/${job._id}`} style={{textDecoration:"none"}}>
                    <Button size="small" variant='contained'>Details</Button>
                  </Link>
                    <EditaJob id={job._id} />
                    <Button size="small" variant='contained'
                    onClick={()=>deleteJob(job._id)}>
                    Delete
                    </Button>
                  </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
      
  );
}