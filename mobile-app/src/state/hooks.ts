/**
 * FinTrack AI — Typed Redux Hooks
 *
 * Pre-typed versions of useDispatch and useSelector for type safety.
 * Use these throughout the app instead of the raw React-Redux hooks:
 *   useAppDispatch() — Returns typed AppDispatch
 *   useAppSelector() — Typed selector with RootState inference
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
