import EditableField from '../EditableField';
import './FormalTemplate.css';

function FormalTemplate({ cvData, onUpdate, onImageClick }) {
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

    return (
        <div className="formal-cv-container">
            {/* Header */}
            <header className="formal-header">
                <div className="header-content">
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
                </div>
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
            </header>

            {/* Contact Bar */}
            <div className="contact-bar">
                {cvData.personalInfo?.email && (
                    <div className="contact-item">
                        <span className="material-icons">email</span>
                        <EditableField
                            value={cvData.personalInfo?.email}
                            onChange={(val) => updatePersonalInfo('email', val)}
                            placeholder="email@example.com"
                            tag="span"
                        />
                    </div>
                )}
                {cvData.personalInfo?.phone && (
                    <div className="contact-item">
                        <span className="material-icons">phone</span>
                        <EditableField
                            value={cvData.personalInfo?.phone}
                            onChange={(val) => updatePersonalInfo('phone', val)}
                            placeholder="0123 456 789"
                            tag="span"
                        />
                    </div>
                )}
                {cvData.personalInfo?.address && (
                    <div className="contact-item">
                        <span className="material-icons">home</span>
                        <EditableField
                            value={cvData.personalInfo?.address}
                            onChange={(val) => updatePersonalInfo('address', val)}
                            placeholder="Địa chỉ"
                            tag="span"
                        />
                    </div>
                )}
            </div>

            {/* Main Content */}
            <main className="formal-main">
                {/* Summary */}
                {cvData.personalInfo?.summary && (
                    <section>
                        <h3 className="section-title">TÓM TẮT</h3>
                        <EditableField
                            value={cvData.personalInfo?.summary}
                            onChange={(val) => updatePersonalInfo('summary', val)}
                            placeholder="Mô tả ngắn gọn về bản thân..."
                            tag="p"
                            multiline
                        />
                    </section>
                )}

                {/* Experience */}
                <section>
                    <h3 className="section-title">
                        KINH NGHIỆM LÀM VIỆC
                        <button className="add-btn-inline" onClick={addExperience} title="Thêm kinh nghiệm">
                            <span className="material-icons">add</span>
                        </button>
                    </h3>
                    {cvData.experiences?.map((exp, index) => (
                        <div key={exp.id || index} className="formal-item">
                            <div className="item-header">
                                <div>
                                    <EditableField
                                        value={exp.position}
                                        onChange={(val) => updateExperience(exp.id, 'position', val)}
                                        placeholder="Vị trí"
                                        tag="h4"
                                        className="item-title"
                                    />
                                    <EditableField
                                        value={exp.company}
                                        onChange={(val) => updateExperience(exp.id, 'company', val)}
                                        placeholder="Tên công ty"
                                        tag="p"
                                        className="item-subtitle"
                                    />
                                </div>
                                <div className="item-date">
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
                                </div>
                            </div>
                            {exp.description && (
                                <EditableField
                                    value={exp.description}
                                    onChange={(val) => updateExperience(exp.id, 'description', val)}
                                    placeholder="Mô tả công việc..."
                                    tag="p"
                                    className="item-description"
                                    multiline
                                />
                            )}
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
                        HỌC VẤN
                        <button className="add-btn-inline" onClick={addEducation} title="Thêm học vấn">
                            <span className="material-icons">add</span>
                        </button>
                    </h3>
                    {cvData.educations?.map((edu, index) => (
                        <div key={edu.id || index} className="formal-item">
                            <div className="item-header">
                                <div>
                                    <EditableField
                                        value={edu.degree}
                                        onChange={(val) => updateEducation(edu.id, 'degree', val)}
                                        placeholder="Bằng cấp"
                                        tag="h4"
                                        className="item-title"
                                    />
                                    <EditableField
                                        value={edu.institution}
                                        onChange={(val) => updateEducation(edu.id, 'institution', val)}
                                        placeholder="Trường/Tổ chức"
                                        tag="p"
                                        className="item-subtitle"
                                    />
                                </div>
                                <div className="item-date">
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
                                </div>
                            </div>
                            {edu.fieldOfStudy && (
                                <p className="item-description">
                                    Chuyên ngành: {' '}
                                    <EditableField
                                        value={edu.fieldOfStudy}
                                        onChange={(val) => updateEducation(edu.id, 'fieldOfStudy', val)}
                                        placeholder="Chuyên ngành"
                                        tag="span"
                                    />
                                </p>
                            )}
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

                {/* Skills */}
                <section>
                    <h3 className="section-title">
                        KỸ NĂNG
                        <button className="add-btn-inline" onClick={addSkill} title="Thêm kỹ năng">
                            <span className="material-icons">add</span>
                        </button>
                    </h3>
                    <ul className="skills-list">
                        {cvData.skills?.map((skill, index) => (
                            <li key={skill.id || index} className="skill-item">
                                <EditableField
                                    value={skill.name}
                                    onChange={(val) => updateSkill(skill.id, 'name', val)}
                                    placeholder="Tên kỹ năng"
                                    tag="span"
                                />
                                {skill.level && (
                                    <span className="skill-level">
                                        {' - '}
                                        <EditableField
                                            value={skill.level}
                                            onChange={(val) => updateSkill(skill.id, 'level', val)}
                                            placeholder="Mức độ"
                                            tag="span"
                                        />
                                    </span>
                                )}
                                <button
                                    className="remove-skill-btn"
                                    onClick={() => removeSkill(skill.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default FormalTemplate;
