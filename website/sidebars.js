/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'main',
        'project_structure',
        {
          type: 'category',
          label: 'Why',
          items: [
            { type: 'autogenerated', dirName: 'Why' },
          ],
        },
        'core_lib',
        'core_lib_listener',
        'core_lib_main',
        'alembic',
        'cache',
        {
          type: 'category',
          label: 'Client',
          items: [
            { type: 'autogenerated', dirName: 'Client' },
          ],
        },
        {
          type: 'category',
          label: 'Data',
          items: [
            { type: 'autogenerated', dirName: 'Data' },
          ],
        },
        {
          type: 'category',
          label: 'Data Transform',
          items: [
            { type: 'autogenerated', dirName: 'Data Transform' },
          ],
        },
        {
          type: 'category',
          label: 'Registry',
          items: [
            { type: 'autogenerated', dirName: 'Registry' },
          ],
        },
        {
          type: 'category',
          label: 'Error Handling',
          items: [
            { type: 'autogenerated', dirName: 'Error Handling' },
          ],
        },
        {
          type: 'category',
          label: 'Helpers',
          items: [
            { type: 'autogenerated', dirName: 'Helpers' },
          ],
        },
        'job',
        {
          type: 'category',
          label: 'Observer',
          items: [
            { type: 'autogenerated', dirName: 'Observer' },
          ],
        },
        'rules_validator',
        {
          type: 'category',
          label: 'Session',
          items: [
            { type: 'autogenerated', dirName: 'Session' },
          ],
        },
        {
          type: 'category',
          label: 'Web',
          items: [
            { type: 'autogenerated', dirName: 'Web' },
          ],
        },

  ],

};

module.exports = sidebars;
