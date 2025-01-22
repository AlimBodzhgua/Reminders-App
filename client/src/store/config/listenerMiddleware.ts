import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { AppState } from './AppState';
import type { AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
	AppState,
	AppDispatch
>();