import { cn } from "@/lib/utils"

type Props = {
  title?: string
  description?: string
  children?: JSX.Element
  noSeparator?: boolean
}
const SettingsBlock = ({ children, description, title, noSeparator=false }: Props) => {
  return (
    <div className={cn(
      "w-full h-fit flex flex-col gap-4 py-6",
      noSeparator ? '' : 'border-b'
    )}>
      <div className="w-full h-fit flex flex-col">
        <span className="font-medium">{ title || 'Не указано' }</span>
        <span className="text-sm text-muted-foreground">{ description || 'Не указано' }</span>
      </div>
      { children }
    </div>
  )
}

export default SettingsBlock