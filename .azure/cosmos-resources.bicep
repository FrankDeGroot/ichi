targetScope = 'resourceGroup'

@description('Name of an existing Cosmos DB account in this resource group.')
@minLength(3)
@maxLength(44)
param cosmosAccountName string

@description('Name of the Cosmos SQL database to create.')
@minLength(1)
@maxLength(255)
param cosmosSqlDatabaseName string

@description('Name of the Cosmos SQL container to create.')
@minLength(1)
@maxLength(255)
param cosmosSqlContainerName string

resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2024-08-15' existing = {
  name: cosmosAccountName
}

resource cosmosSqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2024-08-15' existing = {
  parent: cosmosAccount
  name: cosmosSqlDatabaseName
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
    options: {
      throughput: 500
    }
  }
}

output cosmosEndpoint string = cosmosAccount.properties.documentEndpoint
output cosmosDatabaseName string = cosmosSqlDatabaseName
output cosmosContainerName string = cosmosSqlContainerName
