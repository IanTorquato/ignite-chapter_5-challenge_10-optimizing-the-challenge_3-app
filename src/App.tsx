import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  title: string;
  poster: string;
  rating: string
  runtime: string;
}

interface MovieResponseProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [titleSelectedGenre, setTitleSelectedGenre] = useState<string>('');

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    if(genres[0]) {
      api.get<MovieResponseProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {        
        setMovies(response.data.map(dataMovie => ({
          imdbID: dataMovie.imdbID,
          title: dataMovie.Title,
          poster: dataMovie.Poster,
          runtime: dataMovie.Runtime,
          rating: dataMovie.Ratings[0].Value
        })));
      });
  
      setTitleSelectedGenre(genres.find((genre) => genre.id === selectedGenreId)?.title || '')
    }
  }, [selectedGenreId, genres]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content titleSelectedGenre={titleSelectedGenre} movies={movies} />
    </div>
  )
}
