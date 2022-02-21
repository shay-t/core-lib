import pysolr
from omegaconf import DictConfig

from core_lib.core_lib import CoreLib
from core_lib.data_layers.data.data_helpers import build_url

from core_lib.data_layers.data.handler.sql_alchemy_data_handler_registry import SqlAlchemyDataHandlerRegistry
from core_lib.data_layers.data.handler.object_data_handler_registry import ObjectDataHandlerRegistry
from examples.demo_core_lib.core_lib.data_layers.data_access.demo_data_access import DemoDataAccess
from examples.demo_core_lib.core_lib.data_layers.data_access.demo_search_data_access import DemoSearchDataAccess
from examples.demo_core_lib.core_lib.data_layers.service.demo_search_service import DemoSearchService
from examples.demo_core_lib.core_lib.data_layers.service.demo_service import DemoService


class DemoCoreLib(CoreLib):
    def __init__(self, conf: DictConfig):
        self.config = conf

        db_data_session = SqlAlchemyDataHandlerRegistry(self.config.db)
        solr_data_session = ObjectDataHandlerRegistry(pysolr.Solr(build_url(**self.config.solr), always_commit=True))

        self.info = DemoService(DemoDataAccess(db_data_session))
        self.search = DemoSearchService(DemoSearchDataAccess(solr_data_session))
