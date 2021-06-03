import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './store-feature-game-detail.module.scss';

type TParams = { id: string };

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
  const [state, setState] = useState<{
    data: { image: string; name: string };
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: {
      image: '',
      name: '',
    },
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    const gameId = props.match.params.id;
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, [props.match.params.id]);

  return (
    <div className="container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data == null ? (
        ''
      ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data.image || 'https://baconmockup.com/300/200'}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default StoreFeatureGameDetail;
