
import { Action } from '@reduxjs/toolkit';
import {store} from "../App";

export type TypedDispatch = typeof store.dispatch;

export const LOG_IN = "Log_In"
export interface UserState {
    loggedIn: boolean,
    openDialog: boolean,
    username: string,  
    
}

export interface OpenDialog {
    openDialog: boolean
}

export interface LoggedInState extends Action{
    type: typeof LOG_IN
    loggedIn: boolean
    username: string
}
export interface OpenDialogState extends Action{
    type: "Open_Dialog"
    openDialog: boolean
}



export type UserAction = | LoggedInState | OpenDialogState