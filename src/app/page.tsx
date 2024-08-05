import LoginButton from "@/components/auth/LoginButton";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/auth/SignOut";
import UpdateUser from "@/components/UpdateUser";
import { LinkButton } from "@/components/ui/linkButton";


export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-6">
        <h1 className="text-6xl text-white drop-shadow-md">🔐 Auth</h1>
        <p className="text-white text-lg">A simple authentication service</p>
        {
          session?.user ? (
            <div className="flex gap-4 items-center justify-center">
              <LinkButton href="/server">Server</LinkButton>
              <SignOut />
            </div>
          ) : (
            <LoginButton>
              <Button variant='secondary' size='lg'>Sign in</Button>
            </LoginButton>
          )
        }

      </div>
    </main>
  );
}