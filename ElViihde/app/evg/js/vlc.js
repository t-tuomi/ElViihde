function vlcGetPath()
{
    var path = regGetHKLMPath("SOFTWARE\\VideoLAN\\VLC");
    if (path == "")
    {
        path = regGetHKLMPath("SOFTWARE\\Wow6432Node\\VideoLAN\\VLC");
    }
    return path;
}

function regGetHKLMPath(path)
{
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\default:StdRegProv");

    var method = wmi.Methods_.Item("GetStringValue");
    var inparams = method.InParameters.SpawnInstance_();

    inparams.hDefKey     = 0x80000002;
    inparams.sSubKeyName = path;
    inparams.sValueName  = "";

    var outparams = wmi.ExecMethod_(method.Name, inparams);

    if (outparams.ReturnValue == 0) 
    {
        return outparams.sValue;
    }
    else
    {
        return "";
    }
}