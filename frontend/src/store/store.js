import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['summary']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
    logger,
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);
    

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);