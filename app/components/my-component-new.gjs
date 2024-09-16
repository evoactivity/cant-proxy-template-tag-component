import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { block } from './styles.module.css';
import { on } from '@ember/modifier';

export default class MyComponent extends Component {
  @tracked count = 0;
  extraCount = 0;

  get counter() {
    return this.count;
  }

  handleClick = () => {
    this.count += 1;
    this.extraCount += 1;
  };

  <template>
    <div class={{block}}>
      <h1>Test GJS Component</h1>
      <p>{{this.counter}}</p>
      <button type="button" {{on "click" this.handleClick}}>Click me</button>
    </div>
  </template>
}
