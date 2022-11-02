import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import  './MovieCard.css';
import { Card, CardActions, CardMedia, Button , Typography} from '@mui/material';

export default function MovieCard({movie}) {
  
  
  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={movie.MovieName}
        height="319"        
        // width="200"        
        image = {movie.MoviePosterUrl}
      />
      <CardActions className='card-actions'>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
      {/* <CardContent>

        
      </CardContent> */}
      
    </Card>
    <div className="movie-info">
    <Typography gutterBottom  component="div" className='movie-title' >
          {movie.MovieName} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {movie.Languages.join(",")} 
        
        </Typography>
        </div>
    </>
  );
}
