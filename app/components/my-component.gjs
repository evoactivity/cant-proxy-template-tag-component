import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { job, thing, that } from "./styles.module.css";
import { on } from "@ember/modifier";

const concat = (...args) => args.join(" ");

class MyComponent extends Component {
  @tracked count = 0;
  thing = 2;

  handleClick = () => {
    this.count += 1;
    this.thing += 1;
  };

  <template>
    <div class={{concat job thing that}}>
      <h1>Tests {{this.count}}</h1>
      <button type="button" {{on "click" this.handleClick}}>Click me</button>
    </div>
  </template>
}

// External state store to persist data across HMR
window.___MyComponentStateStore = window.___MyComponentStateStore || {
  classList: null,
  thing: null,
  count: null,
};

const ___ProxyClass = new Proxy(MyComponent, {
  construct(target, args) {
    console.log("current state", window.___MyComponentStateStore);

    const instance = new target(...args);

    console.log(instance);
    // Override the original willDestroy method
    const originalWillDestroy = instance.willDestroy.bind(instance);

    instance.willDestroy = function () {
      console.log("willDestroy in proxy");
      // Sync the current state to the external store before the component is destroyed

      console.log("saveState");
      window.___MyComponentStateStore.count = instance.count;
      window.___MyComponentStateStore.thing = instance.thing;

      // Call the original willDestroy method
      originalWillDestroy();
    };

    // Rehydrate the component state from the external store on hot reload
    if (import.meta.hot) {
      // Rehydrate any saved state
      import.meta.hot.on('vite:afterUpdate', () => {
        console.log("rehydrate");
        console.log('afterUpdate')

        if (
          window.___MyComponentStateStore.count !== null &&
          typeof window.___MyComponentStateStore.classList !== "undefined"
        ) {
          console.log("count", window.___MyComponentStateStore.count);
          instance.count = window.___MyComponentStateStore.count;
        }

        if (
          window.___MyComponentStateStore.thing !== null &&
          typeof window.___MyComponentStateStore.classList !== "undefined"
        ) {
          console.log("thing", window.___MyComponentStateStore.thing);
          instance.thing = window.___MyComponentStateStore.thing;
        }
      });
    }

    return instance;
  },
});

export default ___ProxyClass;
