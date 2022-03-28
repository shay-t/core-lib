from core_lib_generator.file_generators.template_generator import TemplateGenerator


class JobsGenerateTemplate(TemplateGenerator):
    def generate(self, template_content: str, yaml_data: dict, core_lib_name: str, file_name: str) -> str:
        job_class = yaml_data['handler']['_target_'].split('.')[-1]
        return template_content.replace('Template', job_class)

    def get_template_file(self, yaml_data: dict) -> str:
        return 'core_lib_generator/template_core_lib/template_core_lib/jobs/template.py'
