# optimus-teams-backend
# Deploying MS teams bot

# Preparing the development machine

We will be using Visual Studio Code as IDE. Please install it from https://code.visualstudio.com/

We will use a special VS Code extension by Microsoft called ‘Teams Toolkit’ to rapidly develop the bot. Here's how to install the Teams Toolkit extension in Visual Studio Code:

1. Open Visual Studio Code on your computer.
2. Click on the "Extensions" icon in the left-hand menu, or press "Ctrl+Shift+X" (Windows/Linux) or "Cmd+Shift+X" (Mac) to open the Extensions Marketplace.
3. In the search bar, type "Teams Toolkit" and press Enter.
4. Look for the "Teams Toolkit" extension in the search results and click on the "Install" button.
5. Wait for the extension to finish installing. You should see a notification once it's done.
6. Once the extension is installed, you will need to sign in to your Microsoft account to use it. Click on the "Sign in to Microsoft" button in the bottom right corner of the window and follow the prompts to sign in.
7. After signing in, you should see the "Teams Toolkit" icon in the left-hand menu of Visual Studio Code. Click on it to open the toolkit.

# Sign in

1. Open Visual Studio Code.
2. Open the project folder in which you created the tab app.
3. Select the Teams Toolkit  icon in the sidebar.
4. Select **Sign in to Azure**.
    1. If you have the Azure Account extension installed and are using the same account, you can skip this step. Use the same account as you're using in other extensions.
5. Your default web browser opens to let you sign in to the account.
6. Sign in to your Azure account using your credentials.
7. Close the browser when prompted and return to Visual Studio Code.
8. The **ACCOUNTS** section of the sidebar shows the two accounts separately. It also lists the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

# Provisioning (optional)

### You should skip this if provisioning is already done. Contact the freelancer to clarify.

1. Select **Provision in the Cloud**. 
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/provisioning-commands.png
    
2. Select anyone of the existing subscription.
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/select-subscription.png
    
3. Select a resource group to use for the Azure resources.
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/deploy-azure/select-resource.png
    
    **Note**
    
    Your app is hosted using Azure resources.
    
    For more information, see **[Create resource group.](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)**
    
    A dialog warns you that costs may be incurred when running resources in Azure.
    
4. Select **Provision**.
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/deploy-azure/provision-warning.png
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/provision-confirm1.png
    
    The provisioning process creates resources in the Azure cloud. It may take some time. You can monitor the progress by watching the dialogs in the bottom-right corner. After a few minutes, you see the following notice:
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/deploy-azure/deploy-provision-successmsgext.png
    
    The provisioned resource appears in the **Environment** section.
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/deploy-azure/provisioned-resources-env.png
    

## Deployment

1. Select **Deploy to the Cloud** from the **Deployment** panel after provisioning is complete or done beforehand.
    
    !https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/teams-toolkit-v2/deploy-azure/deploy-cloud.png
    
2. Choose ‘Manually submit Teams app package file’
    
    ![Screenshot 2023-04-21 at 3.34.26 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9ce4cef8-bf6f-4c71-907c-9cffb65352de/Screenshot_2023-04-21_at_3.34.26_AM.png)
    
3. It will build the deployment zip file at build/appPackage/appPackage.dev.zip. This assumes that your environment was named ‘dev’; if it were ‘foo’, the zip file would be located at build/appPackage/appPackage.foo.zip.
4. Go to Teams and click on ‘Apps’ in the left pane. Then click on ‘Manage your apps’.
    
    ![Screenshot 2023-04-21 at 3.37.53 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/737f8d31-92df-4152-b4c7-7d3c4e14d780/Screenshot_2023-04-21_at_3.37.53_AM.png)
    
5. Click on ‘Upload an app’.
    
    ![Screenshot 2023-04-21 at 3.38.31 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c74536d-3f5c-45a5-b905-625909ff4431/Screenshot_2023-04-21_at_3.38.31_AM.png)
    
6. A popup opens. Click on ‘Upload a customized app’.
    
    ![Screenshot 2023-04-21 at 3.38.42 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea0eca31-51da-478a-b7f9-bde26c303141/Screenshot_2023-04-21_at_3.38.42_AM.png)
    
7. Choose the zip file created at step 3.
8. Click on ‘Add’ to add the app to your Teams!
    
    ![Screenshot 2023-04-21 at 3.40.09 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2237c9d3-6ad7-435c-8fb0-696e350ee4c3/Screenshot_2023-04-21_at_3.40.09_AM.png)
    

Congratulations! You just deployed the app!
