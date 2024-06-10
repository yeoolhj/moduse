import { addActionListener, useActions } from "./core/actions";
import { defineFields, defineFuncFields } from "./core/fields";
import { defineModules, useModules } from "./core/modules";
import { IStoreInstance, defineStore, useStore } from "./core/store";
import { defineHooks } from "./core/hooks";
import { ModuleOptions } from "./types";
import { Bus } from "./utils/bus";

export class ModuleRoot<Options extends ModuleOptions> {
  static defineConfig = defineFields;
  static defineModules = defineModules;
  static defineStore = defineStore;
  static defineActions = defineFuncFields;
  static defineHooks = defineHooks;

  config: Options["config"];
  components: Options["components"];
  actions: Options["actions"];

  store: IStoreInstance<
    Options["store"]["state"],
    Options["store"]["getters"],
    Options["store"]["actions"]
  >;

  modules: {
    [name in keyof Options["modules"]]: ReturnType<Options["modules"][name]>;
  };

  constructor(options: Options) {
    this.config = options.config;
    this.components = options.components;
    this.store = useStore.call(this, options.store);
    this.actions = useActions.call(this, options.actions);
    this.modules = useModules.call(this, options.modules);
  }

  protected bus = new Bus();
  on = addActionListener;

  ready() {}

  destroy() {}
}
