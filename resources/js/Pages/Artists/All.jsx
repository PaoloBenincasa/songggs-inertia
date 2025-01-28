import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function All({auth, artists}){
    return( 
        <AuthenticatedLayout>

            <h1>all artists</h1>
        </AuthenticatedLayout>
    )
}