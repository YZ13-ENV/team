'use client'
import React from "react"
import { ChangeEvent, DragEvent } from "react"

type Props = {
    className?: string
    disabled?: boolean
    onFile?: (file: File) => void
}
const DropZone = ({ onFile, className='', disabled=false }: Props) => {
    const onDrop = (e: DragEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            if (file && onFile) onFile(file)
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            if (file && onFile) onFile(file)
        }
    }
    return (
        <input type="file" disabled={disabled} multiple={false} onDrop={onDrop} onChange={onChange} className={`w-full h-full opacity-0 ${className}`} />
    )
}

export default DropZone