from core_lib_generator.file_generators.template_generator import TemplateGenerator


class ManifestGenerateTemplate(TemplateGenerator):
    def generate(self, template_content: str, yaml_data: dict, core_lib_name: str, file_name: str) -> str:
        return template_content.replace('template_core_lib', core_lib_name)

    def get_template_file(self, yaml_data: dict) -> str:
        return 'core_lib_generator/template_core_lib/MANIFEST.in'
