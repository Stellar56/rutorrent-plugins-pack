plugin.loadLang();

plugin.loadCSS("linkseedboxmanager");

plugin.onLangLoaded = function()
{
    this.addButtonToToolbar("linkseedboxmanager", theUILang.linkseedboxmanager, plugin.optionlink+"('" + plugin.url + "')", "help");
    this.addSeparatorToToolbar("help");
}

plugin.onRemove = function()
{
    this.removeSeparatorFromToolbar("linkseedboxmanager");
    this.removeButtonFromToolbar("linkseedboxmanager");
}
