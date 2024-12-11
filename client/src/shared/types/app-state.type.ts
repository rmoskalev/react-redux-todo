import { store } from '@/app/store';

export type AppState = ReturnType<typeof store.getState>;
