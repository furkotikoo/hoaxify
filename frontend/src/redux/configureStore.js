import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLs from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLs = new SecureLs();

const getStateFromLocalStorage = () => {

    const hoaxAuth = secureLs.get('hoax-auth');///ConfigureStore local storage tan authentication datasını alıyor

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
}

const updateStateInLocalStorage = newState => {
    secureLs.set('hoax-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromLocalStorage();
    console.log('initialState', initialState);
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInLocalStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
};

export default configureStore;