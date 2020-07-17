import {
  SET_SCREAM,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      // implemented this differently from the tutorial to maintain
      // react/redux best practice of not mutating the state in reducers
      return {
        ...state,
        screams: state.screams.map((scream) =>
          scream.screamId !== action.payload.screamId ? scream : action.payload
        ),
        scream: {
          ...state.scream,
          likeCount:
            state.scream.screamId === action.payload.screamId
              ? action.payload.likeCount
              : state.scream.likeCount,
        },
      };
    case DELETE_SCREAM:
      // implemented this differently from the tutorial to maintain
      // react/redux best practice of not mutating the state in reducers
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      // Updated comment count on top of adding the new comment to the array
      let commentCount = state.scream.commentCount || 0;
      return {
        ...state,
        screams: state.screams.map((scream) =>
          scream.screamId !== state.scream.screamId
            ? scream
            : { ...scream, commentCount: commentCount + 1 }
        ),
        scream: {
          ...state.scream,
          commentCount: commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
}
