import { Chip, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface BadgeProps {
    name: string;
    album: string;
    star: number;
    isMobile: boolean;
}

const Badge = ({name, album, star, isMobile}: BadgeProps) => {

    const dummyFunction = () => {
        //console.log("dummy function")
        return;
    }

    return (
        <>
        {isMobile ? (
            <Box style={{ backgroundColor: "teal" }} className="flex justify-center rounded-xl py-2 px-3 text-white">
                <div className="pt-1">
                    {name}
                </div>
                <Box style={{ backgroundColor: "#4fd1c5" }} className="rounded-xl p-1 text-white mx-2">
                    {album}
                </Box>
                <Box style={{ backgroundColor: "#4fd1c5" }} className="rounded-xl p-1 text-white">
                    {star.toString()}
                    <StarIcon style={{ color: '#FFD60B' }} />
                </Box>
            </Box>
        ) 
        : (
        <Chip 
            label={name} 
            color='primary' 
            style={{ backgroundColor: "teal", height: '40px', cursor: "default"}}
            onDelete={dummyFunction}
            deleteIcon={
                <div className="relative bottom-0.5 p-1">
                    <div className="inline-block">
                        <Chip 
                            label={album}
                            style={{ 
                                color: "white", 
                                backgroundColor: "#4fd1c5", 
                                height: '25px', 
                                cursor: "default" 
                            }}
                        />
                    </div>
                    <div className="inline-block pl-1">
                        <Chip 
                            label={star.toString()}
                            onDelete={dummyFunction}
                            deleteIcon={<StarIcon style={{ color: '#FFD60B' }} />}
                            style={{ 
                                color: "white", 
                                backgroundColor: "#4fd1c5", 
                                height: '25px', 
                                cursor: "default" 
                            }}
                        />
                    </div>
                </div>
            }
        />
        )}
        </>
    );
};
  
export default Badge;