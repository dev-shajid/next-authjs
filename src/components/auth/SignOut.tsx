import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { DEFAUTL_UNAUTH_REDIRECT } from "@/routes"
import { Suspense } from "react"
import { VscLoading } from "react-icons/vsc"

export function SignOut({className, label}: {className?: string, label?: string}) {
  return (
    <Suspense fallback={<VscLoading className='animate-spin size-4' />}>
      <form
        action={async () => {
          "use server"
          await signOut({ redirect: true, redirectTo: DEFAUTL_UNAUTH_REDIRECT })
        }}
      >
        <Button type="submit" className={className}>
          {label || 'Sign Out'}
        </Button>
      </form>
    </Suspense>
  )
}