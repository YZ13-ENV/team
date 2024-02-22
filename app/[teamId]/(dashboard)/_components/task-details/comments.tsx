import { Button } from "@/components/ui/button"
import { Textarea } from "ui"
// import { Separator } from "@/components/ui/separator"

const Comments = () => {
  return (
    <div className="w-full h-fit py-4">
      <div className="w-full border bg-muted p-4 flex flex-col gap-2 rounded-lg h-fit">
        <Textarea disabled placeholder="Начните вводить..." className="text-sm" />
        <div className="w-full flex items-center justify-end">
          <Button disabled size='sm' variant='default'>Отправить</Button>
        </div>
      </div>
      {/* <Separator className="my-4" /> */}
      {/* <div className="w-full h-96 bg-muted rounded-lg"></div> */}
    </div>
  )
}

export default Comments