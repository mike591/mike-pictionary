const model = '__init__.py';
const proto = 'https://';
const parts = window.location.pathname.split('/');
const isLocal = window && window.location.host.match('local');
const host = isLocal ? `${proto}api.forio.com/v2` : `${proto}api.${window.location.host}/v2`;
let account = 'forio-dev';
let project = 'mike-pictionary';

/* eslint-disable no-magic-numbers */
if (parts[1] === 'app') {
    account = parts[2];
    project = parts[3];
}
/* eslint-enable */

const endpoints = {
    root: `${host}/run/${account}/${project}`,
    host: `${host}`,
    model,
    isLocal,
    account,
    project,
};

export default endpoints;
