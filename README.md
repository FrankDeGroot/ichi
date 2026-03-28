# ichi
Hobby project to implement the Uno card game as a web application

# resources
- https://www.unorules.org/
- https://www.unorules.com/
- https://unorules.net/

# infrastructure
Bicep file is in `.azure/main.bicep`.

This template deploys:
- Azure Static Web App (Free tier)
- Azure Cosmos DB SQL database and container (created in an existing Cosmos account)
- Azure Web PubSub (Free_F1)

This template assumes the following already exists:
- An existing Azure Cosmos DB account in the target resource group (passed as `shared_name`)

## deploy
```powershell
az group create --name ichi --location westeurope
az deployment group create --resource-group ichi --template-file .azure/main.bicep --parameters name=ichi-app shared_name=fjtdg staticWebAppLocation=westeurope
```
