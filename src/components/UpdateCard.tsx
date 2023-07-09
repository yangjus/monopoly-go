import { Card, CardContent, Typography } from '@mui/material';
import { ChangeLog } from '../../constants/changelog';

const UpdateCard = ({update}: {update: ChangeLog}) => {

    return (
        <Card className="px-8 md:px-4 lg:px-8 mx-8 md:mx-6 lg:mx-8 mt-4 bg-white h-full">
            <CardContent>
                <Typography className="w-full my-2 text-2xl font-bold leading-tight text-left">
                    {update.date}
                </Typography>
                <div color="text.secondary" className="text-left">
                    {update.content.map((desc, i) => (
                        <div key={i}>
                            <Typography className="font-bold">{desc.main}</Typography>
                            <ul className="list-disc ml-4">
                                {desc.sub.map((content) => (
                                    <li>{content}</li>
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