import Vue from 'vue';

const ctx = require.context('.', true, /\.vue$/);

ctx.keys().forEach(path => {
  const module = ctx(path);
  const component = module.default || module;
  Vue.component(component.name, component);
});
