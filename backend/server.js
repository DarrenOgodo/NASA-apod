// importing required modules
require('dotenv').config();
const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");

const port = process.env.PORT || 5050;
const app = express();
app.use(cors());
const API_KEY = process.env.API_KEY || "DEMO_KEY";

app.get('/api/apod', async(req,res) =>{
    const { date } = req.query;
    
    const params = new URLSearchParams({
        api_key: API_KEY,
        date: date
    });

    try{
        // console.log("Attempting to get apod data");
        const url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;

        const response = await fetch(url);

        if(response.ok){
            const data = await response.json();
            res.json(data);
        }else{
            res.status(500).json({error:'Failed to fetch from NASA'});
        }

    }catch(error){
        res.status(500).json({error:'Server error getting APOD data', error});
    }
})

if(process.env.NODE_ENV != "test"){
  app.listen(port, () => {
    console.log("Listening on " + port);
  });
}