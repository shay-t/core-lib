import { getBoolean } from '../utils/commonUtils';

export const entityFields = (path, yamlData) => {
    const fields = []
    const dbConn = []
    const pathSplit = path.split('.')
    const index = pathSplit.at(pathSplit.indexOf('entities') + 1)
    const entity = yamlData.core_lib.entities[index]
    const dbConnection = yamlData.core_lib.entities[index].db_connection
    const dbConnections = yamlData.core_lib.connections
    const keyPrefix = `core_lib.entities.${index}`
    dbConnections.forEach(conn => {
        dbConn.push(conn.key)
    })
    fields.push({
        title: "DB Entity Name",
        type: "string",
        default_value: "",
        value: entity.key,
        mandatory: true,
        key: `${keyPrefix}.key`,
        // validatorCallback: validateFunc,
    },
    {
        title: "Column",
        type: "columns",
        default_value: "",
        value: entity.columns,
        mandatory: true,
        key: `${keyPrefix}.columns`,
        // validatorCallback: validateFunc,
    });
    if(entity.hasOwnProperty('is_soft_delete')){
        fields.push({
            title: "Is Soft Delete",
            type: "boolean",
            default_value: true,
            value: getBoolean(entity["is_soft_delete"]),
            mandatory: true,
            key: keyPrefix + '.is_soft_delete',
            // validatorCallback: validateFunc,
        },
        {
            title: "Is Soft Delete Token",
            type: "boolean",
            default_value: true,
            value: getBoolean(entity["is_soft_delete_token"]),
            mandatory: true,
            key: keyPrefix + '.is_soft_delete_token',
            // validatorCallback: validateFunc,
        });
    }
    return fields
};
