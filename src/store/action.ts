import { LoggedInState, TypedDispatch} from './types';

export const logInToGame = (login: boolean, username: string): LoggedInState => ({
  type: 'Log_In',
  loggedIn: login,
  username: username, 
});

export const openDialog = (open: boolean) => ({
    type: "Open_Dialog",
    openDialog: open
})

export const logInSocket = (loginStatus: boolean, username: string, socket:any) => 
async(dispatch: TypedDispatch) => {
    socket.emit("login",{username: username})
     dispatch({type:"Log_In", 
      loggedIn:loginStatus, username:username
   })
  }