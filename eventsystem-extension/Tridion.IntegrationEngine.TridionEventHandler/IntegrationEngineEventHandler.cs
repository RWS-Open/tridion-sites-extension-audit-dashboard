
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tridion.ContentManager;
using Tridion.ContentManager.CommunicationManagement;
using Tridion.ContentManager.ContentManagement;
using Tridion.ContentManager.Extensibility;
using Tridion.ContentManager.Extensibility.Events;
using Tridion.ContentManager.Publishing;
using Tridion.ContentManager.Publishing.Resolving;
using Tridion.IntegrationEngine.TridionEventHandler.Models;
using Tridion.Logging;

namespace Tridion.IntegrationEngine.TridionEventHandler
{
    [TcmExtension("TridionIntegrationEngine-Extension")]
    public class IntegrationEngineEventHandler : TcmExtension
    {
        public IntegrationEngineEventHandler()
        {
            EventSystem.Subscribe<Component, SaveEventArgs>(OnComponentSave, EventPhases.Processed);
            EventSystem.Subscribe<Page, SaveEventArgs>(OnPageSave, EventPhases.Processed);
            EventSystem.Subscribe<StructureGroup, SaveEventArgs>(OnStructureGroupSave, EventPhases.Processed);
            EventSystem.Subscribe<Schema, SaveEventArgs>(OnSchemaSave, EventPhases.Processed);
            EventSystem.Subscribe<ComponentTemplate, SaveEventArgs>(OnComponentTemplateSave, EventPhases.Processed);
            EventSystem.Subscribe<PageTemplate, SaveEventArgs>(OnPageTemplateSave, EventPhases.Processed);
            EventSystem.Subscribe<Publication, SaveEventArgs>(OnPublicationSave, EventPhases.Processed);



            EventSystem.Subscribe<Component, DeleteEventArgs>(OnComponentDelete, EventPhases.Processed);
            EventSystem.Subscribe<Page, DeleteEventArgs>(OnPageDelete, EventPhases.Processed);
            EventSystem.Subscribe<StructureGroup, DeleteEventArgs>(OnStructureGroupDelete, EventPhases.Processed);
            EventSystem.Subscribe<Schema, DeleteEventArgs>(OnSchemaDelete, EventPhases.Processed);
            EventSystem.Subscribe<ComponentTemplate, DeleteEventArgs>(OnComponentTemplateDelete, EventPhases.Processed);
            EventSystem.Subscribe<PageTemplate, DeleteEventArgs>(OnPageTemplateDelete, EventPhases.Processed);
            EventSystem.Subscribe<Publication, DeleteEventArgs>(OnPublicationDelete, EventPhases.Processed);

            EventSystem.Subscribe<PublishTransaction, SetPublishStateEventArgs>(OnPublishProcessed, EventPhases.TransactionCommitted);


            EventSystem.Subscribe<Component, CopyEventArgs>(OnComponentCopy, EventPhases.Processed);
            EventSystem.Subscribe<ComponentTemplate, CopyEventArgs>(OnComponentTemplateCopy, EventPhases.Processed);
            EventSystem.Subscribe<PageTemplate, CopyEventArgs>(OnPageTemplateCopy, EventPhases.Processed);
            EventSystem.Subscribe<Schema, CopyEventArgs>(OnSchemaCopy, EventPhases.Processed);
            EventSystem.Subscribe<StructureGroup, CopyEventArgs>(OnStructureGroupCopy, EventPhases.Processed);
            EventSystem.Subscribe<Page, CopyEventArgs>(OnPageCopy, EventPhases.Processed);
            //EventSystem.Subscribe<Activity, ActivityEventArgs>()
            // TODO: Add more subscriptions here and make it possible to enable/disable them...
            // TODO: Also have some other filters like schema IDs etc  
        }

        private void OnPublicationDelete(Publication subject, DeleteEventArgs e, EventPhases phase)
        {  
             
            try
            {
                Log("On Publication delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPublicationSave(Publication subject, SaveEventArgs e, EventPhases phase)
        {
          
            try
            {
                Log("On Publication save ...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.Title;// subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = e.IsNewItem ? "Created" : "Updated";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageCopy(Page subject, CopyEventArgs e, EventPhases phase)
        {
            try
            {
                Log("On Page Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnStructureGroupCopy(StructureGroup subject, CopyEventArgs e, EventPhases phase)
        {
            try
            {
                Log("On StructureGroup Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnSchemaCopy(Schema subject, CopyEventArgs e, EventPhases phase)
        {
            try
            {
                Log("On Schema Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageTemplateCopy(PageTemplate subject, CopyEventArgs e, EventPhases phase)
        {
            try
            {
                Log("On PageTemplate Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnComponentTemplateCopy(ComponentTemplate subject, CopyEventArgs e, EventPhases phase)
        {
            try
            {
                Log("On ComponentTemplate Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnComponentCopy(Component subject, CopyEventArgs e, EventPhases phase)
        {  
            try
            {
                Log("On Component Copy...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Created";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageTemplateDelete(PageTemplate subject, DeleteEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On PageTemplate delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageTemplateSave(PageTemplate subject, SaveEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On PageTemplate Save...");

                bool subjectUpdated = false;
                if (subject.IsNew)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = subject.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Created";

                    SendEvent(openSearchComponent);
                }
                else
                {
                    var versions = subject.GetVersions().ToArray();
                    var previousVersion = versions[versions.Length - 2];

                    if (subject.RevisionDate > previousVersion.RevisionDate) // TODO: Have this configurable
                    {
                        // Avoid flooding the TIE if the time delta between this version and previous version is small
                        //
                        subjectUpdated = true;
                    }
                }

                if (subjectUpdated)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = subject.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Updated";

                    SendEvent(openSearchComponent);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnComponentTemplateDelete(ComponentTemplate subject, DeleteEventArgs e, EventPhases phase)
        { 
            try
            {
                Log("On ComponentTemplate delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnComponentTemplateSave(ComponentTemplate subject, SaveEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On Componenttemplate Save...");

                bool subjectUpdated = false;
                if (subject.IsNew)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = subject.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Created";

                    SendEvent(openSearchComponent);
                }
                else
                {
                    var versions = subject.GetVersions().ToArray();
                    var previousVersion = versions[versions.Length - 2];

                    if (subject.RevisionDate > previousVersion.RevisionDate) // TODO: Have this configurable
                    {
                        // Avoid flooding the TIE if the time delta between this version and previous version is small
                        //
                        subjectUpdated = true;
                    }
                }

                if (subjectUpdated)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = subject.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Updated";

                    SendEvent(openSearchComponent);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnSchemaDelete(Schema subject, DeleteEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On Schema delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnSchemaSave(Schema schema, SaveEventArgs e, EventPhases phase)
        {
             
            try
            {
                Log("On Schema Save...");

                bool schemaUpdated = false;
                if (schema.IsNew)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = schema.Id;
                    openSearchComponent.Title = schema.Title;
                    openSearchComponent.Status = schema.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = schema.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = schema.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = schema.ContextRepository.Title;
                    openSearchComponent.DateTime = schema.RevisionDate.ToString();
                    openSearchComponent.User = schema.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Created";

                    SendEvent(openSearchComponent);
                }
                else
                {
                    var versions = schema.GetVersions().ToArray();
                    var previousVersion = versions[versions.Length - 2];

                    if (schema.RevisionDate > previousVersion.RevisionDate) // TODO: Have this configurable
                    {
                        // Avoid flooding the TIE if the time delta between this version and previous version is small
                        //
                        schemaUpdated = true;
                    }
                }

                if (schemaUpdated)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = schema.Id;
                    openSearchComponent.Title = schema.Title;
                    openSearchComponent.Status = schema.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = schema.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = schema.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = schema.ContextRepository.Title;
                    openSearchComponent.DateTime = schema.RevisionDate.ToString();
                    openSearchComponent.User = schema.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Updated";

                    SendEvent(openSearchComponent);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnStructureGroupDelete(StructureGroup subject, DeleteEventArgs e, EventPhases phase)
        {
            
            try
            {
                Log("On StructureGroup delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageDelete(Page subject, DeleteEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On Page delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }



        private void OnComponentDelete(Component subject, DeleteEventArgs e, EventPhases phase)
        {
             
            try
            {
                Log("On Component delete...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Delete";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = "Deleted";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnStructureGroupSave(StructureGroup subject, SaveEventArgs e, EventPhases phase)
        { 
            try
            {
                Log("On StructureGroup Save...");
                OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                openSearchComponent.Id = subject.Id;
                openSearchComponent.Title = subject.Title;
                openSearchComponent.Status = "Draft";
                openSearchComponent.Type = subject.Id.ItemType.ToString();
                openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                openSearchComponent.DateTime = subject.RevisionDate.ToString();
                openSearchComponent.User = subject.Session.AccessToken.Title;
                openSearchComponent.UserActivity = e.IsNewItem ? "Created" : "Updated";
                SendEvent(openSearchComponent);
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private void OnPageSave(Page subject, SaveEventArgs e, EventPhases phase)
        {
           
            try
            {
                Log("On Page Save...");

                bool componentUpdated = false;
                if (subject.IsNew)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = subject.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Created";
                    SendEvent(openSearchComponent);
                }
                else
                {
                    var versions = subject.GetVersions().ToArray();
                    var previousVersion = versions[versions.Length - 2];

                    if (subject.RevisionDate > previousVersion.RevisionDate) // TODO: Have this configurable
                    {
                        // Avoid flooding the TIE if the time delta between this version and previous version is small
                        //
                        componentUpdated = true;
                    }
                }

                if (componentUpdated)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = subject.Id;
                    openSearchComponent.Title = subject.Title;
                    openSearchComponent.Status = "Draft";
                    openSearchComponent.Type = subject.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = subject.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = subject.ContextRepository.Title;
                    openSearchComponent.DateTime = subject.RevisionDate.ToString();
                    openSearchComponent.User = subject.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Updated";
                    SendEvent(openSearchComponent);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }


        private String _openSearchEndpoint;
        private String _indexName;

        public String OpenSearchEndPoint
        {
            get
            {
                if (_openSearchEndpoint == null)
                    _openSearchEndpoint = GetIntegrationEngineUrl();
                return _openSearchEndpoint;
            }
            set
            {
                _openSearchEndpoint = value;
            }
        }

        public String IndexName
        {
            get
            {
                if (_indexName == null)
                    _indexName = GetOpenSearchIndexName();
                return _indexName;
            }

            set
            {
                _indexName = value;
            }
        }

        private void OnPublishProcessed(PublishTransaction transaction, SetPublishStateEventArgs e, EventPhases phase)
        {
            try
            {  
                if (e.IsPublished)
                {
                    var publishContextsResolvedItems = transaction.PublishContexts.Select(x => x.ResolvedItems);
                    var publishContexts = transaction.PublishContexts;
                    var ProcessedItems = publishContexts.Select(x => x.ProcessedItems);

                    //  System.IO.File.AppendAllText("C:\\Temp\\SaveEvent.txt", string.Format("Publish action Triggered! {0}", (object)Environment.NewLine));
                    Dictionary<string, OpenSearchComponent> components = new Dictionary<string, OpenSearchComponent>();

                    foreach (var publishContextsResolvedItem in publishContextsResolvedItems.First())
                    {
                        ResolvedItem resolvedItem = (ResolvedItem)publishContextsResolvedItem;
                        if (!components.ContainsKey(resolvedItem.Item.Id))
                        {
                            OpenSearchComponent OpenSearchComponent = new OpenSearchComponent();
                            OpenSearchComponent.Id = resolvedItem.Item.Id;
                            OpenSearchComponent.Title = resolvedItem.Item.Title;
                            OpenSearchComponent.Status = "Published";
                            OpenSearchComponent.Type = resolvedItem.Item.Id.ItemType.ToString();
                            OpenSearchComponent.PublicationID = resolvedItem.Item.Id.GetContextRepositoryUri();
                            dynamic dynamic1 = resolvedItem.Item;
                            OpenSearchComponent.PublicationTitle = dynamic1.ContextRepository.Title;
                            OpenSearchComponent.DateTime = transaction.Instruction.StartAt.ToString();    // "01/20/2020 10:02:11 AM";
                            OpenSearchComponent.User = e.Publisher.Title;
                            OpenSearchComponent.UserActivity = "Published";
                            components.Add(resolvedItem.Item.Id, OpenSearchComponent);
                        }
                    }
                    SendEvent(components);
                }
                else
                {
                    var publishContextsResolvedItems = transaction.PublishContexts.Select(x => x.ResolvedItems);
                    var publishContexts = transaction.PublishContexts;
                    var ProcessedItems = publishContexts.Select(x => x.ProcessedItems);

                    //  System.IO.File.AppendAllText("C:\\Temp\\SaveEvent.txt", string.Format("Publish action Triggered! {0}", (object)Environment.NewLine));
                    Dictionary<string, OpenSearchComponent> components = new Dictionary<string, OpenSearchComponent>();

                    foreach (var publishContextsResolvedItem in publishContextsResolvedItems.First())
                    {
                        ResolvedItem resolvedItem = (ResolvedItem)publishContextsResolvedItem;
                        if (!components.ContainsKey(resolvedItem.Item.Id))
                        {
                            OpenSearchComponent OpenSearchComponent = new OpenSearchComponent();
                            OpenSearchComponent.Id = resolvedItem.Item.Id;
                            OpenSearchComponent.Title = resolvedItem.Item.Title;
                            OpenSearchComponent.Status = "UnPublished";
                            OpenSearchComponent.Type = resolvedItem.Item.Id.ItemType.ToString();
                            OpenSearchComponent.PublicationID = resolvedItem.Item.Id.GetContextRepositoryUri();
                            dynamic dynamic1 = resolvedItem.Item;
                            OpenSearchComponent.PublicationTitle = dynamic1.ContextRepository.Title;
                            OpenSearchComponent.DateTime = transaction.Instruction.StartAt.ToString();    // "01/20/2020 10:02:11 AM";
                            OpenSearchComponent.User = e.Publisher.Title;
                            OpenSearchComponent.UserActivity = "UnPublished";
                            components.Add(resolvedItem.Item.Id, OpenSearchComponent);
                        }
                    }
                    SendEvent(components);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        public void OnComponentSave(Component component, SaveEventArgs args, EventPhases phase)
        {
             
            try
            {
                Log("On Component Save...");

                bool componentUpdated = false;
                if (component.IsNew)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = component.Id;
                    openSearchComponent.Title = component.Title;
                    openSearchComponent.Status = component.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = component.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = component.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = component.ContextRepository.Title;
                    openSearchComponent.DateTime = component.RevisionDate.ToString();
                    openSearchComponent.User = component.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Created";

                    SendEvent(openSearchComponent);
                }
                else
                {
                    var versions = component.GetVersions().ToArray();
                    var previousVersion = versions[versions.Length - 2];

                    if (component.RevisionDate > previousVersion.RevisionDate) // TODO: Have this configurable
                    {
                        // Avoid flooding the TIE if the time delta between this version and previous version is small
                        //
                        componentUpdated = true;
                    }
                }

                if (componentUpdated)
                {
                    OpenSearchComponent openSearchComponent = new OpenSearchComponent();
                    openSearchComponent.Id = component.Id;
                    openSearchComponent.Title = component.Title;
                    openSearchComponent.Status = component.IsPublishedInContext ? "Published" : "Draft";
                    openSearchComponent.Type = component.Id.ItemType.ToString();
                    openSearchComponent.PublicationID = component.Id.GetContextRepositoryUri();
                    openSearchComponent.PublicationTitle = component.ContextRepository.Title;
                    openSearchComponent.DateTime = component.RevisionDate.ToString();
                    openSearchComponent.User = component.Session.AccessToken.Title;
                    openSearchComponent.UserActivity = "Updated";

                    SendEvent(openSearchComponent);
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }



        private void SendEvent(Dictionary<string, OpenSearchComponent> openSearchComponents)
        {
            try
            {
                var task = new Task(async () => await SendEventToOpenSearchBulk(openSearchComponents));
                task.ConfigureAwait(false);
                task.Start();
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }

        }
        private void SendEvent(OpenSearchComponent openSearchComponents)
        {
            try
            {
                var task = new Task(async () => await SendEventToOpenSearch(openSearchComponents));
                task.ConfigureAwait(false);
                task.Start();
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private async Task SendEventToOpenSearchBulk(Dictionary<string, OpenSearchComponent> items)
        {
            try
            {
                using (HttpClient httpClient = GetHttpClient(true))
                {
                    // Prepare bulk payload
                    var bulkPayload = new StringBuilder();

                    foreach (OpenSearchComponent item in items.Values)
                    {
                        // Add metadata line for each item
                        bulkPayload.AppendLine(JsonConvert.SerializeObject(new { index = new { _index = IndexName } }));

                        // Add actual item data
                        bulkPayload.AppendLine(JsonConvert.SerializeObject(item));
                    }
                    // Convert payload to StringContent
                    var content = new StringContent(bulkPayload.ToString(), Encoding.UTF8, "application/json");

                    // OpenSearch Bulk API endpoint
                    var url = $"{OpenSearchEndPoint}/_bulk";

                    try
                    {
                        // Send HTTP POST request
                        var response = await httpClient.PostAsync(url, content);

                        // Check response
                        if (response.IsSuccessStatusCode)
                        {
                            Console.WriteLine("Items successfully indexed!");
                        }
                        else
                        {
                            var errorResponse = await response.Content.ReadAsStringAsync();
                            Console.WriteLine($"Failed to index items. Response: {errorResponse}");
                        }
                    }
                    catch (Exception ex)
                    {
                        Log(ex.Message, TraceEventType.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
            }
        }

        private async Task SendEventToOpenSearch(OpenSearchComponent openSearchComponent)
        {
            
            if (OpenSearchEndPoint != null)
            {
                // OpenSearch Bulk API endpoint
                var url = $"{OpenSearchEndPoint}/{IndexName}/_doc";
                try
                {
                    using (HttpClient client = GetHttpClient(true))
                    {
                        var content = JsonConvert.SerializeObject(openSearchComponent);
                        var bodyContent = new StringContent(content, Encoding.UTF8, "application/json");
                        using (HttpResponseMessage responseMessage =
                            await client.PostAsync(url, bodyContent).ConfigureAwait(false))
                        {
                            if (responseMessage.StatusCode == HttpStatusCode.BadRequest)
                            {
                                string errorMessage =
                                    await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
                                throw new HttpRequestException("Bad request: " + errorMessage);
                            }

                            responseMessage.EnsureSuccessStatusCode();
                            await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Log(ex.Message, TraceEventType.Error);
                }
            }
        }
        private HttpClient GetHttpClient(bool withDefaultHeaders)
        {
            var handler = new HttpClientHandler();

            if (handler.SupportsAutomaticDecompression)
            {
                handler.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
            }

            var client = new HttpClient(handler, true);

            if (withDefaultHeaders)
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", "Tridion");
                client.DefaultRequestHeaders.Add("Authorization", "Basic YWRtaW46YWRtaW4=");

            }
            return client;
        }

        private string GetIntegrationEngineUrl()
        {
            try
            {
                var extensionConfig = GetExtensionConfiguration();
                if (extensionConfig == null)
                {
                    Log("No configuration has been given to the extension!", TraceEventType.Error);
                    return null;
                }

                var urlConfig = extensionConfig.GetSection("integrationEngineUrl");
                if (urlConfig == null || string.IsNullOrEmpty(urlConfig.Value))
                {
                    Log("Missing parameter 'integrationEngineUrl'", TraceEventType.Error);
                    return null;
                }
                Log("Integration engine URL successfully retrieved.", TraceEventType.Information);
                return urlConfig.Value;
            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
                return null;
            }

        }

        private string GetOpenSearchIndexName()
        {
            try
            {
                var extensionConfig = GetExtensionConfiguration();
                if (extensionConfig == null)
                {
                    Log("No configuration has been given to the extension!", TraceEventType.Error);
                    return null;
                }

                var indexConfig = extensionConfig.GetSection("indexName");
                if (indexConfig == null || string.IsNullOrEmpty(indexConfig.Value))
                {
                    Log("Missing parameter 'indexName'", TraceEventType.Error);
                    return null;
                }

                Log("Index name successfully retrived: " + indexConfig.Value);
                return indexConfig.Value;

            }
            catch (Exception ex)
            {
                Log(ex.Message, TraceEventType.Error);
                return null;
            }
        }


        private IConfigurationSection GetExtensionConfiguration()
        {
            try
            {
                if (AddonConfiguration == null)
                {
                    Log("AddonConfiguration is null. Cannot retrieve extension configuration.", TraceEventType.Warning);
                    return null;
                }

                var extensionConfig = AddonConfiguration
                    .GetSection("configuration")
                    ?.GetSection("IntegrationEngineEventHandler");

                if (extensionConfig == null)
                {
                    Log("IntegrationEngineEventHandler section is missing in the configuration.", TraceEventType.Warning);
                }

                return extensionConfig;
            }
            catch (Exception ex)
            {
                Log($"An error occurred while retrieving the extension configuration: {ex.Message}", TraceEventType.Error);
                return null;
            }
        }

        private void Log(string message, System.Diagnostics.TraceEventType severity = TraceEventType.Information)
        {
            Logger.Write(message, "Integration Engine Event Handler", LogCategory.Custom, severity);
        }
    }
}