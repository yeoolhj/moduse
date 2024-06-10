import { computed, reactive } from "vue";
import { AnyFun, ModuleInstance } from "../types";

type IState = () => Record<string, any>;
type IGetter<S extends IState> = Record<string, (state: ReturnType<S>) => any>;
type IAction = Record<string, AnyFun>;
type ClassType<T> = new (...args: any) => T;

export type IStoreInstance<
  S extends IState,
  G extends IGetter<any>,
  A extends IAction
> = ReturnType<S> & { [name in keyof G]: ReturnType<G[name]> } & A;

export interface ICreatetore {
  <
    T extends ClassType<any>,
    State extends IState,
    Getters extends IGetter<State>,
    Actions extends IAction
  >(
    this: T,
    store: {
      state: State;
      getters: Getters & ThisType<InstanceType<T>>;
      actions: Actions & ThisType<InstanceType<T>>;
    }
  ): {
    state: State;
    getters: Getters;
    actions: Actions;
  };

  <T extends ClassType<any>, State extends IState, Actions extends IAction>(
    this: T,
    store: {
      state: State;
      actions: Actions & ThisType<InstanceType<T>>;
    }
  ): {
    state: State;
    getters: {};
    actions: Actions;
  };

  <
    T extends ClassType<any>,
    State extends IState,
    Getters extends IGetter<State>
  >(
    this: T,
    store: {
      state: State;
      getters: Getters & ThisType<InstanceType<T>>;
    }
  ): {
    state: State;
    getters: Getters;
    actions: {};
  };

  <State extends IState>(store: { state: State }): {
    state: State;
    getters: {};
    actions: {};
  };
}

export const defineStore: ICreatetore = function (store: any) {
  return store;
};

export function useStore(this: ModuleInstance, store?: any) {
  if (!store) return;
  const data = store.state();
  if (store.getters) {
    Object.entries(store.getters).forEach(([key, value]) => {
      data[key] = computed(() => (value as any).call(this, state));
    });
  }
  const state = reactive(data);
  if (store.actions) {
    const actions = { ...store.actions };
    Object.entries(actions).forEach(([key, act]) => {
      actions[key] = (act as any).bind(this);
    });
    Object.setPrototypeOf(state, actions);
  }
  return state;
}
