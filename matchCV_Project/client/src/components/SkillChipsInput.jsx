import { useState } from 'react'
import './SkillChipsInput.css'

function SkillChipsInput({
  skills = [],
  onChange = () => {},
  placeholder = 'Type a skill and press Enter',
  label,
}) {
  const [value, setValue] = useState('')

  const normalized = skills.map((skill) => skill.toLowerCase())

  const commitSkill = (raw) => {
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

  const handleKeyDown = (event) => {
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

  const handleRemove = (skill) => {
    onChange(skills.filter((item) => item.toLowerCase() !== skill.toLowerCase()))
  }

  return (
    <div className="skill-input">
      {label && <label className="skill-input-label">{label}</label>}
      <div className="skill-chip-container">
        {skills.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
            <button
              type="button"
              className="skill-chip-remove"
              onClick={() => handleRemove(skill)}
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="skill-chip-input"
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(event) => setValue(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <small className="skill-hint">
        Press Enter or Tab to add, Backspace to remove the last skill.
      </small>
    </div>
  )
}

export default SkillChipsInput