class ComponentStore {
  constructor() {
    if (!window.componentStore) {
      window.componentStore = this;
      this.componentList = {};
    }
    return window.componentStore;
  }

  registerComponent(type, component) {
    this.componentList[type.toLowerCase()] = component;
  }

  getRegisteredComponent(type) {
    return this.componentList[type.toLowerCase()];
  }

  deRegisterComponent(type) {
    delete this.componentList[type.toLowerCase()];
  }

  getAllRegisteredComponents() {
    return this.componentList;
  }

}

export default (new ComponentStore);
