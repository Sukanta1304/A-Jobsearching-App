import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "@mui/material/Link";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

function ForgotPassword() {
  const url= import.meta.env.VITE_APP_BACKEND_URL;
  const [open, setOpen] = React.useState(false);
  const [xemail,setXemail]= React.useState("")
  const [value, setValue] = React.useState("one");
  const [success, setSuccess] = React.useState({
    status:false,
    message:null
  });
  const [error, setError] = React.useState({
    status: false,
    message: null
  });
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("one")
  };

  const sendOtp=()=>{
    const name=document.getElementById("name").value;
    setXemail(name)
    axios.patch(`${url}/user/auth/forgotpassword`,{email:name})
    .then((res)=>{
      console.log(res);
      setSuccess({
        status:true,
        message:res.data
      });
      setValue("two");
      setError({status:false, message:null})
    })
    .catch((err)=>{
      console.log(err);
      setError({status:true, message:err.response.data});
      setSuccess({
        status:false,
        message:null
      });
    })
  }

  const changePassword=()=>{
    const inv= document.getElementById("outlined-read-only-input").value;
    const name=document.getElementById("outlined-required").value;
    const password= document.getElementById("newpassword").value;
    const Cpassword= document.getElementById("confirmpassword").value;
    if(password!==Cpassword){
      setError({
        status: true,
        message:"New Password and confirm password must be same."
      });
      setSuccess(false);
    }else{
      axios.put(`${url}/user/auth/resetpassword`,{email:inv,otp:name,password})
      .then((res)=>{
        // console.log(res);
        setSuccess({
          status:true,
          message:res.data
        });
        setError({
          status:false,
          message:null
        });
        setTimeout(()=>{
          handleClose();
        },1000)
      })
      .catch((err)=>{
        // console.log(err);
        setSuccess({
          status:false,
          message:null
        });
        setError({
          status:true,
          message:err.response.data
        })
      })
    }
  }
  return (
    <div>
      <Link  onClick={handleClickOpen} variant="body2">
        Forgot password?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot My Password</DialogTitle>
        <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Enter Email Id" disabled={value=="two"}/>
        <Tab value="two" label="Enter OTP" />
      </Tabs>
      <div>
        {value==="one"?
        <div>
        {error.status &&
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        }
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your registered email address here. We
            will send OTP in your registered email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={sendOtp}>Send</Button>
      </DialogActions>
      </div>
        :
        <div>
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
            <DialogContent>
            <TextField
                disabled
                id="outlined-read-only-input"
                label="Email Id"
                defaultValue= {xemail}
                InputProps={{
                   readOnly: true,
                }}
        />
        <br />
        <br />
        <TextField
          autoFocus
          required
          id="outlined-required"
          label="One-Time-Password"
        />
        <br />
        <br />
        <TextField
          required
          id="newpassword"
          label="New Password"
          type="text"
        />
        <br />
        <br />
        <TextField
          required
          id="confirmpassword"
          label="Confirm Password"
          type="password"
        />
            </DialogContent>
            <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={changePassword}>RESET</Button>
      </DialogActions>
        </div>}
      </div>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;