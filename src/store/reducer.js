const initialState = {
  articleID: null,
  auth: false,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: action.data
      };
    case "SEND_ID":
      return {
        ...state,
        articleID: action.id
      };
    case "AUTH":
      return {
        ...state,
        auth: action.auth
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
