import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material';

import {exerciseOptions, fetchData, youtubeOptions} from '../utils/fetchData';
import Detail from '../components/Detail';
import SimilarExercises from '../components/SimilarExercises';
import ExerciseVideos from '../components/ExerciseVideos';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([])
  // give access to the number in url
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async() => {
      const exerciseDbUrl = `https://exercisedb.p.rapidapi.com`;
      const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
      // console.log(exerciseVideosData);
      setExerciseVideos(exerciseVideosData.contents);
    }
    fetchExercisesData();
    // recalling function whenever id changes
  }, [id]);
  
  return (
    <Box>
        <Detail exerciseDetail={exerciseDetail}/>
        <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
        <SimilarExercises/>
    </Box>
  )
}

export default ExerciseDetail;
