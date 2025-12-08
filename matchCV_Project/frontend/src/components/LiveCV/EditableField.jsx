import { useState, useRef, useEffect } from 'react';
import './EditableField.css';

/**
 * EditableField - A component that displays text but becomes editable on click
 * @param {string} value - Current value
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Placeholder text
 * @param {string} type - 'text', 'textarea', or 'contenteditable'
 * @param {string} className - Additional CSS classes
 * @param {string} tag - HTML tag to render (h1, h2, p, span, etc.)
 */
function EditableField({
    value = '',
    onChange,
    placeholder = 'Click to edit',
    type = 'text',
    className = '',
    tag = 'p',
    multiline = false,
    disabled = false,
    formatDisplay
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (type === 'text') {
                inputRef.current.select();
            }
        }
    }, [isEditing, type]);

    const handleClick = () => {
        if (!disabled) {
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (onChange && localValue !== value) {
            onChange(localValue);
        }
    };

    const handleChange = (e) => {
        setLocalValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (type === 'text' && e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            setIsEditing(false);
        }
    };

    const handleContentEditableBlur = (e) => {
        const newValue = e.target.innerText;
        setLocalValue(newValue);
        setIsEditing(false);
        if (onChange && newValue !== value) {
            onChange(newValue);
        }
    };

    const handleContentEditableInput = (e) => {
        setLocalValue(e.target.innerText);
    };

    // For contentEditable mode
    if (type === 'contenteditable') {
        const Tag = tag;
        return (
            <Tag
                ref={contentRef}
                className={`editable-field ${className} ${!localValue ? 'empty' : ''}`}
                contentEditable={!disabled}
                suppressContentEditableWarning
                onBlur={handleContentEditableBlur}
                onInput={handleContentEditableInput}
                data-placeholder={placeholder}
            >
                {localValue}
            </Tag>
        );
    }

    // For input/textarea mode
    if (isEditing) {
        if (multiline || type === 'textarea') {
            return (
                <textarea
                    ref={inputRef}
                    className={`editable-field-input ${className}`}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={3}
                />
            );
        }
        return (
            <input
                ref={inputRef}
                type={type}
                className={`editable-field-input ${className}`}
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        );
    }

    // Display mode
    const Tag = tag;
    const displayValue = formatDisplay
        ? formatDisplay(localValue)
        : (localValue || (disabled ? '' : placeholder));

    if (disabled && !localValue && !placeholder) return null;

    return (
        <Tag
            className={`editable-field ${className} ${!localValue ? 'empty' : ''} ${disabled ? 'read-only' : ''}`}
            onClick={handleClick}
            title={disabled ? undefined : "Click to edit"}
        >
            {displayValue}
        </Tag>
    );
}

export default EditableField;
