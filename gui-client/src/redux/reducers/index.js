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
  projectImageUploadReducer,
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
  projectImageUpload: projectImageUploadReducer,
  commandList: commandListReducer,
  commandDetails: commandDetailsReducer,
  commandCreate: commandCreateReducer,
  commandUpdate: commandUpdateReducer,
  commandDelete: commandDeleteReducer,
});


export default rootReducer;
