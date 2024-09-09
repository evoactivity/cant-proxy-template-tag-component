import Component from '@glimmer/component';
import { hash } from '@ember/helper';

export default class StatefulComponent extends Component {
  state = {};

  setState = (newState) => {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });
  };

  <template>
    {{yield (hash state=this.state setState=this.setState)}}
  </template>
}
