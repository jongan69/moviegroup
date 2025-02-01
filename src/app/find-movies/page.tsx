"use client"
import { NextPage } from "next";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import TinderCard from 'react-tinder-card'
import styles from './FindMovies.module.css'
import Image from 'next/image';

// Define interfaces for type safety
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

// Define the Direction type based on the expected API
type Direction = 'left' | 'right' | 'up' | 'down';

// Define a custom type for the TinderCard instance
type CustomTinderCardInstance = {
  swipe: (dir?: Direction) => Promise<void>;
  restoreCard: () => Promise<void>;
};

const FindMovies: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(movies.length)
        .fill(0)
        .map(() => React.createRef<CustomTinderCardInstance>()),
    [movies.length]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/find-movies');
        const data = await response.json();
        console.log('API Response:', data);
        setMovies(data.movies);
        console.log('Movies set:', data.movies);
        setCurrentIndex(data.movies.length - 1); // Set to last index
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, movieTitle: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (movieTitle: string, idx: number) => {
    console.log(`${movieTitle} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current?.restoreCard();
    }
  };

  const swipe = useCallback(async (dir: string) => {
    if (canSwipe && currentIndex < movies.length) {
      await childRefs[currentIndex].current?.swipe(dir as Direction);
    }
  }, [canSwipe, currentIndex, movies.length, childRefs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          swipe('left');
          break;
        case 'ArrowRight':
          swipe('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canSwipe, currentIndex, movies.length, swipe]);

  console.log('Current movies state:', movies);

  if (movies.length === 0) return <div>No movies loaded (Length: {movies.length})</div>;
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardContainer}>
        {movies.map((movie: Movie, index: number) => (
          <TinderCard
            ref={childRefs[index]}
            key={movie.id}
            preventSwipe={['up', 'down']}
            className={styles.swipe}
            onSwipe={(dir) => swiped(dir, movie.title, index)}
            onCardLeftScreen={() => outOfFrame(movie.title, index)}
          >
            <div className={styles.card}>
              {movie.poster_path && (
                <Image 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-[20px]"
                  width={500}
                  height={750}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-[20px]">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-sm opacity-80">{movie.release_date}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-600">
        Use ← and → arrow keys or swipe to start matching movies with your friends!
      </div>
    </div>
  );
};

export default FindMovies;