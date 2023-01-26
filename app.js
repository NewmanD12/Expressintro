// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
    title: "Star Wars",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Avengers",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/all-movies', (req, res) => {
    res.json({
        success : true, 
        movies : favoriteMovieList
    })
})

app.get('/single-movie/:titleToFind', (req, res) => {

    const title = req.params.titleToFind

    const filmFound = favoriteMovieList.filter((movie) =>{
        return movie.title.toLowerCase() === title.toLowerCase()
    })

    if(filmFound.length === 0){
        return res.json({
            success : false, 
            message : 'Film not found'
        })
    }

    res.json({
        success : true,
        film : filmFound
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})