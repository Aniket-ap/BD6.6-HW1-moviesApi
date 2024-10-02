const express = require('express');
const app = express();
const { getAllMovies, getMovieById } = require('./movies');
app.use(express.json());

app.get('/movies', (req, res) => {
  const movies = getAllMovies();
  if (movies.length > 0) {
    res.status(200).json({ movies });
  } else {
    res.status(404).json({ error: 'No movies found' });
  }
});

app.get('/movies/details/:id', (req, res) => {
  const movie = getMovieById(parseInt(req.params.id, 10));
  if (movie) {
    res.status(200).json({ movie });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

module.exports = { app };
