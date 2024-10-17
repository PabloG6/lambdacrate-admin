'use client';
import {createTRPCReact} from '@trpc/react-query'
import { AppRouter } from './api/root';

export const trpc = createTRPCReact<AppRouter>({});