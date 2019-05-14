import ActionTypes from '../actionTypes'
import { Talk } from './types'
import { Action, Dispatch } from 'redux'
import axios from 'axios'

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
export type InsertTalkRequestPayload = {}
export interface InsertTalkRequestAction extends Action {
  type: ActionTypes.INSERT_TALK_REQUEST
  payload: InsertTalkRequestPayload
}
export const insertTalkRequest = (
  payload: InsertTalkRequestPayload
): InsertTalkRequestAction => ({
  type: ActionTypes.INSERT_TALK_REQUEST,
  payload,
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
export type DeleteTalkRequestPayload = {}
export interface DeleteTalkRequestAction extends Action {
  type: ActionTypes.DELETE_TALK_REQUEST
  payload: DeleteTalkRequestPayload
}
export const deleteTalkRequest = (
  payload: DeleteTalkRequestPayload
): DeleteTalkRequestAction => ({
  type: ActionTypes.DELETE_TALK_REQUEST,
  payload,
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
  return (dispatch: Dispatch) => {
    dispatch(fetchTalksRequest())
    return axios
      .get(`/api/talk`)
      .then(res => dispatch(fetchTalksSuccess(res.data)))
      .catch(err => dispatch(fetchTalksFailure(err)))
  }
}

// let nextTodoId = 0
// export const addTodo = (content: any) => ({
//   type: ActionTypes.ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content,
//   },
// })

// export const onNumClick = number => ({
//   type: ActionTypes.INPUT_NUMBER,
//   number,
// })
// export const onPlusClick = () => ({
//   type: ActionTypes.PLUS,
// })

// export function postTalk(data: any) {
//   return (dispatch: any) => {
//     dispatch(postTalkRequest())
//     axios
//       .post('/todo_list', data)
//       .then(response => dispatch(postTalkResponse(response.data.result)))
//       .catch(() => dispatch(postTalkResponse(false)))
//   }
// }
// function postTalkRequest() {
//   return {
//     type: ActionTypes.POST_TALK_REQUEST,
//   }
// }
// function postTalkResponse(result: any) {
//   return {
//     type: ActionTypes.POST_TALK_RESULT,
//     result,
//   }
// }
