from core_lib.data_layers.data_access.db.crud.crud_soft_data_access import CRUDSoftDataAccess
from core_lib.data_transform.result_to_dict import ResultToDict
from core_lib.data_layers.service.service import Service
from core_lib.error_handling.not_found_decorator import NotFoundErrorHandler


class UserService(Service):
    def __init__(self, data_access: CRUDSoftDataAccess):
        self.data_access = data_access

    @ResultToDict()
    def create(self, user_data):
        return self.data_access.create(user_data)

    @NotFoundErrorHandler()
    @ResultToDict()
    def get(self, user_id):
        return self.data_access.get(user_id)

    def update(self, user_id: int, update: dict):
        return self.data_access.update(user_id, update)

    @NotFoundErrorHandler()
    @ResultToDict()
    def delete(self, user_id):
        return self.data_access.delete(user_id)
