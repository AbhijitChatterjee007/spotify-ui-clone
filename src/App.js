import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./Context/StateProvider";
import Player from "./components/Player/Player";
import { getTokenFromResponse } from "./Util/spotify";
import "./App.css";
import Login from "./components/Login/Login";

const s = new SpotifyWebApi();

function App() {
  const [ {token}, dispatch] = useStateValue();
  const [storedToken, setStoredToken]  = useState(JSON.stringify(sessionStorage.getItem('token')));
  const storedUser = JSON.stringify(sessionStorage.getItem('user'));

  useEffect(() => {
    // Set storedToken
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _storedToken = hash.access_token;
    console.log((token))
    if(token) {
      dispatch({
        type: "SET_TOKEN",
        storedToken: storedToken,
      });
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: JSON.stringify(sessionStorage.getItem('topArtists')),
      });
      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });
      dispatch({
        type: "SET_USER",
        user: storedUser,
      });
      dispatch({
        type: "SET_PLAYLIST",
        playlist: JSON.stringify(sessionStorage.getItem('playlist')),
      });
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: JSON.stringify(sessionStorage.getItem('playlists')),
      });
    }
    else {
      if (_storedToken) {
        setStoredToken(setSpotifyAttributes(_storedToken, dispatch));
    }
  }
  }, [token]);

  return (
    <div className="app">
      {storedToken !== 'null' && <Player spotify={s} />}
      {storedToken === 'null' && <Login />}
      
    </div>
  );
}

const setSpotifyAttributes = (storedToken, dispatch) => {
  s.setAccessToken(storedToken);
        dispatch({
          type: "SET_TOKEN",
          storedToken: storedToken,
        });
        s.getMyTopArtists().then((response) => {
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          });
        });

        dispatch({
          type: "SET_SPOTIFY",
          spotify: s,
        });
        s.getMe().then(async (user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
          s.getUserPlaylists(user.id).then((playlists) => {
            s.getPlaylist(playlists.items[0].id).then((playlist) => {
              dispatch({
                type: "SET_PLAYLIST",
                playlist: playlist,
              });
            });
            dispatch({
              type: "SET_PLAYLISTS",
              playlists,
            });
          });
        });
        return storedToken;
      }
export default App;
