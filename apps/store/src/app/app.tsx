/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('1prdegnktgl3');
  const url =
    query && `https://deckofcardsapi.com/api/deck/${query}/draw/?count=2`;
  const { status, data } = useFetch(url);
  const cards = data?.cards;
  const history = useHistory();

  const [q2, setQ2] = useState('1prdegnktgl3');
  const url2 = q2 && `/api/games`;
  const { status: s2, data: d2 } = useFetch(url2);
  //: {value: string; suit: string; images: {svg: string;}}
  return (
    <>
      <Header />
      {Array.isArray(cards) &&
        cards.map(
          ({
            value,
            suit,
            images: { png },
          }: {
            value: string;
            suit: string;
            images: { png: string };
          }) => (
            <img src={png} alt={`${value} ${suit}`} key={`${value}-${suit}`} />
          )
        )}
      <div className="container">
        <div className="games-layout">
          {Array.isArray(d2) &&
            d2.map((g: any) => (
              <Card
                key={g.id}
                className="game-card"
                onClick={() => {
                  console.log('clicked');
                  history.push(`/game/${g.id}`);
                }}
              >
                <CardActionArea>
                  <CardMedia
                    className="game-card-media"
                    image={g.image}
                    title={g.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {g.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {g.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="game-rating"
                    >
                      <strong>Rating:</strong> {g.rating}
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
