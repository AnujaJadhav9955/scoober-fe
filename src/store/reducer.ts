import { UserState, UserAction } from "./types";

export const initialState: UserState = {
  loggedIn: false,
  openDialog: false,
  username: "", 
}

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case "Log_In":
      return {...state, loggedIn: action.loggedIn, username: action.username}
    case "Open_Dialog":
        return {...state, openDialog: action.openDialog}
    
  }
}

export default reducer;