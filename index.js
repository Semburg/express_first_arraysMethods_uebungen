import express from 'express'
import path from 'path'
import movies from './data.js'

// console.log(movies);

const __dirname = path.resolve()

// const express = require('express');
// const path = require('path');

// console.log(__dirname);

const PORT = process.env.PORT ?? 3001
const app = express();

app.use(express.static(path.resolve(__dirname, "static")))

// app.get("/", (req, res)=>{
//     // res.send("<h1>hola</h1>")
//     res.sendFile("./static/index.html", {root: __dirname})
// })

//? without static mw:

// app.get("/", (req, res)=>{
//     res.status(200).sendFile(path.resolve(__dirname, "static", "index.html"))
// })

// app.get("/features", (req, res)=>{
//     res.sendFile(path.join(__dirname, "static/features.html"))
// })

// ? with staic mw Line 14



//! other method for "res"  - download
app.get("/download", (req, res) => {
    res.download(path.join(__dirname, "static", "index.html"))
})
//!   below is not working with download method
//todo possible solutions?
// app.get("/download", (req, res)=>{
//     res.download("static/index.html", {root: __dirname + "/static/index.html"})
// })

//?  WORKING: all movies:

app.get('/films', (req, res) => {
    res.send(
        movies.map(item =>
            `
            <div style = 
            '
            text-align:center;
            background: #eee;
            width:40vw;
            margin: 10px auto;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            '  >
            <h1>${item.title}</h1><br>
            <h2>${item.director}</h2><br>
            <h3>${item.genre}</h3><br>
            <h3>${item.rate}</h3><br>
            <h3>${item.year}</h3><br> <br/>
            </div>
          `
        ).join('')
    )
    // res.send(movies)
})

app.get('/films/:year', (req, res) => {

    let filmsYear = []
    movies.filter(item => {
        if(item.year == req.params.year){
            filmsYear.push(item)
        }
    })

    console.log(filmsYear);
    

    res.send(
        filmsYear.map(item =>
            `
            <div style = 
            '
            text-align:center;
            background: #eee;
            width:40vw;
            margin: 10px auto;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            '  >
            <h1>${item.title}</h1><br>
            <h2>${item.director}</h2><br>
            <h3>${item.genre}</h3><br>
            <h3>${item.rate}</h3><br>
            <h3>${item.year}</h3><br> <br/>
            </div>
          `
        ).join('')
    )
    // res.send(movies)
})




app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}...`);
})


app.use((req, res) => {
    res.sendFile('./static/404.html', { root: __dirname })
})