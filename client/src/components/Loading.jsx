
import {Loader2Icon} from 'lucide-react'

function Loading() {
  return (
    <div className='h-screen flex items-center justify-center bg-white'>
        <Loader2Icon size= {26} className="animate-spin text-zinc-950 "/>
        <p className="mt-2 text-zinc-950"> Loading... </p>

    </div>
  )
}

export default Loading