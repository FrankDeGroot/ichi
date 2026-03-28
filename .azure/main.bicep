targetScope = 'resourceGroup'

@description('Base name for all resources.')
@minLength(3)
@maxLength(44)
param name string

@description('Name of shared existing Cosmos resources (account, SQL database, and container) in this resource group.')
@minLength(3)
@maxLength(44)
param shared_name string

@description('Azure region for Cosmos DB and Web PubSub.')
param location string = resourceGroup().location

@description('Azure region for Static Web App. Use a region supported by Static Web Apps (for example westeurope).')
param staticWebAppLocation string

var staticWebAppName = name
var cosmosAccountName = shared_name
var cosmosSqlDatabaseName = name
var cosmosSqlContainerName = name
var webPubSubName = name

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: staticWebAppName
  location: staticWebAppLocation
  sku: {
    name: 'Free'
    tier: 'Free'
  }
}

module cosmosResources './cosmos-resources.bicep' = {
  name: 'cosmos-resources'
  scope: resourceGroup(shared_name)
  params: {
    cosmosAccountName: cosmosAccountName
    cosmosSqlDatabaseName: cosmosSqlDatabaseName
    cosmosSqlContainerName: cosmosSqlContainerName
  }
}

resource webPubSub 'Microsoft.SignalRService/webPubSub@2024-03-01' = {
  name: webPubSubName
  location: location
  kind: 'WebPubSub'
  sku: {
    name: 'Free_F1'
    tier: 'Free'
    capacity: 1
  }
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

output staticWebAppHostname string = staticWebApp.properties.defaultHostname
output cosmosEndpoint string = cosmosResources.outputs.cosmosEndpoint
output cosmosDatabaseName string = cosmosResources.outputs.cosmosDatabaseName
output cosmosContainerName string = cosmosResources.outputs.cosmosContainerName
output webPubSubHostName string = webPubSub.properties.hostName
