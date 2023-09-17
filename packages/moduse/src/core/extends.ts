import { addActionListener, createActions, useActions } from "./actions";
import { Bus } from "./comm/bus";
import { createConfig } from "./config";
import { createModules, useModules } from "./modules";
import { createPlugin, getPlugin, usePlugin } from "./plugin";
import { ModuleOptions } from "./typings";

export class ModuleRoot<Options extends ModuleOptions> {
  static config = createConfig;
  static action = createActions;
  static module = createModules;
  static plugin = createPlugin;

  config: Options["config"];
  components: Options["components"];
  actions: Options["actions"];
  modules: {
    [name in keyof Options["modules"]]: ReturnType<Options["modules"][name]>;
  };

  constructor(options: Options) {
    this.config = options.config;
    this.components = options.components;
    this.actions = useActions.call(this, options.actions);
    this.modules = useModules.call(this, options.modules);
  }

  protected bus = new Bus();
  on = addActionListener;

  protected plugins = new Map();
  usePlugin = usePlugin;
  getPlugin = getPlugin;

  ready() {}
  destroy() {}
}
