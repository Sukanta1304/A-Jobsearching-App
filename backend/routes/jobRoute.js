const {Router}= require("express");
const { Authentication } = require("../middlewares/Authentication");
const { JobModel, ApplyJobModel } = require("../model/jobModel");

const jobRouter= Router();

jobRouter.get("/",async(req,res)=>{
    const jobs= await JobModel.find();
    if(jobs){
        const {catagory,location}= req.query;
        if(catagory){
            const jobs= await JobModel.find({catagory});
            if(jobs){
                res.status(200).send(jobs)
            }else{
                res.status(404).send(`No jobs found`)
            }
        }
        else if(location){
            const jobs= await JobModel.find({locate});
            if(jobs){
                res.status(200).send(jobs)
            }else{
                res.status(404).send(`No jobs found`)
            } 
        }
        else if(catagory && location){
            const jobs= await JobModel.find({catagory,locate});
            if(jobs){
                res.status(200).send(jobs)
            }else{
                res.status(404).send(`No jobs found`)
            } 
        }else{
            res.status(200).send(jobs)
        }
        
    }
    else{
        res.status(404).send(`No jobs found`)
    }
})

jobRouter.get("/:id",async(req,res)=>{
    const {id}= req.params;
    const job= await JobModel.findOne({_id:id});
    if(job){
        res.status(200).send(job)
    }else{
        res.status(404).send(`No job found for this id`)
    }
})

jobRouter.post("/auth/addjob",Authentication,async(req,res)=>{
    const {id}= req.body;
    const { company,locate,position,companyDetails,salary,skillrequire,
            catagory}= req.body;
    
    const newJob= new JobModel({
        company,locate,position,companyDetails,salary,skillrequire,
        catagory,postby:id,appliedby:""
    })
    await newJob.save();
    res.status(201).send(`New job posted successsfully!`)
})

jobRouter.get("/auth/alreadypplied",Authentication,async(req,res)=>{
const {id}=req.body;
const appliedjobs= await ApplyJobModel.find({user:id});
if(appliedjobs){
    res.status(200).send(appliedjobs)
}else{
    res.status(404).send("no jobs found")
}
})

jobRouter.put("/auth/presentjob/:jobid",Authentication,async(req,res)=>{
const {id}= req.body;
const {jobid}= req.params;
const job= await JobModel.findByIdAndUpdate({_id:jobid, user:id},{...req.body});
if(job){
    res.status(200).send(`Job successfully updated`)
}else{
    res.status(500).send(`Internal server error`)
}
})

//-------------------------------------------------------------------


jobRouter.post("/auth/job/apply",Authentication,async(req,res)=>{
    const {id}= req.body;
    const {jobid,company,position,salary,locate}= req.body;
    const existJob= await ApplyJobModel.findOne({jobid,user:id});
    if(existJob){
        res.status(409).send(`You have already applied for this job`)
    }else{
        const newApply= new ApplyJobModel({
            jobid,company , position,salary,locate, user: id
        });
        newApply.save(); 
        res.status(200).send("Successfully aplied!")
    }
})

jobRouter.delete("/auth/delete/:jobid",Authentication,async(req,res)=>{
    const {id}= req.body;
    const {jobid}= req.params;
    const existJob= await ApplyJobModel.findOneAndDelete({jobid,user:id});
    if(existJob){
        res.status(200).send(`Job successfully deleted`)
    }else{
        res.status(404).send(`No jobs found`)
    }
})


module.exports={jobRouter}