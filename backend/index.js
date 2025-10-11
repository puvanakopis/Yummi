import express from 'express';

const app = express()
const PORT = process.env.PORT || 4000


app.get('/', (req, res)=>{
    res.send('Api is working')
})


app.listen(PORT, ()=>console.log('Server is working'))