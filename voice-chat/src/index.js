import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/combined';
import { StylesProvider } from '@material-ui/core/styles';
import './styles/index.scss';
import 'fontsource-roboto';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </Provider>,
    document.getElementById('root')
);
