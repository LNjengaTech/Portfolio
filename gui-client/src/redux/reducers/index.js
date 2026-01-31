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

import {
  skillListReducer,
  skillCreateReducer,
  skillUpdateReducer,
  skillDeleteReducer,
} from './skillReducers';
import {
  experienceListReducer,
  experienceCreateReducer,
  experienceUpdateReducer,
  experienceDeleteReducer,
} from './experienceReducers';
import {
  articleListReducer,
  articleListAllReducer,
  articleDetailsReducer,
  articleCreateReducer,
  articleUpdateReducer,
  articleDeleteReducer,
} from './articleReducers';


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

  skillList: skillListReducer,
  skillCreate: skillCreateReducer,
  skillUpdate: skillUpdateReducer,
  skillDelete: skillDeleteReducer,

  experienceList: experienceListReducer,
  experienceCreate: experienceCreateReducer,
  experienceUpdate: experienceUpdateReducer,
  experienceDelete: experienceDeleteReducer,
  
  articleList: articleListReducer, // public
  articleListAll: articleListAllReducer, // admin
  articleDetails: articleDetailsReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
  articleDelete: articleDeleteReducer,
});


export default rootReducer;
