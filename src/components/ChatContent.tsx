import { sentMessage } from '@component/pages/api/get-messages';
import { Grid } from '@mui/material';
import moment from "moment-timezone";

const leftTriangle: string = "relative top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-500 rotate-45";
const rightTriangle: string = "relative top-0 right-0 transform -translate-y-1/2 w-2 h-2 bg-orange-400 rotate-45";


const ChatContent = ({user, currentChat}: {user: any, currentChat: sentMessage[]}) => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const parseDate = (date: Date) => {
        const dateString: string = moment(date).tz(userTimezone).format('MMM D, YYYY h:mm A');
        return dateString;
    }

    return (
        <>
        {currentChat.map((m: sentMessage, index: number) => {
            return (m.sender == user.username ? (
                <Grid item xs={12} key={index}>
                <div className="flex justify-end pt-1">
                    <div className="text-sm text-gray-500 mt-1 mr-2">
                        {parseDate(m.timestamp)}
                    </div>
                    <div className="text-md">
                        You
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="rounded bg-orange-400 text-white my-1 px-4 pb-1 max-w-4/5">
                        <div className="flex justify-end">
                            <div className={rightTriangle}></div>
                        </div>
                        {m.content}
                    </div>
                </div>
                </Grid>
            ) : (
                <Grid item xs={12} key={index}>
                <div className="flex pt-1">
                    <div className="text-md">
                        {m.sender}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 ml-2">
                        {parseDate(m.timestamp)}
                    </div>
                </div>
                <div className="rounded bg-teal-500 text-white my-1 px-4 pb-1 max-w-4/5">
                    <div className={leftTriangle}></div>
                    {m.content}
                </div>
                </Grid>
            ))}
        )}
        </>
    )
}

export default ChatContent;