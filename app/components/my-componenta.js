import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { job, thing, that } from './styles.module.css';

const concat = (...args) => args.join(' ');

class MyComponent extends Component {
  classList = concat(job, thing, that);
  @tracked count = 0;
  thing = 2;

  get counter() {
    return this.count + this.thing + ' hello';
  }

  handleClick = () => {
    this.count += 1;
    this.thing += 1;
  };
}

let ___ProxyClass = MyComponent;

if (import.meta.hot) {
  let componentInstance = null;
  let stateKey = null;

  ___ProxyClass = new Proxy(MyComponent, {
    construct(target, args) {
      componentInstance = new target(...args);

      stateKey = componentInstance.args.externalStateKey;

      window[stateKey] = window[stateKey] || {
        count: componentInstance.count,
        thing: componentInstance.thing,
      };

      // Override the original willDestroy method
      const originalWillDestroy =
        componentInstance.willDestroy.bind(componentInstance);

      componentInstance.willDestroy = function () {
        // Sync the current state to the external store before the component is destroyed
        window[stateKey] = {
          count: componentInstance.count,
          thing: componentInstance.thing,
        };

        originalWillDestroy(...arguments);
      };

      return componentInstance;
    },
  });

  const rehydrate = () => {
    componentInstance.count = window[stateKey].count;
    componentInstance.thing = window[stateKey].thing;
  };

  // Rehydrate the component state from the external store on hot reload
  import.meta.hot.on('vite:afterUpdate', rehydrate);

  import.meta.hot.dispose(() => {
    delete window[stateKey];
    import.meta.hot.off('vite:afterUpdate', rehydrate);
  });
}

export default ___ProxyClass;
