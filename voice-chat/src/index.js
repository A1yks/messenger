import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/combined';
import { StylesProvider } from '@material-ui/core/styles';
import { Titlebar, Color } from 'custom-electron-titlebar';
import './styles/index.scss';
import 'fontsource-roboto';
import icon from './images/icon.png';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
new Titlebar({
    backgroundColor: Color.fromHex('#677bc4'),
    menu: null,
    titleHorizontalAlignment: 'left',
    unfocusEffect: false,
    icon,
});

ReactDOM.render(
    <Provider store={store}>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </Provider>,
    document.getElementById('root')
);
