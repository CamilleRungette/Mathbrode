export default function(userSave = {}, action){
  if (action.type === 'signin'){
    return action
  }else if (action.type === 'logout'){
    action.connected = false
    return action.connected
  } else{
    return userSave
  }
}