import { Card, CardContent, Typography} from '@mui/material';
import { ChangeLog } from '../../constants/changelog';

const UpdateCard = ({update}: {update: ChangeLog}) => {

    return (
        <Card className="px-8 mx-8 my-4 bg-gray-100">
            <CardContent>
                <Typography className="w-full my-2 text-2xl font-bold leading-tight text-left">
                    {update.date}
                </Typography>
                <Typography color="text.secondary" className="text-left">
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
                </Typography>
            </CardContent>
        </Card>
    )
}


export default UpdateCard;