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

resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2024-08-15' existing = {
  name: cosmosAccountName
}

resource cosmosSqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2024-08-15' = {
  parent: cosmosAccount
  name: cosmosSqlDatabaseName
  properties: {
    resource: {
      id: cosmosSqlDatabaseName
    }
    options: {
      throughput: 400
    }
  }
}

resource cosmosSqlContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2024-08-15' = {
  parent: cosmosSqlDatabase
  name: cosmosSqlContainerName
  properties: {
    resource: {
      id: cosmosSqlContainerName
      partitionKey: {
        paths: [
          '/id'
        ]
        kind: 'Hash'
        version: 2
      }
    }
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
output cosmosEndpoint string = cosmosAccount.properties.documentEndpoint
output cosmosDatabaseName string = cosmosSqlDatabaseName
output cosmosContainerName string = cosmosSqlContainerName
output webPubSubHostName string = webPubSub.properties.hostName
