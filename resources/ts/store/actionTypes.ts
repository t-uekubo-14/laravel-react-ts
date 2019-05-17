/**
 * - {Action Verb}[_{Resource Name}][_REQUEST|_SUCCESS|_FAILURE]
 * - Follow Laravel API Names
 */
enum ActionTypes {
  // Talk
  INPUT_NEW_TALK,
  FETCH_TALKS_REQUEST,
  FETCH_TALKS_SUCCESS,
  FETCH_TALKS_FAILURE,
  INSERT_TALK_REQUEST,
  INSERT_TALK_SUCCESS,
  INSERT_TALK_FAILURE,
  DELETE_TALK_REQUEST,
  DELETE_TALK_SUCCESS,
  DELETE_TALK_FAILURE,
  // User
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  INSERT_USER_REQUEST,
  INSERT_USER_SUCCESS,
  INSERT_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
}

export default ActionTypes
