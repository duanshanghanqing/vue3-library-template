import components from './components/index';

const install = (Vue: any) => {
  if ((install as any).installed) return;
  (install as any).installed = true;
  components.forEach((component: any) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && (window as any).Vue) {
  install((window as any).Vue);
}

export default {
  install,
};
