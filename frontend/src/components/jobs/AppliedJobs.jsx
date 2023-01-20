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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function AppliedJobs() {
    const [jobs,setJobs]= React.useState([]);
    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const token= JSON.parse(localStorage.getItem("jobPortalToken"));

    React.useEffect(() => {
    axios.get(`${url}/jobs/auth/alreadypplied`,{
        headers:{
            token:token
        }
    })
    .then((res)=>{
        // console.log(res);
        setJobs(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    }, [token])

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Applied jobs
          </Typography>
        </Toolbar>
      </AppBar>
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
                      Salary : {job.salary}/year
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/user/applyajob/${job.jobid}`} style={{textDecoration:"none"}}>
                    <Button size="small" variant='contained'>Detais</Button>
                    </Link>
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