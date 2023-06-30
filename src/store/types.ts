
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {store} from "../App";
import reducer from './reducer';

export type ReduxState = ReturnType<typeof reducer>;

export type TypedDispatch = typeof store.dispatch;
export type TypedThunk<R = void> = ThunkAction<R, ReduxState, unknown, Action>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;


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