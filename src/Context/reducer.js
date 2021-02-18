export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  playlist: null,
  top_artists: null,
  playing: false,
  item: null,
  token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      sessionStorage.setItem('user', JSON.stringify(action.user))
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYING":
      sessionStorage.setItem('playing', action.playing)
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_ITEM":
      sessionStorage.setItem('item', JSON.stringify(action.playlist))
      return {
        ...state,
        item: action.item,
      };

    case "SET_PLAYLIST":
      sessionStorage.setItem('playlist', JSON.stringify(action.playlist))
      return {
        ...state,
        playlist: action.playlist,
      };

    case "SET_TOP_ARTISTS":
      sessionStorage.setItem('topArtists', JSON.stringify(action.top_artists))
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      sessionStorage.setItem('token', JSON.stringify(action.storedToken))
      return {
        ...state,
        token: action.storedToken,
      };

    case "SET_SPOTIFY":
      sessionStorage.setItem('spotify', JSON.stringify(action.spotify))
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      sessionStorage.setItem('playlists', JSON.stringify(action.playlists))
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
