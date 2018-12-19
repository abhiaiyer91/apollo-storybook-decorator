import { storiesOf } from '@storybook/angular';
import { AppComponent } from '../app/app.component';

storiesOf('Example', module)
  .add('Hello World', () => ({
    component: AppComponent,
  }))
