import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const page = () => {
  return (
    <div className="w-full h-full flex items-start gap-4 pt-6">
      <div className="w-80 shrink-0 h-full border-r flex flex-col gap-4 pr-6">
        <span className="text-lg font-semibold">Активные приглашения</span>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-9 rounded-md bg-muted"></div>
        </div>
      </div>
      <div className="w-full pt-3">
        <div className="w-full max-w-3xl mx-auto h-fit flex items-center gap-4">
          <Input />
          <Button>Найти</Button>
        </div>
        <div className="w-full h-full max-w-3xl mx-auto flex flex-col py-4">
          <div className="w-full h-9 rounded-md bg-muted"></div>
        </div>
      </div>
    </div>
  )
}

export default page