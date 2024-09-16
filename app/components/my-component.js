import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { block } from './styles.module.css';

export default class MyComponent extends Component {
  blockClass = block;
  @tracked count = 0;
  extraCount = 0;

  get counter() {
    return this.count;
  }

  handleClick = () => {
    this.count += 1;
    this.extraCount += 1;
  };
}
