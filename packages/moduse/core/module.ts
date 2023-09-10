import { Bus } from "./bus";
import { eventsListener } from "./event";
import { createField, createFuncField, useActionFields } from "./fields";
import { createPlugin, getPlugin, usePlugin } from "./plugin";
import { ModuleOptions } from "./typings";

export class ModuleRoot<Options extends ModuleOptions> {
  static config = createField;
  static action = createFuncField;
  static plugin = createPlugin;

  config: Options["config"];
  components: Options["components"];
  actions: Options["actions"];

  constructor(options: Options) {
    this.config = options.config;
    this.components = options.components;
    this.actions = useActionFields.call(this, options.actions);
  }

  protected bus = new Bus();
  on = eventsListener;

  protected plugins = new Map();
  use = usePlugin;
  getPlugin = getPlugin;

  ready() {}
  destroy() {}
}
