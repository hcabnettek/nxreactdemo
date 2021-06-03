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

import { Route, useHistory } from 'react-router-dom';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('4mpr1usekm72');
  const url =
    query && `https://deckofcardsapi.com/api/deck/${query}/draw/?count=2`;
  const { status, data } = useFetch(url);
  const cards = data?.cards;
  const history = useHistory();
  console.log(cards);
  return (
    <>
      <Header />
      <div className="container">
        <div className="games-layout">
          {getAllGames().map((x) => (
            <Card
              key={x.id}
              className="game-card"
              onClick={() => {
                console.log('clicked');
                history.push(`/game/${x.id}`);
              }}
            >
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
