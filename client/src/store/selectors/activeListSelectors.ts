import { StateSchema } from '../config/StateSchema';

export const selectActiveList = (state: StateSchema) => state.activeList.list;