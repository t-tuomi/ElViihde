function settingsLoad()
{
	usernameText.value = System.Gadget.Settings.readString("username");
	passwordText.value = System.Gadget.Settings.readString("password");

	System.Gadget.onSettingsClosing = settingsClosing;
}

function settingsCheckCredentials(username, password)
{
    return service.check(username, password);
}

function settingsClosing(event)
{
	if (event.closeAction == event.Action.commit)
	{
		var username = usernameText.value;
		var password = passwordText.value;
		
		if (settingsCheckCredentials(username, password))
		{
			settingsSave(username, password);
			
			errorMessage.innerText = "";

			event.cancel = false;
		}
		else
		{
			errorMessage.innerText = "Käyttäjätunnus tai salasana väärin. Tarkista, että olet syöttänyt tiedot oikein.";
			
			event.cancel = true;
		}
	}
}

function settingsSave(username, password)
{
    System.Gadget.Settings.writeString("username", username);
    System.Gadget.Settings.writeString("password", password);
    System.Gadget.Settings.write("credentialsUpdated", true);
}
