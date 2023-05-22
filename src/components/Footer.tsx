import { Grid } from "@mui/material"

export default function Footer() {
    return (
    <div className="flex justify-between items-center bg-teal-500 p-6">
        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            <Grid container>
                <Grid item xs={12}>
                    Use a desktop or large device and latest Chrome browser version for best user experience.
                </Grid>
                <Grid item xs={12}>
                    This website is not affiliated with the official MonopolyGO creators.
                </Grid>
            </Grid>
        </div>
        <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            Ver 1.0.0
        </div>
    </div>
    )
}