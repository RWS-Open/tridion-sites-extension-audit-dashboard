# RWS Tridion Sites Audit Extension

## Overview

The **RWS Tridion Sites Audit Extension** provides a comprehensive audit dashboard to track and visualize key activities performed in the CMS. It helps administrators, auditors, and business users gain insights into system usage and content operations.

## Features

- 📊 Interactive Dashboard – View content activity at a glance with graphical reports.
- Seamless integration with [RWS](https://www.rws.com) Tridion Sites.
- 🟢 PIE Charts & Bar Charts for:
  - Components
  - Pages
  - Categories
  - Structure Groups
- 🔄 Activity Tracking – Monitor key lifecycle actions:
  - Create
  - Update
  - Delete
  - Publish
  - Unpublish
- Audit Reports – Exportable insights for compliance and performance tracking.
- 🔍 Better Visibility – Identify trends, high-activity areas, and content usage patterns.
- Easy to deploy and maintain.

## Backend Extension


### Requirements

- **Visual Studio 2019**
- **.NET 4.8 Framework**
- Access to **[RWS](https://www.rws.com) Tridion Sites environment 10.1**
- OpenSearch 2.18.0 or Above 


### Build Instructions

1. Open the solution in **Visual Studio 2022**.
2. Build the project targeting **.NET 8.0**.

### ⚙️ Deployment

1. Download the Backend extension from [releases](https://github.com/RWS-Open/tridion-sites-extension-audit-dashboard/releases) page.

2. Unzip the activity-audit-addon-1.0.0-backend.zip.
   
3. Update the integrationEngineUrl(Opensearch URL) and indexName in IntegrationEngineEventHandler.json file
   
4. Navigate to Addons service using the following URL:
   
    https://domain.com:83/addon/ui
    
5. Upload the following files to the Addon service: 
    
    - IntegrationEngineEventHandler.zip
    - IntegrationEngineEventHandler.json
   
6. Navigate to your OpenSearch installation path (e.g., C:\..\opensearch-2.18.0\config) and edit the opensearch.yml file to allow CORS:
   
        http.cors.allow-origin: https://domain.com (Tridion Sites CM Url)
        http.cors.enabled: true
        http.cors.allow-methods: OPTIONS,HEAD,GET,POST,PUT,DELETE
        http.cors.allow-headers : X-Search-Client, X-Timestamp, X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
        http.cors.allow-credentials: true
        plugins.security.ssl.http.clientauth_mode: NONE

7. Restart the OpenSearch 2.18.0 service (opensearch-service-x64).
       

## Frontend Extension


### Requirements

- **Nodejs Latest**


### Installation

1) Navigate to Activity Audit(activity-audit-extension) folder
2) Install Node Modules by running the following command
   - npm install
  

### ⚙️ Configuration

1) Update the package.json file to update the Target server url as below
    - target = https://domain.com (Tridion Sites CM URL)

    ```json

        "dev": "webpack serve --config ./webpack.dev.config.js --progress --env target=https://domain.com manifest=../manifest.json config=../clone-publication.config",

    ```

2) Login to Access Management -> Applications Tab
   
   - Click on Edit button to enter the Allowed redirect URLs as below
       - https://localhost:3010/.../signin-oidc
       - https://localhost:3010/.../signout-callback-oidc
   - Click Save


### Run Locally

1) Navigate to activity-audit-extension folder
2) Run the below command in command prompt to install the node dependency modules.
   - npm install
3) Run the command npm run dev to run the extension locally
   - npm run dev
4) Extension can be accessed using the below URL
    https://localhost:3010/ISHCS/OrganizeSpace
    

### ⚙️ Deployment

1. Download the Frontend extension from [releases](https://github.com/RWS-Open/tridion-sites-extension-audit-dashboard/releases) page.
   
2. Unzip the activity-audit-addon-1.0.0-frontend.zip 
   
3. Update the activity-audit-addon.config.json file 
   
   ```json
        {
        "configuration": {
            "activity-audit-extension": {
                "OPENSEARCH_USERNAME":"",
                "OPENSEARCH_PWD":"",
                "OPENSEARCH_BASE_URL":"",
                "OPENSEARCH_INDEX_NAME":"" 
            }
        }
    }

   ```
   - OPENSEARCH_INDEX_NAME should match the value used in the Backend Extension configuration.

4. Navigate to Addons service using the following URL:
   
    https://domain.com:83/addon/ui

5. Upload the following files to the Addon service: 
    
    activity-audit-addon-1.0.0.zip
    activity-audit-addon.config.json

### 🧪 Usage

1. Open Tridion Sites Experience Space.
2. Perform Create, Delete, Update, Publish, and Unpublish operations on:
   - Components
   - Categories
   - Pages
   - Structure Groups
3. View the activity details in the Activity Audit Dashboard tab.