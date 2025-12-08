//combined all reducers here(root reducer) to be used in the store
import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
} from './userReducers';
import {
  projectListReducer,
  projectDetailsReducer,
  projectCreateReducer,
  projectUpdateReducer,
  projectDeleteReducer,
} from './projectReducers';
import {
  commandListReducer,
  commandDetailsReducer,
  commandCreateReducer,
  commandUpdateReducer,
  commandDeleteReducer,
} from './commandReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projectList: projectListReducer,
  projectDetails: projectDetailsReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  commandList: commandListReducer,
  commandDetails: commandDetailsReducer,
  commandCreate: commandCreateReducer,
  commandUpdate: commandUpdateReducer,
  commandDelete: commandDeleteReducer,
});

export default rootReducer;