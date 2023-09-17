import { ModuleInstance, ModuleType } from "./typings";

interface PluginCreator<T extends ModuleType, P = unknown> {
  install: (this: InstanceType<T>) => P;
}

export function createPlugin<T extends ModuleType, P>(
  this: T,
  creator: PluginCreator<T, P>
) {
  return creator;
}

export function usePlugin(
  this: ModuleInstance,
  pluginCreator: PluginCreator<any>
) {
  if (this.plugins.has(pluginCreator)) {
    console.warn("该插件已注册！", pluginCreator.toString());
    return;
  }
  const plugin = pluginCreator.install.call(this);
  this.plugins.set(pluginCreator, plugin);
}

export function getPlugin<P extends PluginCreator<any>>(
  this: ModuleInstance,
  creator: P
): ReturnType<P["install"]> | undefined {
  return this.plugins.get(creator);
}
