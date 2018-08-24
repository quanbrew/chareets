import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sheet from './Sheet';
import './index.css';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Sheet/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
