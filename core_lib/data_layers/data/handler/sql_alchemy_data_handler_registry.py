from omegaconf import DictConfig, open_dict

from core_lib.data_layers.data.data_helpers import build_url
from core_lib.data_layers.data.handler.data_handler_registry import DataHandlerRegistry
from core_lib.data_layers.data.handler.sql_alchemy_data_handler import SqlAlchemyDataHandler
from sqlalchemy import create_engine, engine
from core_lib.data_layers.data.db.sqlalchemy.base import Base


class SqlAlchemyDataHandlerRegistry(DataHandlerRegistry):
    def __init__(self, config: DictConfig):
        self.session_to_count = {}
        self._engine = self._create_engine(config)
        self._connection = self._engine.connect()

        if config.get('create_db', True):
            Base.metadata.create_all(self._engine)

    @property
    def engine(self) -> engine:
        return self._engine

    @property
    def connection(self):
        return self._connection

    def get(self, *args, **kwargs) -> SqlAlchemyDataHandler:
        return SqlAlchemyDataHandler(self._engine, self._on_db_session_exit)

    def _on_db_session_exit(self, db_session: SqlAlchemyDataHandler):
        db_session.close()

    def _create_engine(self, config) -> engine:
        log_queries = config.get('log_queries', False)
        session = config.get('session', {})
        pool_recycle = session.get('pool_recycle', 3200)
        pool_pre_ping = session.get('pool_pre_ping', False)

        engine = create_engine(
            build_url(**config.url), pool_recycle=pool_recycle, echo=log_queries, pool_pre_ping=pool_pre_ping
        )
        return engine
