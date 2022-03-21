from omegaconf import OmegaConf

from core_lib.helpers.shell_utils import input_str, input_yes_no
from core_lib.helpers.string import any_to_camel
from core_lib_generator.config_collectors.cache import generate_cache_template
from core_lib_generator.config_collectors.data_access import generate_data_access_template
from core_lib_generator.config_collectors.database import generate_db_template
from core_lib_generator.config_collectors.db_entity import generate_db_entity_template
from core_lib_generator.config_collectors.job import generate_job_template
from core_lib_generator.config_collectors.solr import generate_solr_template


def _get_env_variables(data):
    key_list = list(data.keys())
    env_variables = {}
    if 'env' in key_list:
        return data['env']
    else:
        [env_variables.update(data[key]['env']) for key in key_list]
        return env_variables


config = {}
config.setdefault('data', {})
env = {}
data_layers = {}


def _get_data_layers_config():
    want_db = input_yes_no('Will you be using a Database?', True)
    if want_db:
        print('Please fill out the requested Database information.')
        db = generate_db_template()
        env.update(_get_env_variables(db))
        for db_name in db:
            config['data'][db_name] = db[db_name]['config']
        want_entities = input_yes_no('\nWould you like to add entities to your database?', True)
        if want_entities:
            print('Please fill out the requested information for creating entities in Database.')
            db_entity = generate_db_entity_template(list(db.keys()))
            data_layers.setdefault('data', {})
            data_layers['data'] = db_entity
            want_data_access = input_yes_no('\nDo you want to create a data access for the entities?', True)
            if want_data_access:
                print('Please fill out the requested information for creating Data Access for entities.')
                data_access = generate_data_access_template(db_entity)
                data_layers.setdefault('data_access', {})
                data_layers['data_access'] = data_access


def _get_solr_config():
    print('Please fill out the requested solr information.')
    solr = generate_solr_template()
    env.update(_get_env_variables(solr))
    config['data']['solr'] = solr['config']


def _get_cache_config():
    print('Please fill out the requested Cache information.')
    cache = generate_cache_template()
    if 'env' in cache:
        env.update(_get_env_variables(cache))
    config['cache'] = cache['config']


def _get_jobs_config(core_lib_name: str)
    print('Please fill out the requested information for Job.')
    job = generate_job_template(core_lib_name)
    config['jobs'] = job


def create_yaml_file(core_lib_name: str):
    conf = OmegaConf.create(
        {
            core_lib_name: {
                'env': env,
                'config': config,
                'data_layers': data_layers,
            }
        }
    )

    with open(f'{core_lib_name}.yaml', 'w+') as file:
        OmegaConf.save(config=conf, f=file.name)


def get_data_from_user():
    core_lib_name = any_to_camel(input_str('Please enter the name for your Core-lib', 'MyCoreLib'))

    _get_data_layers_config()

    want_solr = input_yes_no('\nWill you be using Solr?', False)
    if want_solr:
        _get_solr_config()

    want_cache = input_yes_no('\nWould you like to use cache?', True)
    if want_cache:
        _get_cache_config()

    want_job = input_yes_no('\nWould you like to create a Job?', False)
    if want_job:
        _get_jobs_config(core_lib_name)

    create_yaml_file(core_lib_name)


if __name__ == '__main__':
    get_data_from_user()
