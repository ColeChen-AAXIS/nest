import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUrl, defaultValue } from 'app/shared/model/url.model';

export const ACTION_TYPES = {
  FETCH_URL_LIST: 'url/FETCH_URL_LIST',
  FETCH_URL: 'url/FETCH_URL',
  CREATE_URL: 'url/CREATE_URL',
  UPDATE_URL: 'url/UPDATE_URL',
  PARTIAL_UPDATE_URL: 'url/PARTIAL_UPDATE_URL',
  DELETE_URL: 'url/DELETE_URL',
  RESET: 'url/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUrl>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UrlState = Readonly<typeof initialState>;

// Reducer

export default (state: UrlState = initialState, action): UrlState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_URL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_URL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_URL):
    case REQUEST(ACTION_TYPES.UPDATE_URL):
    case REQUEST(ACTION_TYPES.DELETE_URL):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_URL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_URL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_URL):
    case FAILURE(ACTION_TYPES.CREATE_URL):
    case FAILURE(ACTION_TYPES.UPDATE_URL):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_URL):
    case FAILURE(ACTION_TYPES.DELETE_URL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_URL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_URL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_URL):
    case SUCCESS(ACTION_TYPES.UPDATE_URL):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_URL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_URL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/urls';

// Actions

export const getEntities: ICrudGetAllAction<IUrl> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_URL_LIST,
  payload: axios.get<IUrl>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUrl> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_URL,
    payload: axios.get<IUrl>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_URL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_URL,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IUrl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_URL,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUrl> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_URL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
