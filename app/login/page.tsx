import { AuthError } from "next-auth";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
    return (
        <>
            <form
                action={async () => {
                    "use server";
                    const response = await signIn("github",{ redirectTo: "/" });
                    console.log(response);
                }}
            >
                <Button type="submit">
                    <GithubIcon className="mr-2 h-4 w-4" /> Login with GitHub
                </Button>
            </form>
        </>
    );
}
