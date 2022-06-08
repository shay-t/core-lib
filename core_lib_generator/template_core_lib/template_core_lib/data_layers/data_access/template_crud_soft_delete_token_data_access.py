from core_lib.data_layers.data.handler.sql_alchemy_data_handler_registry import SqlAlchemyDataHandlerRegistry
from core_lib.data_layers.data_access.db.crud.crud import CRUD
from core_lib.data_layers.data_access.db.crud.crud_soft_delete_token_data_access import (
    CRUDSoftDeleteWithTokenDataAccess,
)
from core_lib.rule_validator.rule_validator import RuleValidator
# template_function_imports

# template_entity_imports


class Template(CRUDSoftDeleteWithTokenDataAccess):
    def __init__(self, db: SqlAlchemyDataHandlerRegistry, rule_validator: RuleValidator = None):
        CRUD.__init__(self, db_entity, db, rule_validator)

# template_functions
