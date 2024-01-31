import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BiRightArrowAlt } from "react-icons/bi"
import { Textarea } from 'ui'

const page = () => {
  return (
    <div className="flex flex-col w-full overflow-y-auto max-h-full">
      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Настройки</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">

        <div className="w-full h-fit flex flex-col gap-4 py-6 border-b">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Название команды</span>
            <span className="text-sm text-muted-foreground">Под каким название пользователи будут узнавать вашу команду</span>
          </div>
          <Input placeholder="Введите название команды" />
        </div>

        <div className="w-full h-fit flex flex-col gap-4 py-6 border-b">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Цель команды</span>
            <span className="text-sm text-muted-foreground">Можете кратко указать цель команды</span>
          </div>
          <Input placeholder="Введите цель команды" />
        </div>

        <div className="w-full h-fit flex flex-col gap-4 py-6">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Описание команды</span>
            <span className="text-sm text-muted-foreground">Будет отображаться в обзоре команды</span>
          </div>
          <Textarea placeholder="Введите описание команды" className='px-3 py-2 rounded-md border text-sm' />
        </div>

      </div>
      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Ссылки</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full h-fit flex flex-col gap-4 py-6 border-b">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Ссылка</span>
            <span className="text-sm text-muted-foreground">Укажите ссылку на страницу команды</span>
          </div>
          <Input placeholder="Введите цель команды" />
        </div>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Участники</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full h-fit flex flex-col gap-4 py-6">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Управление составом команды</span>
            <span className="text-sm text-muted-foreground">Пригласить новых, исключить старых</span>
          </div>
          <Button className="w-fit gap-2" variant='default'>Перейти к управлению <BiRightArrowAlt /></Button>
        </div>
      </div>
      <Separator />

      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Опасная зона</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full h-fit flex flex-col gap-4 py-6 border-b">
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Удалить команду</span>
            <span className="text-sm text-muted-foreground">Удалится и весь контент, созданный командой</span>
          </div>
          <Button className="w-fit" variant='destructive'>Удалить команду</Button>
        </div>
      </div>
    </div>
  )
}

export default page