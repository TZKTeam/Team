import * as React from "react";
import { Provider, Flex, Header, Input, Button, Text } from "@stardust-ui/react";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the PraiseMessageExtensionAction React component
 */
export interface IPraiseMessageExtensionActionState extends ITeamsBaseComponentState {
    email: string;
    praise:string;
}

/**
 * Properties for the PraiseMessageExtensionAction React component
 */
export interface IPraiseMessageExtensionActionProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the Praise Message Extension Task Module page
 */
export class PraiseMessageExtensionAction extends TeamsBaseComponent<IPraiseMessageExtensionActionProps, IPraiseMessageExtensionActionState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true} column styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Flex.Item>
                        <div>
                            {/* <Header content="Praise Message Extension" /> */}
                            {/* <Text content="Enter an e-mail address" /> */}
                            <Text content="Select a badge" align="center"/>
                            <div style={{display:"inline",alignContent:"center",alignItems:"center",marginLeft:"30px"}}>
                                <a href="#" onClick={()=>{this.setState({praise:"https://i.pinimg.com/originals/41/28/2b/41282b58cf85ddaf5d28df96ed91de98.png"})}}><img src="https://i.pinimg.com/originals/41/28/2b/41282b58cf85ddaf5d28df96ed91de98.png" width="30px" height="auto"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="#" onClick={()=>{this.setState({praise:"https://cdn2.iconfinder.com/data/icons/social-media-square-set/960/Twitter_Sq-512.png"})}}><img src="https://cdn2.iconfinder.com/data/icons/social-media-square-set/960/Twitter_Sq-512.png" width="50px" height="30px"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="#" onClick={()=>{this.setState({praise:"https://www.pngfind.com/pngs/m/10-103831_icon-instagram-instagram-hd-png-download.png"})}}><img src="https://www.pngfind.com/pngs/m/10-103831_icon-instagram-instagram-hd-png-download.png" width="30px" height="auto"/></a>
                            </div>
                            <Input
                                placeholder="Enter an e-mail address"
                                fluid
                                clearable
                                value={this.state.email}
                                defaultValue={this.state.praise}
                                onChange={(e,data)=>{
                                    if (data) {
                                        this.setState({
                                            email: data.value
                                        });
                                    }
                                }}
                                required />
                               
                            <Button onClick={()=> microsoftTeams.tasks.submitTask({
                                    email:this.state.email,
                                    praise:this.state.praise
                                })} primary>OK</Button> 
                        </div>
                    </Flex.Item> 
                        <Header content="2nd adaptive card"/>
                        <p><a href="#" onClick={()=>window.location.replace("./index.html")}><img src="https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-600w-407021107.jpg"  width="100px" height="100px"/></a></p> 
                </Flex>
            </Provider>
        );
    }
}
