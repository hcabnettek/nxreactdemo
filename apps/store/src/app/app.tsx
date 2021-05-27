/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import './app.scss';
import { getAllGames } from '../fake-api';
import { useFetch } from '@nxdemo/store/custom-hooks';
import { StoreFeatureGameDetail } from '@nxdemo/store/feature-game-detail';
import { Header } from '@nxdemo/store/shared-ui';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Route, Link, useHistory } from 'react-router-dom';
import { useState } from 'react';



export const App = () => {

  const [query, setQuery] = useState('546sq5x03xnv');
  const url = query && `https://deckofcardsapi.com/api/deck/${query}/draw/?count=2`;
  const { status, data: { cards } } = useFetch(url);

  const history = useHistory();
  return (
    <>
    <Header />
    {status}
    {Array.isArray(cards) && cards.map((card: {image: string; code: string; value: string; suit: string}) => (<img src={card.image} key={card.code} alt={`{card.value} of {card.suit}`} />))}
    <button></button>
    <div className="container">
      <div className="games-layout">
      {getAllGames().map((x) => (
            <Card key={x.id} className="game-card" onClick={() => {
              console.log('clicked');
              history.push(`/game/${x.id}`)}}>
              <CardActionArea>
                <CardMedia
                  className="game-card-media"
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="game-rating"
                  >
                    <strong>Rating:</strong> {x.rating}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </div>
    <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
};

export default App;
