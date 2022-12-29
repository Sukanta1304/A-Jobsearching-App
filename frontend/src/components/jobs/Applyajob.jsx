import { useParams } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';


function Applyajob() {
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));
    const {id}= useParams();
    console.log(id);
    const [job,setjob]= React.useState({});
    const [applied,setApplied]= React.useState([]);
    const [error,setError]= React.useState({
        status: false,
        message: ""
      })
      const [success,setSuccess]= React.useState(false);
    useEffect(() => {
    axios.get(`${url}/jobs/${id}`)
    .then((res)=>{
        console.log(res);
        setjob(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
    }, [id]);

    React.useEffect(() => {
      axios.get(`${url}/jobs/auth/alreadypplied`,{
          headers:{
              token:token
          }
      })
      .then((res)=>{
          // console.log(res);
          setApplied(res.data)
      })
      .catch((err)=>{
          console.log(err);
      })
      }, [token])

      const isApplied=(id)=>{
        console.log(id);
        let result= applied.filter((el)=>el.jobid==id);
        console.log(result);
        if(result.length>0){
          return true;
        }else{
          return false;
        }
      }
  

    const applyNow=()=>{
        const {_id,company,position,salary,locate}= job;
       // console.log({jobid:_id,company,position,salary,locate});
        axios.post(`${url}/jobs/auth/job/apply`,
                 {jobid:_id,company,position,salary,locate},
                {
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
                })
            })
            .catch((err)=>{
                console.log(err);
                setSuccess(false);
                setError({
                    status:true,
                    message:err.response.data
                })
            })
    }

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Job Details: 
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      {error.status &&
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        }
        {success &&
            <Alert severity="success">
             Successfull Applied !!!
            </Alert>
        }
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 0,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2">
                      {job.company}
                    </Typography>
                    <Typography variant="b" component="h3">
                     Role : {job.position}
                    </Typography>
                    <Typography variant="b" component="h5">
                      :: About Company ::
                    </Typography>
                    <Typography>
                     {job.companyDetails}
                    </Typography>
                    <Typography>
                     Category of Company : {job.catagory}
                    </Typography>
                    <Typography>
                     Company Location : {job.locate}
                    </Typography>
                    <Typography variant="b" component="h5">
                    :: Required Skills :: 
                    </Typography>
                    <Typography>
                    {job.skillrequire}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    disabled={isApplied(job._id)}
                    onClick={applyNow}
                    >Apply Now</Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
      </div>
  );
}

export default Applyajob ;