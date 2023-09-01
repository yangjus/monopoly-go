import { Grid } from "@mui/material";
import Link from 'next/link';

export default function Footer() {
    return (
    <div className="flex justify-between items-center bg-teal-500 p-6">
        <div className="block sm:inline-block sm:mt-0 text-white mr-4">
            <Grid container>
                <Grid item xs={12}>
                    This website is not affiliated with the official MonopolyGO creators. 
                    <Link href="/privacy" className="ml-4 text-blue-600">
                        Privacy Policy
                    </Link>
                </Grid>
            </Grid>
        </div>
        <div className="block mt-4 sm:inline-block sm:mt-0 text-white mr-4">
            Ver 2.4.0
        </div>
    </div>
    )
}