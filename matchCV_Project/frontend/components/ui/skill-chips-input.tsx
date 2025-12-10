'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface SkillChipsInputProps {
  skills?: string[]
  onChange?: (skills: string[]) => void
  placeholder?: string
  label?: string
}

export function SkillChipsInput({
  skills = [],
  onChange = () => {},
  placeholder = 'Type a skill and press Enter',
  label,
}: SkillChipsInputProps) {
  const [value, setValue] = useState('')

  const normalized = skills.map((skill) => skill.toLowerCase())

  const commitSkill = (raw: string) => {
    const trimmed = (raw || '').trim()
    if (!trimmed) {
      setValue('')
      return
    }
    if (normalized.includes(trimmed.toLowerCase())) {
      setValue('')
      return
    }
    onChange([...skills, trimmed])
    setValue('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab', ','].includes(event.key)) {
      event.preventDefault()
      commitSkill(value)
    } else if (event.key === 'Backspace' && !value && skills.length > 0) {
      event.preventDefault()
      onChange(skills.slice(0, -1))
    }
  }

  const handleBlur = () => {
    if (value.trim()) {
      commitSkill(value)
    }
  }

  const handleRemove = (skill: string) => {
    onChange(skills.filter((item) => item.toLowerCase() !== skill.toLowerCase()))
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-background min-h-[48px] items-center">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            {skill}
            <button
              type="button"
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              onClick={() => handleRemove(skill)}
              aria-label={`Remove ${skill}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-[180px] border-none bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(event) => setValue(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <small className="text-xs text-muted-foreground">
        Press Enter, Tab, or comma to add, Backspace to remove the last skill.
      </small>
    </div>
  )
}

