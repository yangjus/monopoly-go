import { Card, CardContent, Typography } from '@mui/material';
import { ChangeLog } from '../../constants/changelog';

const UpdateCard = ({update}: {update: ChangeLog}) => {

    return (
        <Card className="px-8 md:px-4 lg:px-8 mx-8 md:mx-6 lg:mx-8 mt-4 bg-white h-full">
            <CardContent>
                <div className="w-full my-2 text-2xl font-bold leading-tight text-left">
                    {update.date}
                </div>
                <div color="text.secondary" className="text-left">
                    {update.content.map((desc, i) => (
                        <div key={i}>
                            <div className="font-bold">{desc.main}</div>
                            <ul className="list-disc ml-4">
                                {desc.sub.map((content, i) => (
                                    <li key={i} className="leading-tight">{content}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


export default UpdateCard;