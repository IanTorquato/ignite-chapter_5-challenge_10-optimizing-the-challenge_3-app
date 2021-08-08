import { MovieCard } from "./MovieCard";

interface ContentProps {
  titleSelectedGenre: string

  movies: Array<{
    imdbID: string;
    title: string;
    poster: string;
    rating: string;
    runtime: string;
  }>;
}

export function Content({ titleSelectedGenre, movies }: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {titleSelectedGenre}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
        </div>
      </main>
    </div>
  )
}
