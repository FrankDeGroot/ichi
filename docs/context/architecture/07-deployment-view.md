# 7. Deployment View
<!-- Describe the physical/virtual infrastructure and deployment topology -->

## Deployed Resources
- **Azure Static Web App** (Free tier): hosts the player UI and managed API
- **Azure Cosmos DB** SQL database and container (created in an existing Cosmos account)
- **Azure Web PubSub** (Free_F1): real-time event distribution to players

## Infrastructure Template
- Bicep entry point: `.azure/main.bicep`

## API Runtime
- SWA managed API runs on **Node.js 22** (latest currently supported runtime).
- Runtime configuration: `swa/staticwebapp.config.json`
- Reference: https://learn.microsoft.com/azure/static-web-apps/languages-runtimes (checked 2026-04-02)

## Deploy
```powershell
az group create --name ichi --location westeurope
az deployment group create --resource-group ichi --template-file .azure/main.bicep --parameters name=ichi-app shared_name=fjtdg staticWebAppLocation=westeurope
```
