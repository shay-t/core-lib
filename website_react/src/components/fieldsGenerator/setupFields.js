export const setupFields = (CoreLibName, yamlData) => {
    const fields = []
    const keyPrefix = CoreLibName + '.setup'
    const setup = yamlData[CoreLibName]['setup']
    fields.push({
        title: "Your Full Name",
        type: "string",
        default_value: '',
        value: setup.author,
        mandatory: true,
        key: keyPrefix + '.author',
        // validatorCallback: validateFunc,
    },
    {
        title: "Your Email",
        type: "string",
        default_value: '',
        value: setup.author_email,
        mandatory: true,
        key: keyPrefix + '.author_email',
        // validatorCallback: validateFunc,
    },
    {
        title: 'Select classifiers',
        type: 'list',
        default_value: 'Development Status :: 3 - Alpha',
        value: setup.classifiers,
        mandatory: true,
        // validatorCallback: validateFunc,
        multiple_selection: true,
        options: [
            'Development Status :: 3 - Alpha',
            'Development Status :: 4 - Beta',
            'Development Status :: 5 - Production/Stable',
            'Environment :: MacOS X',
            'Environment :: Win32 (MS Windows)',
            'Framework :: Django :: 4.0',
            'Framework :: Flask',
            'Framework :: Jupyter',
            'Natural Language :: English',
            'Operating System :: OS Independent',
            'Programming Language :: Python :: 3.7',
            'Topic :: Software Development',
            'Topic :: Software Development :: Libraries',
            'Topic :: Software Development :: Libraries :: Python Modules',
            'Typing :: Typed',
        ],
    },
    {
        title: "Project Description",
        type: "string",
        default_value: '',
        value: setup.description,
        mandatory: true,
        key: keyPrefix + '.description',
        // validatorCallback: validateFunc,
    },
    {
        title: "License Type",
        type: "enum",
        default_value: 'MIT',
        value: setup.license,
        mandatory: true,
        options: [
            'MIT',
            'APACHE_LICENSE_2',
            'MOZILLA_PUBLIC_LICENSE_2',
        ],
        key: keyPrefix + '.license',
        // validatorCallback: validateFunc,
    },
    {
        title: "Project url",
        type: "string",
        default_value: '',
        value: setup.url,
        mandatory: false,
        key: keyPrefix + '.url',
        // validatorCallback: validateFunc,
    },
    {
        title: "Project version",
        type: "string",
        default_value: '',
        value: setup.version,
        mandatory: false,
        key: keyPrefix + '.version',
        // validatorCallback: validateFunc,
    })
    return fields
}