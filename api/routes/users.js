const { Router } = require('express');
const axios = require("axios")
const baseUrl = "https://advenio.noip.me:10080/rest/totemappoinmentscontroller";


const router = Router();

router.get('/users', (req,res,next)=>{
    res.send("OK")
});

router.get('/users/:type/:id', async (req, res, next)=> {
    console.log(req.params);
    const faker = require('faker');
    faker.locale="es_MX";
    try {
        let namesArray = []
        const { data, status } = await axios.get(baseUrl+`/findPatientByDocument`,{ params: {documenttype: req.params.type, documentnumber: req.params.id}});
        let nameOne = faker.name.findName();
        let nameTwo = faker.name.findName(); 
        namesArray.push(nameOne);
        namesArray.push(nameTwo);
        namesArray.push(`${data.firstname} ${data.lastname}`);
        //console.log(namesArray);
        res.json({ names : namesArray.sort(function() { return 0.5 - Math.random() })})
    }
    catch(e){
        console.log("Error ",e)
        let statusError = e.response && e.response.status ? e.response.status : 500;
        res.sendStatus(statusError)
    }
    
})

router.get('/users/:type/:id/verify/:name', async (req, res, next)=> {
    console.log(req.params);
    try {
    const { data, status } = await axios.get(baseUrl+`/findPatientByDocument`,{ params: {documenttype: req.params.type, documentnumber: req.params.id}});
    console.log(data)
    if (`${data.firstname} ${data.lastname}` == req.params.name) {
        res.json({ documentType: data.documentType.documentType, documentNumber: data.clinichistoryid})
    } 
    else {
        res.sendStatus(404)
    }
    }
    catch(e){
        console.log("Error ",e)
        //res.sendStatus(e.response.status)
        res.sendStatus(500)
    }
    
})

module.exports = router;