import { toCamelCase, toSnakeCase, getValueAtPath, setValueAtPath } from "../commonUtils"

export const entity = (yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'entities']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const dbConnSteps = ['core_lib', 'connections']
    let dbConns = getValueAtPath(data, dbConnSteps)
    if(!dbConns){
        setValueAtPath(data, dbConnSteps, [])
        dbConns = getValueAtPath(data, dbConnSteps)
    }
    if(dbConns.length === 0){
        alert('Create a Connection First!')
        return data
    }
    const newEntity = {
        key: `new_entity_${target.length + 1}`,
        db_connection: dbConns[0].key,
        columns: [
            {
                key: 'column_name',
                type: "VARCHAR",
                default: null,
            },
        ],
        is_soft_delete: true,
        is_soft_delete_token: true,
    }
    target.push(newEntity)
    return data
}

export const dataAccess = (yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'data_accesses']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const newDataAccess = {
        key: 'NewDataAccess' + (target.length + 1),
        entity: '',
        db_connection: '',
        functions: [],
        is_crud: true,
        is_crud_soft_delete: true,
        is_crud_soft_delete_token: true,
    }
    target.push(newDataAccess)
    return data
}

export const dbConnection = (yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'connections']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const dbConnName = `newdb${target.length + 1}`
    const envSteps = ['core_lib', 'env']
    let envTarget = getValueAtPath(data, envSteps)
    if(!envTarget){
        setValueAtPath(data, envSteps, {})
        envTarget = getValueAtPath(data, envSteps)
    }
    const newDbConn = {
        key: dbConnName,
        log_queries: false,
        create_db: true,
        session: {
            pool_recycle: 3200,
            pool_pre_ping: false,
        },
        url: {
            protocol: "postgresql",
            username: "${oc.env:"+dbConnName.toUpperCase()+"_USER}",
            password: "${oc.env:"+dbConnName.toUpperCase()+"_PASSWORD}",
            host: "${oc.env:"+dbConnName.toUpperCase()+"_HOST}",
            port: "${oc.env:"+dbConnName.toUpperCase()+"_PORT}",
            file: "${oc.env:"+dbConnName.toUpperCase()+"_DB}",
        },
    }

    envTarget[`${dbConnName.toUpperCase()}_USER`] = 'user'
    envTarget[`${dbConnName.toUpperCase()}_PASSWORD`] = 'password'
    envTarget[`${dbConnName.toUpperCase()}_HOST`] = 'localhost'
    envTarget[`${dbConnName.toUpperCase()}_PORT`] = 5432
    envTarget[`${dbConnName.toUpperCase()}_DB`] = dbConnName
    target.push(newDbConn)

    return data
}

export const cache = (yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'caches']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const newCacheName = `new_cache_${target.length + 1}`
    const newCache = {
        key: newCacheName,
        type: "memcached",
        url: {
            host: "${oc.env:" + newCacheName.toUpperCase() + "_HOST}",
            port: "${oc.env:" + newCacheName.toUpperCase() + "_PORT}",
        },
    }
    target.push(newCache)

    const envSteps = ['core_lib', 'env']
    let envTarget = getValueAtPath(data, envSteps)
    if(!envTarget){
        setValueAtPath(data, envSteps, {})
        envTarget = getValueAtPath(data, envSteps)
    }
    envTarget[`${newCacheName.toUpperCase()}_HOST`] = 'localhost'
    envTarget[`${newCacheName.toUpperCase()}_PORT`] = 11211

    return data

}

export const job = (yamlData, coreLibName) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'jobs']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const newName = `new_job_${target.length + 1}`
    const snakeCoreLib = toSnakeCase(coreLibName)
    const newJob = {
        key: newName,
        initial_delay: "0s",
        frequency: "",
        handler: {
            _target_:
                `${snakeCoreLib}.${snakeCoreLib}.jobs.${newName}.${toCamelCase(newName)}`,
        },
    }
    target.push(newJob)
    return data
}

export const columns = (path, yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = path.split('.')
    const target = getValueAtPath(data, steps)
    const newColumn = {
        key: `column_${target.length + 1}`,
        type: 'VARCHAR',
        default: '',
    }
    target.push(newColumn)
    return data
}

export const functions = (path, yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = path.split('.')
    const target = getValueAtPath(data, steps)
    const newFunc = {
        key: `func_${target.length + 1}`,
        result_to_dict: false,
        cache_key: "CACHE_KEY",
        cache_invalidate: false,
    }
    target.push(newFunc)
    return data
}

export const services = (yamlData) => {
    const data = JSON.parse(JSON.stringify(yamlData))
    const steps = ['core_lib', 'services']
    let target = getValueAtPath(data, steps)
    if(!target){
        setValueAtPath(data, steps, [])
        target = getValueAtPath(data, steps)
    }
    const newName = `NewService${target.length + 1}`
    const newService = {
        key: newName,
        data_access: '',
        functions: [],
    }
    target.push(newService)
    return data
}