import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { StateSchema } from './StateSchema';
import type { AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  StateSchema,
  AppDispatch
>();