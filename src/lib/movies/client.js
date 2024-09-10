class MoviesClient {
  async getMovies(page = 1) {
    try {
      const response = await fetch(`http://localhost:4000/v1/movies?page=${page}&page_size=5`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
      });
      if (!response.ok) {
        const error = await response.json();
        return { data: null, error };
      }
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getMovieById(id) {
    try {
      const response = await fetch(`http://localhost:4000/v1/movies/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
      });
      if (!response.ok) {
        const error = await response.json();
        return { data: null, error };
      }
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async createMovie(values) {
    try {
      const response = await fetch(`http://localhost:4000/v1/movies`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
        body: JSON.stringify({
          title: values.title,
          year: values.year,
          runtime: values.runtime,
          genres: values.genres,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return error;
      }
    } catch (error) {
      return error;
    }
  }
  async deleteMovie(id) {
    try {
      const response = await fetch(`http://localhost:4000/v1/movies/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
      });

      if (!response.ok) {
        const error = await response.json();
        return error;
      }
    } catch (error) {
      return error;
    }
  }
}

export const moviesClient = new MoviesClient();
