export default function(itemSave = [], action){
  let itemSaveCopy;
  if (action.type === 'carted'){
    itemSaveCopy = [...itemSave]
    itemSaveCopy.push(action.item)
    return itemSaveCopy;
  }else if (action.type === 'delete'){
    itemSaveCopy = [...itemSave]
    itemSaveCopy.splice(action.position, 1)
    return itemSaveCopy
  }else if (action.type === 'reset') {
    itemSaveCopy = [...itemSave]
    itemSaveCopy.splice(0, itemSaveCopy.length)
    return []
  } else {
    return itemSave;
  }
}