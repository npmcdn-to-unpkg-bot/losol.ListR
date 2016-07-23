# ListR application

A Asp.net core web application for storing a grocery shopping list

## Install asp.net 5
On commandline:
Install dnvm: @powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"
Install .net execution enviroment (dnx): dnvm upgrade -r coreclr 
Install gulp: npm install -g gulp


## Set user secrets
Install SecretManager tool by running this command in app folder: dnu commands install Microsoft.Extensions.SecretManager
Run commands to store AppId and AppSecret:
* user-secret set Authentication:Facebook:AppId 123123   
* user-secret set Authentication:Facebook:AppSecret 456456
* user-secret set Authentication:Google:ClientId 123123.apps.googleusercontent.com
* user-secret set Authentication:Google:ClientSecret 4gwb4b242546


## Make self signed certificate
The makecert tool is available from windows SDK. https://www.microsoft.com/en-us/download/details.aspx?id=8279


## After updating project.json
dnu restore

## After model changes
dnx ef migrations add migrationname
dnx ef database update

If  error: "More than one DbContext was found. Specify which one to use.". Then you could use those lines

* dnx ef migrations add fix -c ApplicationDbContext
* dnx ef database update -c ApplicationDbContext


## Going live on Azure
For some reason I had trouble configuring the connectionstring to the azure sql database. However after adding the connectionstring both as DefaultConnection as well as Data:DefaultConnection:ConnectionString I managed to get the application to talk with the database.

Also I couldnt figure out how to run migrations on the azure sql server, but i used the production ConnectionString on my local IIS (after whitelisting my ip in the SQL server firewall), and then the migrations ran just fine. 

## Trouble? 
* Disable Custom errors: http://docs.asp.net/en/latest/fundamentals/diagnostics.html#http-500-errors-on-azure
* Enable remote debugging in Azure from Visual Studio: Trouble? Enable remote debugging https://azure.microsoft.com/en-us/documentation/articles/web-sites-dotnet-troubleshoot-visual-studio/