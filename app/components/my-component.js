import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { block } from './styles.module.css';

export default class MyComponent extends Component {
  @tracked count = 0;
  extraCount = 0;

  get counter() {
    return this.count + this.extraCount;
  }

  get blockClass() {
    return block;
  }

  handleClick = () => {
    this.count += 1;
    this.extraCount += 1;
  };
}
