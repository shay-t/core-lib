import { getValueAtPath } from "../commonUtils";

export const deleteData = (path, delData, yamData) => {
    let data = JSON.parse(JSON.stringify(yamData))
    if(path.includes('connections')){
        if(confirm('Deleting this connection will delete the enitites attached to this connection.') === true){
            data = deleteConnData(delData, data)
        }
    } else if (path.includes('caches')){
        data = deleteEnv(delData, data)
    }
    return data
}

const deleteConnData = (connData, yamData) => {
    const data = JSON.parse(JSON.stringify(yamData))
    const steps = ['core_lib', 'entities']
    let target = getValueAtPath(data, steps);
    const connName = connData[0].key
    const entities = []
    if(target.length > 0){
        target.forEach((entity, index) => {
            if(entity.db_connection !== connName){
                entities.push(entity)
            }
        });
        data.core_lib.entities = entities
        target = entities.slice(0)
    }
    return deleteEnv(connData, data)
}

const deleteEnv = (delData, yamData) => {
    const data = JSON.parse(JSON.stringify(yamData))
    const delName = delData[0].key
    delete data.core_lib.env[delName.toUpperCase() + '_USER']
    delete data.core_lib.env[delName.toUpperCase() + '_PASSWORD']
    delete data.core_lib.env[delName.toUpperCase() + '_HOST']
    delete data.core_lib.env[delName.toUpperCase() + '_PORT']
    delete data.core_lib.env[delName.toUpperCase() + '_DB']
    return data
} 

