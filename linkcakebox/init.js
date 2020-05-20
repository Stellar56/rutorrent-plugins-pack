plugin.loadLang();

if (theWebUI.theme && theWebUI.theme == 'Oblivion')
    plugin.loadCSS("linkcakeboxoblivion");
else
    plugin.loadCSS("linkcakebox");

plugin.config = theWebUI.config;
theWebUI.config = function(data)
{
    plugin.config.call(this,data);
    var oldDblClick = this.getTable("fls").ondblclick;
    this.getTable("fls").ondblclick = function(obj)
    {
        if(plugin.enabled && (theWebUI.dID!="") && (theWebUI.dID.length==40))
        {
            if(theWebUI.settings["webui.fls.view"])
            {
                var arr = obj.id.split('_f_');
                window.location.replace(theWebUI.downloadTabcakebox(theWebUI.dID,arr[1]));
                return(false);
            }
            else
            {
                var lnk = this.getAttr(obj.id, "link");
                if(lnk==null)
                {
                    window.location.replace(theWebUI.downloadTabcakebox(theWebUI.dID,obj.id.substr(3)));
                    return(false);
                }
            }
        }
        return(oldDblClick.call(this,obj));
    }
}

theWebUI.fixUrl = function(url)
{
    url = url.replace(/\'/g,"%27");
    return url;
}

theWebUI.playTabcakebox = function(dID,fno)
{
    var base_path = this.torrents[dID].base_path.replace(plugin.dirpath,'');
    if (this.files[dID][fno].name != this.torrents[dID].name)
        base_path = base_path + "/" + this.files[dID][fno].name;

    var cakeboxUrl = plugin.baseurl + "#/play/" + theWebUI.fixUrl(encodeURIComponent(base_path).replace(/%2F/g,'/'));
    return cakeboxUrl;
}

theWebUI.downloadTabcakebox = function(dID,fno)
{
    var base_path = this.torrents[dID].base_path.replace(plugin.dirpath,'');
    if (this.files[dID][fno].name != this.torrents[dID].name)
        base_path = base_path + "/" + this.files[dID][fno].name;

    var cakeboxUrl = plugin.accessurl + theWebUI.fixUrl(encodeURIComponent(base_path).replace(/%2F/g,'/'));
    return cakeboxUrl;
}

if(plugin.canChangeMenu())
{
    plugin.createFileMenu = theWebUI.createFileMenu;
    theWebUI.createFileMenu = function( e, id )
    {
        if(plugin.createFileMenu.call(this, e, id))
        {
            if(plugin.enabled)
            {
                theContextMenu.add([CMENU_SEP]);
                var fno = null;
                var table = this.getTable("fls");
                if((table.selCount == 1) && (theWebUI.dID.length==40))
                {
                    var fid = table.getFirstSelected();
                    if(this.settings["webui.fls.view"])
                    {
                        var arr = fid.split('_f_');
                        fno = arr[1];
                    }
                    else
                    {
                        if(!this.dirs[this.dID].isDirectory(fid))
                            fno = fid.substr(3);
                    }
                }
                theContextMenu.add( [theUILang.linkcakeboxmenu, (fno == null) ? null : plugin.optionlink + "('" + theWebUI.playTabcakebox(theWebUI.dID, fno) + "')"] );
                theContextMenu.add( [theUILang.linkcakeboxmenu3, (fno == null) ? null : plugin.optionlink + "('" + theWebUI.downloadTabcakebox(theWebUI.dID, fno) + "')"] );
            }
            return(true);
        }
        return(false);
    }
}

if(plugin.canChangeMenu())
{
    plugin.createMenu = theWebUI.createMenu;
    theWebUI.createMenu = function(e, id)
    {
        plugin.createMenu.call(this, e, id);
        if(plugin.enabled)
        {
            if(theWebUI.torrents[id].multi_file == 0)
            {
                var base_path = this.torrents[id].base_path.replace(plugin.dirpath,'');

                var cakeboxUrl = plugin.baseurl + "#/play/" + theWebUI.fixUrl(encodeURIComponent(base_path).replace(/%2F/g,'/'));
                theContextMenu.add( [theUILang.linkcakeboxmenu, plugin.optionlink + "('" + cakeboxUrl + "')"] );
            }
            else
            {
                var base_path = this.torrents[id].base_path.replace(plugin.dirpath,'');

                var cakeboxUrl = plugin.baseurl + "#/browse/" + theWebUI.fixUrl(encodeURIComponent(base_path).replace(/%2F/g,'/'));
                theContextMenu.add( [theUILang.linkcakeboxmenu2, plugin.optionlink + "('" + cakeboxUrl + "')"] );
            }
        }
    }
}

plugin.onLangLoaded = function()
{
    this.addButtonToToolbar("linkcakebox", theUILang.linkcakebox, plugin.optionlink+"('" + plugin.baseurl + "')", "help");
    this.addSeparatorToToolbar("help");
}

plugin.onRemove = function()
{
    this.removeSeparatorFromToolbar("linkcakebox");
    this.removeButtonFromToolbar("linkcakebox");
}
