from memcache import Client
from omegaconf import DictConfig
from sqlalchemy import create_engine

from core_lib.cache.cache_decorator import Cache
from core_lib.cache.cache_handler_memcached import CacheHandlerMemcached
from core_lib.cache.cache_registry import CacheRegistry
from core_lib.core_lib import CoreLib
from core_lib.data_layers.data.data_helpers import build_url
from core_lib.data_layers.data.db.sqlalchemy.base import Base
from core_lib.data_layers.data.handler.sql_alchemy_data_handler_registry import SqlAlchemyDataHandlerRegistry
from core_lib.session.jwt_token_handler import JWTTokenHandler
from examples.test_core_lib.core_lib.data_layers.data_access.slow_large_data_data_access import SlowLargeDataDataAccess
from examples.test_core_lib.core_lib.data_layers.data_access.test1_data_access import Test1DataAccess
from examples.test_core_lib.core_lib.data_layers.data_access.test2_data_access import Test2DataAccess
from examples.test_core_lib.core_lib.data_layers.data_access.user_data_access import UserDataAccess
from examples.test_core_lib.core_lib.data_layers.service.slow_large_data_service import SlowLargeDataService
from examples.test_core_lib.core_lib.data_layers.service.test1_service import Test1Service
from examples.test_core_lib.core_lib.data_layers.service.test2_service import Test2Service

from examples.test_core_lib.core_lib.data_layers.service.user_service import UserService


class TestCoreLib(CoreLib):

    def __init__(self, conf: DictConfig):
        self.config = conf

        # JWTTokenHandler.init(self.config.app.secret)

        cache_client_memcached = CacheHandlerMemcached(Client([build_url(**self.config.memcached)]))
        CoreLib.cache_registry.register("memcached", cache_client_memcached)

        db_data_session = SqlAlchemyDataHandlerRegistry(self.config.db)

        class Test(object):
            def __init__(self):
                self.test_1 = Test1Service(Test1DataAccess())
                self.test_2 = Test2Service(Test2DataAccess())

        self.test = Test()
        self.user = UserService(UserDataAccess(db_data_session))
        self.large_data = SlowLargeDataService(SlowLargeDataDataAccess())

