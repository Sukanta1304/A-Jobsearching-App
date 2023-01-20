import { useParams } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { Button } from '@mui/material';


function Applyajob() {
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));
    const {id}= useParams();
    //console.log(id);
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
        //console.log(res);
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
        //console.log(id);
        let result= applied.filter((el)=>el.jobid==id);
        //console.log(result);
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
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={1}>
              <TableCell component="th" scope="row">
                Catagory of the Job
              </TableCell>
              <TableCell align="right">{job.catagory}</TableCell>
            </TableRow>
            <TableRow
              key={2}>
              <TableCell component="th" scope="row">
                Company name
              </TableCell>
              <TableCell align="right">{job.company}</TableCell>
            </TableRow>
            <TableRow
              key={3}>
              <TableCell component="th" scope="row">
                Position
              </TableCell>
              <TableCell align="right">{job.position}</TableCell>
            </TableRow>
            <TableRow
              key={4}>
              <TableCell component="th" scope="row">
                Salary
              </TableCell>
              <TableCell align="right">{job.salary} LPA</TableCell>
            </TableRow>
            <TableRow
              key={5}>
              <TableCell component="th" scope="row">
                Location
              </TableCell>
              <TableCell align="right">{job.locate}</TableCell>
            </TableRow>
            <TableRow
              key={6}>
              <TableCell component="th" scope="row">
                Require Skills
              </TableCell>
              <TableCell align="right">{job.skillrequire}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </main>
      <Button variant="contained" 
      disabled={isApplied(job._id)}
      onClick={applyNow}
      >Apply Now</Button>
      </div>
  );
}

export default Applyajob ;