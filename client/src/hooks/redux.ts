import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/config/AppState';
import type { AppDispatch } from 'store/config/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector; 
export const useAppDispatch = () => useDispatch<AppDispatch>();