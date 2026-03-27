# ichi
Hobby project to implement the Uno card game as a web application

# resources
https://www.unorules.org/
https://www.unorules.com/

# infrastructure
Bicep files are in `.azure/main.bicep` and `.azure/main.bicepparam`.

This template deploys:
- Azure Static Web App (Free tier)
- Azure Cosmos DB SQL account with free tier enabled, plus SQL database and container
- Azure Web PubSub (Free_F1)

Default names are set to `ichi` for all resources. Resource names for Static Web Apps, Cosmos accounts, and Web PubSub are globally unique in Azure, so deployment can fail if `ichi` is already taken.

## deploy
```powershell
az group create --name ichi --location westeurope
az deployment group create --resource-group ichi --parameters .azure/main.bicepparam
```

If `ichi` is already taken, override the name at deploy time:
```powershell
az deployment group create --resource-group ichi --template-file .azure/main.bicep --parameters name=ichi123 staticWebAppLocation=westeurope
```
