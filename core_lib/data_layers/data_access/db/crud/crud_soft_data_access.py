from datetime import datetime

from core_lib.data_layers.data_access.data_access import DataAccess
from core_lib.data_layers.data.handler.sql_alchemy_data_handler_registry import SqlAlchemyDataHandlerRegistry
from core_lib.data_layers.data_access.db.crud.crud import CRUD
from core_lib.error_handling.decorators import NotFoundErrorHandler
from core_lib.rule_validator.rule_validator import RuleValidator


class CRUDSoftDataAccess(DataAccess, CRUD):

    def __init__(self, db_entity, db: SqlAlchemyDataHandlerRegistry, rule_validator: RuleValidator):
        CRUD.__init__(self, db_entity, db, rule_validator)

    @NotFoundErrorHandler()
    def get(self, id: int):
        assert id
        with self._db.get() as session:
            return session.query(self._db_entity)\
                .filter(self._db_entity.id == id, self._db_entity.deleted_at == None)\
                .first()

    def delete(self, id: int):
        assert id
        with self._db.get() as session:
            return session.query(self._db_entity).filter(self._db_entity.id == id).update({'deleted_at': datetime.utcnow()})
