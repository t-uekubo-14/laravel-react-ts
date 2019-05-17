import ActionTypes from '../actionTypes'
import { Talk } from './types'
import { Action, Dispatch } from 'redux'
import axios from 'axios'

// Input
export interface InputNewTalk extends Action {
  type: ActionTypes.INPUT_NEW_TALK
  newTalk: Talk
}
export const inputNewTalk = (newTalk: Talk): InputNewTalk => ({
  type: ActionTypes.INPUT_NEW_TALK,
  newTalk,
})

// Fetch Talks
export type FetchTalksRequestPayload = {}
export interface FetchTalksRequestAction extends Action {
  type: ActionTypes.FETCH_TALKS_REQUEST
}
export const fetchTalksRequest = (): FetchTalksRequestAction => ({
  type: ActionTypes.FETCH_TALKS_REQUEST,
})

export interface FetchTalksSuccessAction extends Action {
  type: ActionTypes.FETCH_TALKS_SUCCESS
  data: Talk[]
}
export const fetchTalksSuccess = (data: Talk[]): FetchTalksSuccessAction => ({
  type: ActionTypes.FETCH_TALKS_SUCCESS,
  data,
})

export interface FetchTalksFailureAction extends Action {
  type: ActionTypes.FETCH_TALKS_FAILURE
  message: string
}
export const fetchTalksFailure = (
  message: string
): FetchTalksFailureAction => ({
  type: ActionTypes.FETCH_TALKS_FAILURE,
  message,
})

// Insert Talk
export interface InsertTalkRequestAction extends Action {
  type: ActionTypes.INSERT_TALK_REQUEST
}
export const insertTalkRequest = (): InsertTalkRequestAction => ({
  type: ActionTypes.INSERT_TALK_REQUEST,
})

export interface InsertTalkSuccessAction extends Action {
  type: ActionTypes.INSERT_TALK_SUCCESS
  data: Talk[]
}
export const insertTalkSuccess = (data: Talk[]): InsertTalkSuccessAction => ({
  type: ActionTypes.INSERT_TALK_SUCCESS,
  data,
})

export interface InsertTalkFailureAction extends Action {
  type: ActionTypes.INSERT_TALK_FAILURE
  message: string
}
export const insertTalkFailure = (
  message: string
): InsertTalkFailureAction => ({
  type: ActionTypes.INSERT_TALK_FAILURE,
  message,
})

// Delete Talk
export interface DeleteTalkRequestAction extends Action {
  type: ActionTypes.DELETE_TALK_REQUEST
}
export const deleteTalkRequest = (): DeleteTalkRequestAction => ({
  type: ActionTypes.DELETE_TALK_REQUEST,
})

export interface DeleteTalkSuccessAction extends Action {
  type: ActionTypes.DELETE_TALK_SUCCESS
  data: Talk[]
}
export const deleteTalkSuccess = (data: Talk[]): DeleteTalkSuccessAction => ({
  type: ActionTypes.DELETE_TALK_SUCCESS,
  data,
})

export interface DeleteTalkFailureAction extends Action {
  type: ActionTypes.DELETE_TALK_FAILURE
  message: string
}
export const deleteTalkFailure = (
  message: string
): DeleteTalkFailureAction => ({
  type: ActionTypes.DELETE_TALK_FAILURE,
  message,
})

// --- HTTP ---

export const fetchTalks = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(fetchTalksRequest())
    return axios
      .get(`/api/talk`)
      .then(res => dispatch(fetchTalksSuccess(res.data)))
      .catch(err => dispatch(fetchTalksFailure(err)))
  }
}

export const insertTalk = (talk: Talk) => {
  const params = {
    message: talk.message,
  }
  return (dispatch: Dispatch<Action>) => {
    dispatch(insertTalkRequest())
    return axios
      .post(`/api/talk`, params)
      .then(res => dispatch(insertTalkSuccess(res.data)))
      .catch(err => dispatch(insertTalkFailure(err)))
  }
}

export const deleteTalk = (talk: Talk) => {
  const params = { data: talk }
  return (dispatch: Dispatch<Action>) => {
    dispatch(deleteTalkRequest())
    return axios
      .delete(`/api/talk/${talk.id}`, params)
      .then(res => dispatch(deleteTalkSuccess(res.data)))
      .catch(err => dispatch(deleteTalkFailure(err)))
  }
}
