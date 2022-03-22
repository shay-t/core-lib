import os
import shutil

from core_lib_generator.file_generators.template_generate import TemplateGenerate
from core_lib_generator.generator_file_utils import replace_file_strings, replace_file_line


class JobsGenerateTemplate(TemplateGenerate):
    def handle(self, template_file: str, yaml_data: dict, core_lib_name: str) -> str:
        job_class = yaml_data['handler']['_target_'].split('.')[-1]
        return template_file.replace('Template', job_class)

    def get_template_file(self, yaml_data: dict) -> str:
        return 'template_core_lib/core_lib/jobs/template.py'


def add_job_instances(jobs: dict, core_lib_name: str):
    inst_list = []
    filename = f'{core_lib_name}/{core_lib_name}/{core_lib_name}.py'
    for name in jobs:
        class_name = jobs[name]['class_name']
        inst_str = f'self.{name.lower()} = {class_name}()'
        inst_list.append(inst_str.rjust(len(inst_str) + 8))
    replace_file_line(filename, '# template_job_instances', '\n'.join(inst_list))


def generate_jobs(jobs: dict, core_lib_name: str):
    for name in jobs:
        new_file_name = f'{core_lib_name}/{core_lib_name}/jobs/{name.lower()}.py'
        if not os.path.isfile(new_file_name):
            shutil.copy(
                f'{core_lib_name}/{core_lib_name}/jobs/template.py',
                new_file_name,
            )
            replace_file_strings(new_file_name, 'Template', jobs[name]['class_name'])
