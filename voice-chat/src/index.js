import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/combined';
import { StylesProvider } from '@material-ui/core/styles';
import './styles/index.scss';
import 'fontsource-roboto';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </Provider>,
    document.getElementById('root')
);
