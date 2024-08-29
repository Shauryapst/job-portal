import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {  GoogleOutlined, GithubOutlined } from "@ant-design/icons";
export default function LoginPage() {
    return (
        <div className="flex items-center justify-center flex-col h-full">
            <form
                action={async () => {
                    "use server";
                    await signIn("github",{ redirectTo: "/" });
                    
                }}
            >
                <Button className="m-2 text-lg" type="submit">
                    <GithubOutlined className="mr-2 h-4 w-4" /> Login with GitHub
                </Button>
            </form>
            <form
                action={async () => {
                    "use server";
                    await signIn("github",{ redirectTo: "/" });
                    
                }}
            >
                <Button  className="m-2 text-lg " type="submit">
                    <GoogleOutlined className="mr-2 h-4 w-4" /> Login with Google
                </Button>
            </form>
        </div>
    );
}
