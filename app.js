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

app.post('/new-movie', (req, res) =>{
    const newMovie = {}

    if(req.body.title === undefined || typeof(req.body.title) !== 'string'){
		res.json({
			success : false,
			message : 'movie title is required and must be a string'
		})
		return
	}

	if(req.body.starRating === undefined || typeof(req.body.starRating) !== 'number'){
		res.json({
			success : false,
			message : 'Star rating is required and must be a number'
		})
		return
	}

	if(req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== 'boolean'){
		res.json({
			success : false,
			message : 'true or false is required'
		})
		return
	}

    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating
    newMovie.isRecommended = req.body.isRecommended
    newMovie.createdAt = new Date(),
    newMovie.lastModified = new Date()
    favoriteMovieList.push(newMovie)
    res.json({
        success : true,
        newMovie : newMovie
    })
})

app.put('/update-movie/:titleToUpdate', (req, res) => {

    const titleToFind = req.params.titleToUpdate

    const originalMovie = favoriteMovieList.find((movie) => {
        return movie.title === titleToFind
    })

    const originalMovieIndex = favoriteMovieList.findIndex((movie) => {
        return movie.title === titleToFind
    })

    if(!originalMovie) {
        res.json({
            success : false, 
            message : 'Could not find movie in movie list'
        })
        return
    }

    const updatedMovie = {}

    if(req.body.title !== undefined){
        updatedMovie.title = req.body.title
    } else {
        updatedMovie.title = originalMovie.title
    }

    if(req.body.starRating !== undefined){
        updatedMovie.starRating = req.body.starRating
    } else {
        updatedMovie.starRating = originalMovie.starRating
    }

    if(req.body.isRecommended !== undefined){
        updatedMovie.isRecommended = req.body.isRecommended
    } else {
        updatedMovie.isRecommended = originalMovie.isRecommended
    }
    updatedMovie.lastModified = new Date()
    updatedMovie.createdAt = originalMovie.createdAt

    // console.log(originalMovie)
    // console.log(originalMovieIndex)

    favoriteMovieList[originalMovieIndex] = updatedMovie

    res.json({
        success: true,
        updatedMovie : updatedMovie
    })

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})