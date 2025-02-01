import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    try {

      // Calculate dates for the past 3 months
      const currentDate = new Date();
      const maxDate = currentDate.toISOString().split('T')[0]; // Today's date
      const pastDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
      const minDate = pastDate.toISOString().split('T')[0]; // Date 3 months ago

      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWRlMzEwZmRmMDViNTUyZDQ5NDcyNzMxMWQyYjNmMyIsIm5iZiI6MTczODQyNzQxMi43MjIsInN1YiI6IjY3OWU0YzE0MGQxOWYzMGFjMTk1NDkzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vsDdCgNPCDTEZ2rFPxmDxMaPYqAEjpAcyjg45NPbZN8',
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      const movies = data.results;

      return Response.json({ movies: movies });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Failed to find movies' });
    }
} 