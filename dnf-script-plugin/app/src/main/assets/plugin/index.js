module.exports = function (plugin) {
    let runtime = plugin.runtime;
    let scope = plugin.topLevelScope;

    function DnfScriptPlugin() {
    }

    DnfScriptPlugin.detect = (source, ratioThreshold) => plugin.detect(source, ratioThreshold)

    DnfScriptPlugin.match = (source, template, bounds) => plugin.match(source, template, bounds)

    return DnfScriptPlugin;
}