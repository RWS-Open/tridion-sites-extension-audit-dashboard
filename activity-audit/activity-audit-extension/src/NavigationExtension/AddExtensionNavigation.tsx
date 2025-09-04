import { t } from "@globals";
import { ExtensionBuilder } from "@tridion-sites/extensions";
import Metrics  from "src/Pages/Metrics";

export const AddExtensionNavigation = (builder:ExtensionBuilder) => {
    builder.translations.addTranslation("en", {
        "mypagelabel":"Activity Audit"
    })
    builder.translations.addTranslation("fr",{
        "mypagelabel":"fr:Activity Audit"
    })
    builder.header.navigation.register(() => ({
        id:"metrics",
        routePath:"/audit",
        routeComponent:Metrics,
        useNavigationItem:() => {
            return{
                isAvailable:true,
                label:t('Activity Audit')
            }
        }
    }))
    builder.header.navigation.config.add('metrics')
}