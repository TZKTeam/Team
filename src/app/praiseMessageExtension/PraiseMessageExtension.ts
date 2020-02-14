import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory } from "botbuilder";
import { MessagingExtensionQuery, MessagingExtensionResult } from "botbuilder-teams";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";
import { ITaskModuleResult, IMessagingExtensionActionRequest } from "botbuilder-teams-messagingextensions";
import { treeItemBehavior } from "@stardust-ui/react";
// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/praiseMessageExtension/config.html")
@PreventIframe("/praiseMessageExtension/action.html")
export default class PraiseMessageExtension implements IMessagingExtensionMiddlewareProcessor {
    public async onFetchTask(context: TurnContext, value: IMessagingExtensionActionRequest): Promise<MessagingExtensionResult | ITaskModuleResult> {
        return Promise.resolve<ITaskModuleResult>({
            type: "continue",
            value: {
              //  title: "Input form",
              title: "Send praise to people",
                url: `https://${process.env.HOSTNAME}/praiseMessageExtension/action.html`
            }
        });
    }
    // handle action response in here
    // See documentation for `MessagingExtensionResult` for details
    public async onSubmitAction(context: TurnContext, value: IMessagingExtensionActionRequest): Promise<MessagingExtensionResult> {
        const card = CardFactory.adaptiveCard(
            {
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        size: "Large",
                        text: value.data.email
                    },
                    {
                        type: "Image",
                        size: "Large",
                        url: value.data.praise
                    },
                    // {
                    //     type: "Image",
                    //     url: `https://randomuser.me/api/portraits/thumb/women/${Math.round(Math.random() * 100)}.jpg`
                    // }    
                ],           
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.0"
            });
        return Promise.resolve({
            type: "result",
            attachmentLayout: "list",
            attachments: [card]
        } as MessagingExtensionResult);
    }



}
