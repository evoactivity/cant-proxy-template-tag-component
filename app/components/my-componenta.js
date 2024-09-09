import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { job, thing, that } from './styles.module.css';

const concat = (...args) => args.join(' ');

class MyComponent extends Component {
  @tracked count = 0;
  classList = concat(job, thing, that);
  thing = 2;

  handleClick = () => {
    this.count += 1;
    this.thing += 1;
  };
}

let ___ProxyClass = MyComponent;

if (import.meta.hot) {
  // External state store to persist data across HMR
  ___ProxyClass = new Proxy(MyComponent, {
    construct(target, args) {
      const instance = new target(...args);

      if (Object.entries(instance.args.externalState.state).length === 0) {
        instance.args.externalState.setState({
          count: null,
          thing: null,
        });
      }

      console.log('state container: ', instance.args.externalState.state);
      // Override the original willDestroy method
      const originalWillDestroy = instance.willDestroy.bind(instance);

      instance.willDestroy = function () {
        console.log('willDestroy in proxy');
        // Sync the current state to the external store before the component is destroyed

        console.log('saveState');
        instance.args.externalState.setState({
          count: instance.count,
          thing: instance.thing,
        });

        console.log(instance.args.externalState);

        // Call the original willDestroy method
        originalWillDestroy();
      };

      // Rehydrate the component state from the external store on hot reload

      // Rehydrate any saved state
      import.meta.hot.on('vite:afterUpdate', () => {
        console.log('rehydrate');
        console.log('afterUpdate');
        console.log(instance.args.externalState);
        if (
          instance.args.externalState.state.count !== null &&
          typeof instance.args.externalState.state.count !== 'undefined'
        ) {
          console.log('count', instance.args.externalState.state.count);
          instance.count = instance.args.externalState.state.count;
        }

        if (
          instance.args.externalState.state.thing !== null &&
          typeof instance.args.externalState.state.thing !== 'undefined'
        ) {
          console.log('thing', instance.args.externalState.state.thing);
          instance.thing = instance.args.externalState.state.thing;
        }
      });

      return instance;
    },
  });
}

export default ___ProxyClass;
