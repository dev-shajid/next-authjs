import { Skeleton } from "./ui/skeleton"


export function UserInfo({user}: {user: any}) {
    if(!user) return null
    return (
      <div className='space-y-3'>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
          <p className="text-sm font-medium">
            ID
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
          <p className="text-sm font-medium">
            Name
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.name}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
          <p className="text-sm font-medium">
            Email
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
          <p className="text-sm font-medium">
            Role
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.role}
          </p>
        </div>
      </div>
    )
  }
  
  export function UserInfoFallback() {
    return (
      <div className='space-y-3'>
        {
          [1, 2, 3,4].map((_, i) => (
            <div key={i} className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
              <Skeleton className="w-[100px] h-[20px] rounded-sm" />
              <Skeleton className="w-[200px] h-[20px] rounded-sm" />
            </div>
          ))
        }
      </div>
    )
  }