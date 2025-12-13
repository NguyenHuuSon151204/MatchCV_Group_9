import { useState } from 'react';
import EditableField from '../EditableField';
import './ProfessionalTemplate.css';

function ProfessionalTemplate({ cvData, onUpdate, onImageClick, onAddSection, onConfirm }) {
    const toMonthString = (dateString) => {
        if (!dateString) return '';
        // If it's already YYYY-MM, return it
        if (/^\d{4}-\d{2}$/.test(dateString)) return dateString;
        try {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toISOString().slice(0, 7); // Returns YYYY-MM
            }
        } catch (e) {
            return dateString;
        }
        return dateString;
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) {
            return (
                <span className="material-icons" style={{ fontSize: '18px', color: '#9ca3af', verticalAlign: 'middle', cursor: 'pointer' }}>
                    calendar_today
                </span>
            );
        }
        if (/^\d{4}-\d{2}$/.test(dateString)) {
            const [year, month] = dateString.split('-');
            return `${month}/${year}`;
        }
        return dateString;
    };

    const updatePersonalInfo = (field, value) => {
        onUpdate({
            ...cvData,
            personalInfo: {
                ...cvData.personalInfo,
                [field]: value
            }
        });
    };

    const updateExperience = (id, field, value) => {
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        });
    };

    const addExperience = () => {
        onUpdate({
            ...cvData,
            experiences: [
                ...cvData.experiences,
                {
                    id: Date.now(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        });
    };

    const removeExperience = (id) => {
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.filter(exp => exp.id !== id)
        });
    };

    const updateEducation = (id, field, value) => {
        onUpdate({
            ...cvData,
            educations: cvData.educations.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    const addEducation = () => {
        onUpdate({
            ...cvData,
            educations: [
                ...cvData.educations,
                {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                }
            ]
        });
    };

    const removeEducation = (id) => {
        onUpdate({
            ...cvData,
            educations: cvData.educations.filter(edu => edu.id !== id)
        });
    };

    const updateSkill = (id, field, value) => {
        onUpdate({
            ...cvData,
            skills: cvData.skills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            )
        });
    };

    const addSkill = () => {
        onUpdate({
            ...cvData,
            skills: [
                ...cvData.skills,
                { id: Date.now(), name: '', level: '' }
            ]
        });
    };



    const removeSkill = (id) => {
        onUpdate({
            ...cvData,
            skills: cvData.skills.filter(skill => skill.id !== id)
        });
    };

    // Custom Sections Logic
    const updateCustomSectionTitle = (sectionId, value) => {
        onUpdate({
            ...cvData,
            customSections: cvData.customSections.map(sec =>
                sec.id === sectionId ? { ...sec, title: value } : sec
            )
        });
    };

    const removeCustomSection = (sectionId) => {
        onConfirm('Bạn có chắc chắn muốn xóa toàn bộ mục này không?', () => {
            onUpdate({
                ...cvData,
                customSections: cvData.customSections.filter(sec => sec.id !== sectionId),
                sectionOrder: cvData.sectionOrder?.filter(id => id !== sectionId)
            });
        });
    };

    const addCustomSectionItem = (sectionId) => {
        onUpdate({
            ...cvData,
            customSections: cvData.customSections.map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: [...sec.items, { id: Date.now(), title: '', subtitle: '', startDate: '', endDate: '', description: '' }]
                } : sec
            )
        });
    };

    const updateCustomSectionItem = (sectionId, itemId, field, value) => {
        onUpdate({
            ...cvData,
            customSections: cvData.customSections.map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: sec.items.map(item =>
                        item.id === itemId ? { ...item, [field]: value } : item
                    )
                } : sec
            )
        });
    };

    const removeCustomSectionItem = (sectionId, itemId) => {
        onUpdate({
            ...cvData,
            customSections: cvData.customSections.map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: sec.items.filter(item => item.id !== itemId)
                } : sec
            )
        });
    };

    // Sidebar Custom Sections Logic
    const addSidebarSection = () => {
        onUpdate({
            ...cvData,
            sidebarSections: [
                ...(cvData.sidebarSections || []),
                {
                    id: `sidebar-${Date.now()}`,
                    title: 'Mục mới',
                    items: [{ id: Date.now(), title: '', subtitle: '' }]
                }
            ]
        });
    };

    const removeSidebarSection = (sectionId) => {
        onConfirm('Bạn có chắc chắn muốn xóa mục này không?', () => {
            onUpdate({
                ...cvData,
                sidebarSections: (cvData.sidebarSections || []).filter(sec => sec.id !== sectionId)
            });
        });
    };

    const updateSidebarSection = (sectionId, field, value) => {
        onUpdate({
            ...cvData,
            sidebarSections: (cvData.sidebarSections || []).map(sec =>
                sec.id === sectionId ? { ...sec, [field]: value } : sec
            )
        });
    };

    const addSidebarItem = (sectionId) => {
        onUpdate({
            ...cvData,
            sidebarSections: (cvData.sidebarSections || []).map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: [...(sec.items || []), { id: Date.now(), title: '', subtitle: '' }]
                } : sec
            )
        });
    };

    const updateSidebarItem = (sectionId, itemId, field, value) => {
        onUpdate({
            ...cvData,
            sidebarSections: (cvData.sidebarSections || []).map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: (sec.items || []).map(item =>
                        item.id === itemId ? { ...item, [field]: value } : item
                    )
                } : sec
            )
        });
    };

    const removeSidebarItem = (sectionId, itemId) => {
        onUpdate({
            ...cvData,
            sidebarSections: (cvData.sidebarSections || []).map(sec =>
                sec.id === sectionId ? {
                    ...sec,
                    items: (sec.items || []).filter(item => item.id !== itemId)
                } : sec
            )
        });
    };

    return (
        <div className="professional-cv-container">
            <div className="professional-sidebar">
                {/* Avatar */}
                {cvData.personalInfo?.avatarBase64 && (
                    <div className="avatar-container">
                        <img
                            src={cvData.personalInfo.avatarBase64.startsWith('data:')
                                ? cvData.personalInfo.avatarBase64
                                : `data:image/png;base64,${cvData.personalInfo.avatarBase64}`}
                            alt="Avatar"
                            className="avatar"
                            onClick={onImageClick}
                            style={{ cursor: 'pointer' }}
                            title="Click để thay đổi ảnh"
                        />
                    </div>
                )}

                {/* Contact */}
                <div className="section">
                    <h2 className="section-title-sm">
                        Thông tin liên hệ
                        <button className="sidebar-action-btn" onClick={() => {
                            const newContact = { id: Date.now(), value: '' };
                            onUpdate({
                                ...cvData,
                                personalInfo: {
                                    ...cvData.personalInfo,
                                    customContacts: [...(cvData.personalInfo.customContacts || []), newContact]
                                }
                            });
                        }} title="Thêm thông tin liên hệ">
                            <span className="material-icons">add</span>
                        </button>
                    </h2>
                    <ul className="contact-list">
                        <li className="contact-item">
                            <span className="material-icons contact-icon">email</span>
                            <EditableField
                                value={cvData.personalInfo?.email}
                                onChange={(val) => updatePersonalInfo('email', val)}
                                placeholder="email@example.com"
                                tag="span"
                            />
                        </li>
                        <li className="contact-item">
                            <span className="material-icons contact-icon">phone</span>
                            <EditableField
                                value={cvData.personalInfo?.phone}
                                onChange={(val) => updatePersonalInfo('phone', val)}
                                placeholder="0123 456 789"
                                tag="span"
                            />
                        </li>
                        <li className="contact-item">
                            <span className="material-icons contact-icon">home</span>
                            <EditableField
                                value={cvData.personalInfo?.address}
                                onChange={(val) => updatePersonalInfo('address', val)}
                                placeholder="Địa chỉ"
                                tag="span"
                            />
                        </li>
                        {cvData.personalInfo?.website && (
                            <li className="contact-item">
                                <span className="material-icons contact-icon">language</span>
                                <EditableField
                                    value={cvData.personalInfo?.website}
                                    onChange={(val) => updatePersonalInfo('website', val)}
                                    placeholder="website.com"
                                    tag="span"
                                />
                            </li>
                        )}
                        {/* Custom Contacts */}
                        {cvData.personalInfo?.customContacts?.map((contact) => (
                            <li key={contact.id} className="contact-item">
                                <span className="material-icons contact-icon">link</span>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <EditableField
                                        value={contact.value}
                                        onChange={(val) => {
                                            const updatedContacts = cvData.personalInfo.customContacts.map(c =>
                                                c.id === contact.id ? { ...c, value: val } : c
                                            );
                                            onUpdate({
                                                ...cvData,
                                                personalInfo: { ...cvData.personalInfo, customContacts: updatedContacts }
                                            });
                                        }}
                                        placeholder="Thông tin thêm..."
                                        tag="span"
                                    />
                                    <button
                                        className="sidebar-action-btn delete"
                                        onClick={() => {
                                            const updatedContacts = cvData.personalInfo.customContacts.filter(c => c.id !== contact.id);
                                            onUpdate({
                                                ...cvData,
                                                personalInfo: { ...cvData.personalInfo, customContacts: updatedContacts }
                                            });
                                        }}
                                        title="Xóa"
                                    >
                                        <span className="material-icons">delete_outline</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Skills */}
                <div className="section" style={{ marginTop: '30px' }}>
                    <h2 className="section-title-sm">
                        Kỹ năng
                        <button className="sidebar-action-btn" onClick={addSkill} title="Thêm kỹ năng">
                            <span className="material-icons">add</span>
                        </button>
                    </h2>
                    <ul className="skill-list">
                        {cvData.skills?.map((skill) => (
                            <li key={skill.id} className="skill-item">
                                <div className="skill-item-content">
                                    <EditableField
                                        value={skill.name}
                                        onChange={(val) => updateSkill(skill.id, 'name', val)}
                                        placeholder="Tên kỹ năng"
                                        tag="span"
                                        className="skill-name"
                                    />
                                    <EditableField
                                        value={skill.level}
                                        onChange={(val) => updateSkill(skill.id, 'level', val)}
                                        placeholder="Mức độ"
                                        tag="span"
                                        className="skill-level"
                                    />
                                </div>
                                <button
                                    className="sidebar-action-btn delete"
                                    onClick={() => removeSkill(skill.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">delete_outline</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sidebar Custom Sections */}
                {cvData.sidebarSections?.map((section) => (
                    <div key={section.id} className="section" style={{ marginTop: '30px' }}>
                        <h2 className="section-title-sm">
                            <EditableField
                                value={section.title}
                                onChange={(val) => updateSidebarSection(section.id, 'title', val)}
                                placeholder="Tên mục mới"
                                tag="span"
                            />
                            <button
                                className="sidebar-action-btn"
                                onClick={() => addSidebarItem(section.id)}
                                title="Thêm mục con"
                            >
                                <span className="material-icons">add</span>
                            </button>
                            <button
                                className="sidebar-action-btn delete"
                                style={{ marginLeft: '5px' }}
                                onClick={() => removeSidebarSection(section.id)}
                                title="Xóa cả mục"
                            >
                                <span className="material-icons">delete_outline</span>
                            </button>
                        </h2>
                        <ul className="skill-list">
                            {section.items?.map((item) => (
                                <li key={item.id} className="skill-item">
                                    <div className="skill-item-content">
                                        <EditableField
                                            value={item.title}
                                            onChange={(val) => updateSidebarItem(section.id, item.id, 'title', val)}
                                            placeholder="Thông tin"
                                            tag="span"
                                            className="skill-name"
                                        />
                                        <EditableField
                                            value={item.subtitle}
                                            onChange={(val) => updateSidebarItem(section.id, item.id, 'subtitle', val)}
                                            placeholder="Chi tiết (tùy chọn)"
                                            tag="span"
                                            className="skill-level"
                                        />
                                    </div>
                                    <button
                                        className="sidebar-action-btn delete"
                                        onClick={() => removeSidebarItem(section.id, item.id)}
                                        title="Xóa"
                                    >
                                        <span className="material-icons">delete_outline</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Add New Sidebar Section Button */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={addSidebarSection}
                        style={{ width: '100%' }}
                    >
                        <span className="material-icons" style={{ fontSize: '16px', verticalAlign: 'text-bottom', marginRight: '5px' }}>add</span>
                        Thêm mục mới
                    </button>
                </div>
            </div>

            <div className="professional-main-content">
                {/* Header */}
                <header className="header-section">
                    <EditableField
                        value={cvData.personalInfo?.fullName}
                        onChange={(val) => updatePersonalInfo('fullName', val)}
                        placeholder="Họ và Tên"
                        tag="h1"
                        className="name"
                    />
                    <EditableField
                        value={cvData.personalInfo?.position || cvData.experiences?.[0]?.position}
                        onChange={(val) => updatePersonalInfo('position', val)}
                        placeholder="Vị trí ứng tuyển"
                        tag="h3"
                        className="job-title-main"
                    />
                </header>

                {/* Summary */}
                {/* Summary */}
                <section>
                    <h2 className="section-title-lg">Tóm tắt chuyên môn</h2>
                    <EditableField
                        value={cvData.personalInfo?.summary}
                        onChange={(val) => updatePersonalInfo('summary', val)}
                        placeholder="Mô tả ngắn gọn về bản thân..."
                        tag="p"
                        className="summary-text"
                        multiline
                    />
                </section>

                {/* Experience */}
                <section>
                    <h2 className="section-title-lg">
                        Kinh nghiệm làm việc
                        <button className="add-btn-inline" onClick={addExperience} title="Thêm kinh nghiệm">
                            <span className="material-icons">add</span>
                        </button>
                    </h2>
                    {cvData.experiences?.map((exp) => (
                        <div key={exp.id} className="timeline-item">
                            <div className="timeline-left">
                                <EditableField
                                    value={toMonthString(exp.startDate)}
                                    onChange={(val) => updateExperience(exp.id, 'startDate', val)}
                                    placeholder="MM/YYYY"
                                    formatDisplay={formatDisplayDate}
                                    type="month"
                                    tag="span"
                                />
                                {' - '}
                                <EditableField
                                    value={toMonthString(exp.endDate)}
                                    onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                                    placeholder="Hiện tại"
                                    formatDisplay={formatDisplayDate}
                                    type="month"
                                    tag="span"
                                />
                            </div>
                            <div className="timeline-right">
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeExperience(exp.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">delete_outline</span>
                                </button>
                                <EditableField
                                    value={exp.position}
                                    onChange={(val) => updateExperience(exp.id, 'position', val)}
                                    placeholder="Vị trí"
                                    tag="h3"
                                    className="timeline-title"
                                />
                                <EditableField
                                    value={exp.company}
                                    onChange={(val) => updateExperience(exp.id, 'company', val)}
                                    placeholder="Tên công ty"
                                    tag="p"
                                    className="timeline-subtitle"
                                />
                                <EditableField
                                    value={exp.description}
                                    onChange={(val) => updateExperience(exp.id, 'description', val)}
                                    placeholder="Mô tả công việc..."
                                    tag="div"
                                    className="timeline-desc"
                                    multiline
                                />
                            </div>
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section>
                    <h2 className="section-title-lg">
                        Học vấn
                        <button className="add-btn-inline" onClick={addEducation} title="Thêm học vấn">
                            <span className="material-icons">add</span>
                        </button>
                    </h2>
                    {cvData.educations?.map((edu) => (
                        <div key={edu.id} className="timeline-item">
                            <div className="timeline-left">
                                <EditableField
                                    value={toMonthString(edu.startYear)}
                                    onChange={(val) => updateEducation(edu.id, 'startYear', val)}
                                    placeholder="YYYY"
                                    formatDisplay={formatDisplayDate}
                                    type="month"
                                    tag="span"
                                />
                                {' - '}
                                <EditableField
                                    value={toMonthString(edu.endYear)}
                                    onChange={(val) => updateEducation(edu.id, 'endYear', val)}
                                    placeholder="Nay"
                                    formatDisplay={formatDisplayDate}
                                    type="month"
                                    tag="span"
                                />
                            </div>
                            <div className="timeline-right">
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeEducation(edu.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">delete_outline</span>
                                </button>
                                <EditableField
                                    value={edu.degree}
                                    onChange={(val) => updateEducation(edu.id, 'degree', val)}
                                    placeholder="Bằng cấp"
                                    tag="h3"
                                    className="timeline-title"
                                />
                                <EditableField
                                    value={edu.institution}
                                    onChange={(val) => updateEducation(edu.id, 'institution', val)}
                                    placeholder="Trường/Tổ chức"
                                    tag="p"
                                    className="timeline-subtitle"
                                />
                                <div className="timeline-desc">
                                    Chuyên ngành: {' '}
                                    <EditableField
                                        value={edu.fieldOfStudy}
                                        onChange={(val) => updateEducation(edu.id, 'fieldOfStudy', val)}
                                        placeholder="Chuyên ngành"
                                        tag="span"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Custom Sections */}
                {cvData.customSections?.map((section) => (
                    <section key={section.id}>
                        <h2 className="section-title-lg">
                            <EditableField
                                value={section.title}
                                onChange={(val) => updateCustomSectionTitle(section.id, val)}
                                placeholder="Tên mục (ví dụ: Chứng chỉ, Dự án)"
                                tag="span"
                            />
                            <div className="flex gap-2 inline-block ml-2">
                                <button className="add-btn-inline" onClick={() => addCustomSectionItem(section.id)} title="Thêm mục con">
                                    <span className="material-icons">add</span>
                                </button>
                                <button className="remove-btn-inline" onClick={() => removeCustomSection(section.id)} title="Xóa toàn bộ mục này" style={{ position: 'static' }}>
                                    <span className="material-icons">delete_outline</span>
                                </button>
                            </div>
                        </h2>
                        {section.items.map((item) => (
                            <div key={item.id} className="timeline-item">
                                <div className="timeline-left">
                                    <EditableField
                                        value={toMonthString(item.startDate)}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'startDate', val)}
                                        placeholder="MM/YYYY"
                                        formatDisplay={formatDisplayDate}
                                        type="month"
                                        tag="span"
                                    />
                                    {(item.startDate || item.endDate) && ' - '}
                                    <EditableField
                                        value={toMonthString(item.endDate)}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'endDate', val)}
                                        placeholder="Hiện tại"
                                        formatDisplay={formatDisplayDate}
                                        type="month"
                                        tag="span"
                                    />
                                </div>
                                <div className="timeline-right">
                                    <button
                                        className="remove-btn-inline"
                                        onClick={() => removeCustomSectionItem(section.id, item.id)}
                                        title="Xóa"
                                    >
                                        <span className="material-icons">delete_outline</span>
                                    </button>
                                    <EditableField
                                        value={item.title}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'title', val)}
                                        placeholder="Tiêu đề (ví dụ: Tên chứng chỉ)"
                                        tag="h3"
                                        className="timeline-title"
                                    />
                                    <EditableField
                                        value={item.subtitle}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'subtitle', val)}
                                        placeholder="Phụ đề (ví dụ: Tổ chức cấp)"
                                        tag="p"
                                        className="timeline-subtitle"
                                    />
                                    <EditableField
                                        value={item.description}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'description', val)}
                                        placeholder="Mô tả chi tiết..."
                                        tag="div"
                                        className="timeline-desc"
                                        multiline
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
                ))}

                {/* Add Section Button Area */}
                <div className="add-section-area" style={{
                    marginTop: '1.5rem',
                    borderTop: '2px dashed #e5e7eb',
                    paddingTop: '1rem',
                    textAlign: 'center',
                    gridColumn: '1 / -1'
                }}>
                    <button
                        className="add-section-btn-large"
                        onClick={onAddSection}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#f3f4f6',
                            border: '1px dashed #9ca3af',
                            borderRadius: '0.5rem',
                            color: '#4b5563',
                            fontWeight: '500',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                            e.currentTarget.style.borderColor = '#6b7280';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.style.borderColor = '#9ca3af';
                        }}
                    >
                        <span className="material-icons">post_add</span>
                        Thêm mục mới (Custom Section)
                    </button>
                </div>
            </div>

            {/* Styles for new buttons */}
            <style jsx>{`
                .flex { display: inline-flex; }
                .gap-2 { gap: 0.5rem; }
                .ml-2 { margin-left: 0.5rem; }
            `}</style>
        </div >
    );
}

export default ProfessionalTemplate;
