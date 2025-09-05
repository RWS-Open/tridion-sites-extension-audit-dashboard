# RWS Tridion Sites Audit Backend Extension

### Requirements

- **Visual Studio 2019**
- **.NET 4.8 Framework**
- Access to **[RWS](https://www.rws.com) Tridion Sites 10.1 environment**
- OpenSearch 2.18.0 or Above 


### Build Instructions

1. Open the solution in **Visual Studio 2019**.
2. Build the project targeting **.NET 4.8 Framework**.
3. Once build is succeeded Addon Package will be generated in \eventsystem-extension\Tridion.IntegrationEngine.TridionEventHandler\Addon_Package\


### ⚙️ Deployment

1. Navigate to \eventsystem-extension\Tridion.IntegrationEngine.TridionEventHandler\Addon_Package\

2. Update the integrationEngineUrl(Opensearch URL) and indexName in IntegrationEngineEventHandler.json file.
   
3. Navigate to Addons service using the following URL:
   
    https://domain.com:83/addon/ui
    
4. Upload the following files to the Addon service: 
    
    - IntegrationEngineEventHandler.zip
    - IntegrationEngineEventHandler.json

5. Open Postman do a get request, you will see newly added index name listed
		https://{OpensearchUrl.com}:9200/_cat/indices?v
		Authorization Basic Auth : Opensearch username and password
		
6. Preform any activity like publish/unpublish in Tridion Content manager.

7. Above activities details can be accessed using the following opensearch url https://{OpensearchUrl.com}:9200/{indexname}/_search?size=3000
