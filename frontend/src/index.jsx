import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const store = createStore(reducer);

store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Sunshines', '28 Days'],
            tally: { Sunshine: 2 }
        }
    }
});

const socket = io(`${location.protocol}//${location.hostname}:9080`);
socket.on('state', state => {
    console.log(state);
    store.dispatch({type: 'SET_STATE', state});
});

const routes = <Route component={App}>
                <Route path="/results" component={ResultsContainer} />
                <Route path="/" component={VotingContainer} />
               </Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);