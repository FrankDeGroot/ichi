# Infrastructure context

This document captures deployment context for infrastructure-related work.

## Bicep entry point
The infrastructure template is in `.azure/main.bicep`.

## Deployed resources
- Azure Static Web App (Free tier)
- Azure Cosmos DB SQL database and container (created in an existing Cosmos account)
- Azure Web PubSub (Free_F1)

## Assumptions
The template assumes the following already exists:
- An existing Azure Cosmos DB account in the target resource group (passed as `shared_name`)

## Azure Static Web Apps API runtime (Node.js)
For managed APIs in Azure Static Web Apps, this project uses only the latest currently supported Node.js runtime: `node:22`.

Runtime configuration is defined in `swa/staticwebapp.config.json`.

Reference: https://learn.microsoft.com/azure/static-web-apps/languages-runtimes (checked 2026-04-02).

## Deploy
```powershell
az group create --name ichi --location westeurope
az deployment group create --resource-group ichi --template-file .azure/main.bicep --parameters name=ichi-app shared_name=fjtdg staticWebAppLocation=westeurope
```
