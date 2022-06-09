from core_lib.data_transform.helpers import get_dict_attr
from core_lib.helpers.string import any_to_pascal, camel_to_snake
from core_lib_generator.file_generators.template_generator import TemplateGenerator
from core_lib_generator.generator_utils.formatting_utils import add_tab_spaces, remove_line
from core_lib_generator.generator_utils.helpers import generate_functions


class ServiceGenerateTemplate(TemplateGenerator):
    def generate(self, template_content: str, yaml_data: dict, core_lib_name: str, file_name: str) -> str:
        updated_file = template_content.replace('Template', file_name)
        data_access = get_dict_attr(yaml_data, 'data_access')
        updated_file = updated_file.replace(
            '# template_data_access_imports',
            f'from {core_lib_name}.data_layers.data_access.{camel_to_snake(data_access)} import {data_access}',
        )
        init_str_list = [add_tab_spaces(f'def __init__(self, data_access: {data_access}):'),
                         add_tab_spaces('self.data_access = data_access', 2)]
        updated_file = updated_file.replace('# template_init', '\n'.join(init_str_list))
        functions = get_dict_attr(yaml_data, 'functions')
        if functions:
            updated_file = generate_functions(updated_file, functions)
        else:
            updated_file = updated_file.replace(
                '# template_functions',
                add_tab_spaces('pass', 1)
            )
            updated_file = remove_line('# template_function_imports', updated_file)
        return updated_file

    def get_template_file(self, yaml_data: dict) -> str:
        return (
            'core_lib_generator/template_core_lib/template_core_lib/data_layers/service/template_service.py'
        )
