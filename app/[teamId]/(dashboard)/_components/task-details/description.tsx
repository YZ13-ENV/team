"use client"
import { useDebounceEffect, useDebounceFn } from "ahooks"
import { TeamTask, team } from "api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Textarea } from "ui"

type Props = {
  isAuthor?: boolean
  teamId: string
  taskId: string
  description?: TeamTask['description']
}
const Description = ({ teamId, taskId, description, isAuthor = false }: Props) => {
  const [debouncedDescription, setDebouncedDescription] = useState(description || "Не указано")
  const { refresh } = useRouter()
  const updateDescription = async (description: string) => {
    await team.task.update(teamId, taskId, { description: description })
    refresh()
  }
  useDebounceEffect(() => {
    updateDescription(debouncedDescription)
  }, [debouncedDescription], { wait: 1000 })
  if (!isAuthor) return (
    <div className="pt-4 pb-6">
      <span className="text-sm">{description || "Не указано"}</span>
    </div>
  )
  return (
    <div className="w-full pt-4 pb-6">
      <Textarea className="w-full text-sm" value={debouncedDescription} onChange={e => setDebouncedDescription(e.target.value)} placeholder="Укажите описание к задаче..." />
    </div>
  )
}

export default Description