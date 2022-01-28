import sqlalchemy as sa


class IntEnum(sa.types.TypeDecorator):
    impl = sa.Integer
    cache_ok = True

    def __init__(self, enumtype, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        return value.value if value else None

    def process_result_value(self, value, dialect):
        return self._enumtype(value) if value else None
