const request = require('supertest');
const { app } = require('../index');
const { getAllMovies, getMovieById } = require('../movies');
const http = require('http');

jest.mock('../movies', () => ({
  ...jest.requireActual('../movies'),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Movie API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /movies should return all movies with status 200', async () => {
    const mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
    ];
    getAllMovies.mockReturnValue(mockMovies);

    const response = await request(server).get('/movies');
    expect(response.status).toBe(200);
    expect(response.body.movies).toEqual(mockMovies);
  });

  it('GET /movies/details/:id should return a specific movie by ID with status 200', async () => {
    const mockMovie = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };
    getMovieById.mockReturnValue(mockMovie);

    const response = await request(server).get('/movies/details/1');
    expect(response.status).toBe(200);
    expect(response.body.movie).toEqual(mockMovie);
  });

  it('GET /movies should correctly invoke the getAllMovies function', async () => {
    const mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
    ];
    getAllMovies.mockReturnValue(mockMovies);

    const response = await request(server).get('/movies');
    expect(getAllMovies).toHaveBeenCalled();
    expect(response.body.movies).toEqual(mockMovies);
  });
});
