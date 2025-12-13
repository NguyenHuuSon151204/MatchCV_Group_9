import EditableField from '../EditableField';
import './ModernTemplate.css';

function ModernTemplate({ cvData, onUpdate, onImageClick, onAddSection, onConfirm }) {
    // Helper to format date for month picker (YYYY-MM) and display
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
        if (!dateString) return '';
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

    return (
        <div className="modern-cv-container">
            {/* Header */}
            <header className="modern-header">
                {cvData.personalInfo?.avatarBase64 && (
                    <img
                        src={cvData.personalInfo.avatarBase64.startsWith('data:')
                            ? cvData.personalInfo.avatarBase64
                            : `data:image/png;base64,${cvData.personalInfo.avatarBase64}`}
                        alt="Profile"
                        className="profile-img"
                        onClick={onImageClick}
                        style={{ cursor: 'pointer' }}
                        title="Click để thay đổi ảnh"
                    />
                )}
                <EditableField
                    value={cvData.personalInfo?.fullName}
                    onChange={(val) => updatePersonalInfo('fullName', val)}
                    placeholder="Họ và Tên"
                    tag="h1"
                />
                <EditableField
                    value={cvData.personalInfo?.position || cvData.experiences?.[0]?.position}
                    onChange={(val) => updatePersonalInfo('position', val)}
                    placeholder="Vị trí ứng tuyển"
                    tag="h2"
                />

                {/* Contact Info */}
                <div className="contact-info">
                    <div className="contact-item">
                        <span className="material-icons">email</span>
                        <EditableField
                            value={cvData.personalInfo?.email}
                            onChange={(val) => updatePersonalInfo('email', val)}
                            placeholder="email@example.com"
                            tag="span"
                        />
                    </div>
                    <div className="contact-item">
                        <span className="material-icons">phone</span>
                        <EditableField
                            value={cvData.personalInfo?.phone}
                            onChange={(val) => updatePersonalInfo('phone', val)}
                            placeholder="0123 456 789"
                            tag="span"
                        />
                    </div>
                    <div className="contact-item">
                        <span className="material-icons">home</span>
                        <EditableField
                            value={cvData.personalInfo?.address}
                            onChange={(val) => updatePersonalInfo('address', val)}
                            placeholder="Địa chỉ"
                            tag="span"
                        />
                    </div>
                </div>
            </header>

            <main className="modern-main">
                {/* Summary */}
                {cvData.personalInfo?.summary && (
                    <section>
                        <h3 className="section-title">Tóm tắt chuyên môn</h3>
                        <EditableField
                            value={cvData.personalInfo?.summary}
                            onChange={(val) => updatePersonalInfo('summary', val)}
                            placeholder="Mô tả ngắn gọn về bản thân..."
                            tag="p"
                            multiline
                        />
                    </section>
                )}

                {/* Grid Layout */}
                <div className="grid-layout">
                    {/* Experience */}
                    <section>
                        <h3 className="section-title">
                            <span className="section-label">Kinh nghiệm làm việc</span>
                            <button className="add-btn-inline" onClick={addExperience} title="Thêm kinh nghiệm">
                                <span className="material-icons">add</span>
                            </button>
                        </h3>
                        {cvData.experiences?.map((exp) => (
                            <div key={exp.id} className="timeline-item">
                                <div className="timeline-header">
                                    <EditableField
                                        value={exp.position}
                                        onChange={(val) => updateExperience(exp.id, 'position', val)}
                                        placeholder="Vị trí"
                                        tag="h4"
                                        className="timeline-title"
                                    />
                                    <span className="timeline-date">
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
                                            value={exp.endDate ? toMonthString(exp.endDate) : 'Hiện tại'}
                                            onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                                            placeholder="MM/YYYY"
                                            formatDisplay={formatDisplayDate}
                                            type="month"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <EditableField
                                    value={exp.company}
                                    onChange={(val) => updateExperience(exp.id, 'company', val)}
                                    placeholder="Tên công ty"
                                    tag="p"
                                    className="timeline-subtitle"
                                />
                                <div className="job-description-text">
                                    <EditableField
                                        value={exp.description}
                                        onChange={(val) => updateExperience(exp.id, 'description', val)}
                                        placeholder="Mô tả công việc (VD: Quản lý đội ngũ...)"
                                        tag="p"
                                        multiline
                                    />
                                </div>
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeExperience(exp.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className="section-title">
                            <span className="section-label">Học vấn</span>
                            <button className="add-btn-inline" onClick={addEducation} title="Thêm học vấn">
                                <span className="material-icons">add</span>
                            </button>
                        </h3>
                        {cvData.educations?.map((edu) => (
                            <div key={edu.id} className="timeline-item">
                                <div className="timeline-header">
                                    <EditableField
                                        value={edu.degree}
                                        onChange={(val) => updateEducation(edu.id, 'degree', val)}
                                        placeholder="Bằng cấp"
                                        tag="h4"
                                        className="timeline-title"
                                    />
                                    <span className="timeline-date">
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
                                            value={edu.endYear ? toMonthString(edu.endYear) : 'Nay'}
                                            onChange={(val) => updateEducation(edu.id, 'endYear', val)}
                                            placeholder="YYYY"
                                            formatDisplay={formatDisplayDate}
                                            type="month"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <EditableField
                                    value={edu.institution}
                                    onChange={(val) => updateEducation(edu.id, 'institution', val)}
                                    placeholder="Trường/Tổ chức"
                                    tag="p"
                                    className="timeline-subtitle"
                                />
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeEducation(edu.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </div>
                        ))}
                    </section>

                    {/* Custom Sections */}
                    {cvData.customSections?.map((section) => (
                        <section key={section.id}>
                            <h3 className="section-title">
                                <EditableField
                                    value={section.title}
                                    onChange={(val) => updateCustomSectionTitle(section.id, val)}
                                    placeholder="Tên mục (ví dụ: Chứng chỉ, Dự án)"
                                    tag="span"
                                    className="section-label"
                                />
                                <div className="flex gap-2 inline-block ml-2" style={{ float: 'right' }}>
                                    <button className="add-btn-inline" onClick={() => addCustomSectionItem(section.id)} title="Thêm mục con">
                                        <span className="material-icons">add</span>
                                    </button>
                                    <button className="remove-btn-inline" onClick={() => removeCustomSection(section.id)} title="Xóa toàn bộ mục này">
                                        <span className="material-icons">close</span>
                                    </button>
                                </div>
                            </h3>
                            {section.items.map((item) => (
                                <div key={item.id} className="timeline-item">
                                    <div className="timeline-header">
                                        <EditableField
                                            value={item.title}
                                            onChange={(val) => updateCustomSectionItem(section.id, item.id, 'title', val)}
                                            placeholder="Tiêu đề (ví dụ: Tên chứng chỉ)"
                                            tag="h4"
                                            className="timeline-title"
                                        />
                                        <span className="timeline-date">
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
                                        </span>
                                    </div>
                                    <EditableField
                                        value={item.subtitle}
                                        onChange={(val) => updateCustomSectionItem(section.id, item.id, 'subtitle', val)}
                                        placeholder="Phụ đề (ví dụ: Tổ chức cấp)"
                                        tag="p"
                                        className="timeline-subtitle"
                                    />
                                    {item.description !== undefined && (
                                        <div className="job-description-text">
                                            <EditableField
                                                value={item.description}
                                                onChange={(val) => updateCustomSectionItem(section.id, item.id, 'description', val)}
                                                placeholder="Mô tả chi tiết..."
                                                tag="p"
                                                multiline
                                            />
                                        </div>
                                    )}
                                    <button
                                        className="remove-btn-inline"
                                        onClick={() => removeCustomSectionItem(section.id, item.id)}
                                        title="Xóa"
                                    >
                                        <span className="material-icons">close</span>
                                    </button>
                                </div>
                            ))}
                        </section>
                    ))}
                </div>

                {/* Skills */}
                <section style={{ marginTop: '40px' }}>
                    <h3 className="section-title">
                        <span className="section-label">Kỹ năng</span>
                        <button className="add-btn-inline" onClick={addSkill} title="Thêm kỹ năng">
                            <span className="material-icons">add</span>
                        </button>
                    </h3>
                    <div className="skills-container">
                        {cvData.skills?.map((skill, index) => (
                            <span key={skill.id} className={`skill-tag ${index < 5 ? 'skill-primary' : 'skill-secondary'}`}>
                                <EditableField
                                    value={skill.name}
                                    onChange={(val) => updateSkill(skill.id, 'name', val)}
                                    placeholder="Tên kỹ năng"
                                    tag="span"
                                />
                                <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>
                                <EditableField
                                    value={skill.level}
                                    onChange={(val) => updateSkill(skill.id, 'level', val)}
                                    placeholder="Mức độ"
                                    tag="span"
                                />
                                <button
                                    className="remove-skill-btn"
                                    onClick={() => removeSkill(skill.id)}
                                    title="Xóa"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </section>

                {/* Add Section Button Area */}
                <div className="add-section-area" style={{
                    marginTop: '2rem',
                    borderTop: '2px dashed #e2e8f0',
                    paddingTop: '1.5rem',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <button
                        onClick={onAddSection}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'white',
                            border: '1px dashed #64748b',
                            borderRadius: '0.5rem',
                            color: '#64748b',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.borderColor = '#334155';
                            e.currentTarget.style.color = '#334155';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = '#64748b';
                            e.currentTarget.style.color = '#64748b';
                        }}
                    >
                        <span className="material-icons">post_add</span>
                        Thêm mục mới
                    </button>
                </div>
            </main>
        </div >
    );
}

export default ModernTemplate;
