

const env = process.env.npm_config_env || 'dev';
const prodRoot = '/btr_open_supplier_static/';
const envMapping = {
  dev: '/',
  test: `//test-static.qipeipu.net${prodRoot}`,
  test0: `//test-static.qipeipu.net${prodRoot}`,
  test2: `//test2-static.qipeipu.net${prodRoot}`,
  test10: `//dockertest-static.qipeipu.net${prodRoot}`,
  docker: `//test-static.qipeipu.net${prodRoot}`,
  docker0: `//test-static.qipeipu.net${prodRoot}`,
  docker2: `//test2-static.qipeipu.net${prodRoot}`,
  docker10: `//dockertest-static.qipeipu.net${prodRoot}`,
  docker40: `//pre-static.qipeipu.net${prodRoot}`,
  docker41: `//pre-static.qipeipu.com${prodRoot}`,
  docker42: `//pre42-static.qipeipu.com${prodRoot}`,
  online: `//static.qipeipu.com${prodRoot}`,
};

function createEnv(envArr) {
  envArr.forEach(element => {
    const url = `//docker${element}-static.qipeipu.net${prodRoot}`;
    envMapping[`docker${element}`] = url;
    envMapping[`test${element}`] = url;
  });
}

const envArr = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
createEnv(envArr);

module.exports = envMapping[env];
