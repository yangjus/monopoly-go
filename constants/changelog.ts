export interface ChangeLog {
    date: String,
    content: {main: String, sub: String[]}[]
}
{/* 
    <li className="ml-8">- <b>Direct Messages!</b> Avoid the hassle of navigating to another platform.</li>
    <ul>
    <li className="ml-16">- To DM a user, click on the message bubble next to their name in the trading page</li>
    <li className="ml-16">Then refresh the page, and click the blue message button on the bottom left</li>
    <li className="ml-16">- Currently it is manual refresh to see latest direct messages, but will be updated in the future</li>
    </ul>
    <li className="ml-8">- <b>Global Chat!</b> Featuring live, auto updates! Converse with your fellow MGO traders!</li>
    <ul>
    <li className="ml-16">- Will only display the past two days of chat history</li>
    <li className="ml-16">- In the future, will be able to DM other users directly from global chat</li>
    </ul>
*/}
export const changelog: ChangeLog[] = [
    {
        date: "May 24, 2023",
        content: [
            {
                main: "Direct Messages feature added",
                sub: [
                    "Avoid the hassle of navigating to another platform",
                    "To DM a user, click on the message bubble next to their name in the trading page"
                ]
            },
            {
                main: "Global Chat feature added",
                sub: [
                    "Converse with your fellow MGO tradings, with live auto updates",
                    "Will display the past week of chat history"
                ]
            }
        ]
    },
    {
        date: "June 1, 2023",
        content: [
            {
                main: "Mobile version is now out!",
                sub: [
                    "Added UI responsiveness for small devices (breakpoints, sizing, etc.)"
                ]
            },
            {
                main: "Other small UI and bug changes",
                sub: [
                    "Fixed bug where users could not register due to rank field",
                    "Changed rank field to Net Worth field",
                    "Fixed Firefox compatibility where POST request did not work upon button click"
                ]
            }
        ]
    },
    {
        date: "June 16, 2023",
        content: [
            {
                main: "Remove Direct Message feature added",
                sub: [
                    "Trash button next to name in Direct Messages under trading page",
                    "Conversation history will not be deleted! Can remessage"
                ]
            },
            {
                main: "Copy Inventory to Clipboard feature added",
                sub: [
                    "User can copy 1-3 star or 4-5 star stickers of what they need and what they have"
                ]
            },
            {
                main: "Other small UI and bug changes",
                sub: []
            }
        ]
    },
]