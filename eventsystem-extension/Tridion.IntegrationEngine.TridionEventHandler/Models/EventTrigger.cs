namespace Tridion.IntegrationEngine.TridionEventHandler.Models
{
    public class EventTrigger
    {
        public string ItemId { get; set; }
        
        public string ItemSchemaId { get; set; }
        public string ItemType { get; set; }

        public string ItemTitle { get; set; }
        public string EventType { get; set; }
    }
}