import { getBoolean } from "../utils/commonUtils";

export const dataAccessFields = (path, yamlData) => {
    const pathSplit = path.split('.')
    const dataAccessList = yamlData.core_lib.data_accesses
    const index = pathSplit.at(pathSplit.indexOf('data_accesses')+1)
    const dataAccess = dataAccessList[index]
    const dbConnections = yamlData.core_lib.connections
    const fields = []
    const dbConn = []
    const keyPrefix = `core_lib.data_accesses.${index}`
    dbConnections.forEach(conn => {
        dbConn.push(conn.key)
    })
    fields.push({
        title: "Data Access Name",
        type: "string",
        default_value: '',
        value: dataAccess.key,
        mandatory: true,
        key: keyPrefix + '.key',
        // validatorCallback: validateFunc, onchange validator, predefined validation func for each types
    },
    {
        title: "DB Connection",
        type: "dropdown",
        default_value: dbConn[0],
        value: dataAccess['db_connection'],
        mandatory: true,
        options: dbConn,
        key: keyPrefix + '.db_connection',
        // validatorCallback: validateFunc,
    },
    {
        title: "Is CRUD?",
        type: "boolean",
        default_value: false,
        value: getBoolean(dataAccess['is_crud']),
        mandatory: true,
        key: keyPrefix + '.is_crud',
        // validatorCallback: validateFunc,
    },
    {
        title: "Is CRUD Soft Delete?",
        type: "boolean",
        default_value: false,
        value: getBoolean(dataAccess['is_crud_soft_delete']),
        mandatory: true,
        key: keyPrefix + '.is_crud_soft_delete',
        // validatorCallback: validateFunc,
    },
    {
        title: "Is CRUD Soft Delete Token?",
        type: "boolean",
        default_value: false,
        value: getBoolean(dataAccess['is_crud_soft_delete_token']),
        mandatory: true,
        key: keyPrefix + '.is_crud_soft_delete_token',
        // validatorCallback: validateFunc,
    })
    return fields
};