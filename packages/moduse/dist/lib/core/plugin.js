"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = exports.usePlugin = exports.createPlugin = void 0;
function createPlugin(creator) {
    return creator;
}
exports.createPlugin = createPlugin;
function usePlugin(pluginCreator) {
    if (this.plugins.has(pluginCreator)) {
        console.warn("该插件已注册！", pluginCreator.toString());
        return;
    }
    const plugin = pluginCreator.install.call(this);
    this.plugins.set(pluginCreator, plugin);
}
exports.usePlugin = usePlugin;
function getPlugin(creator) {
    return this.plugins.get(creator);
}
exports.getPlugin = getPlugin;
