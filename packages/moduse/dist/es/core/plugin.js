export function createPlugin(creator) {
    return creator;
}
export function usePlugin(pluginCreator) {
    if (this.plugins.has(pluginCreator)) {
        console.warn("该插件已注册！", pluginCreator.toString());
        return;
    }
    const plugin = pluginCreator.install.call(this);
    this.plugins.set(pluginCreator, plugin);
}
export function getPlugin(creator) {
    return this.plugins.get(creator);
}
