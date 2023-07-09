export interface ChangeLog {
    date: String,
    content: {main: String, sub: String[]}[]
}

export const changelog: ChangeLog[] = [
    {
        date: "July 9, 2023",
        content: [
            {
                main: "Revamped homepage to give site visitors a greater UX experience",
                sub: [
                    "Hero, feature, changelog, community, and contact sections added",
                    "Changed to hamburger menu navigation in navbar for mobile users",
                ]
            },
            {
                main: "Added live registered user count in Community section",
                sub: []
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
]