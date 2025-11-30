import { useState } from 'react';
import EditableField from '../EditableField';
import './ProfessionalTemplate.css';

function ProfessionalTemplate({ cvData, onUpdate }) {
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
        <div className="professional-cv-container">
            <div className="professional-sidebar">
                {/* Avatar */}
                {cvData.personalInfo?.avatarBase64 && (
                    <div className="avatar-container">
                        <img
                            src={`data:image/png;base64,${cvData.personalInfo.avatarBase64}`}
                            alt="Avatar"
                            className="avatar"
                        />
                    </div>
                )}

                {/* Contact */}
                <div className="section">
                    <h2 className="section-title-sm">Thông tin liên hệ</h2>
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
                    </ul>
                </div>

                {/* Skills */}
                <div className="section" style={{ marginTop: '30px' }}>
                    <h2 className="section-title-sm">
                        Kỹ năng
                        <button className="add-btn-inline" onClick={addSkill} title="Thêm kỹ năng">
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
                                    {skill.level && (
                                        <EditableField
                                            value={skill.level}
                                            onChange={(val) => updateSkill(skill.id, 'level', val)}
                                            placeholder="Mức độ"
                                            tag="span"
                                            className="skill-level"
                                        />
                                    )}
                                </div>
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeSkill(skill.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </li>
                        ))}
                    </ul>
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
                {cvData.personalInfo?.summary && (
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
                )}

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
                                    value={exp.startDate}
                                    onChange={(val) => updateExperience(exp.id, 'startDate', val)}
                                    placeholder="MM/YYYY"
                                    tag="span"
                                />
                                {' - '}
                                <EditableField
                                    value={exp.endDate || 'Hiện tại'}
                                    onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                                    placeholder="MM/YYYY"
                                    tag="span"
                                />
                            </div>
                            <div className="timeline-right">
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeExperience(exp.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
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
                                {exp.description && (
                                    <EditableField
                                        value={exp.description}
                                        onChange={(val) => updateExperience(exp.id, 'description', val)}
                                        placeholder="Mô tả công việc..."
                                        tag="div"
                                        className="timeline-desc"
                                        multiline
                                    />
                                )}
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
                                    value={edu.startYear}
                                    onChange={(val) => updateEducation(edu.id, 'startYear', val)}
                                    placeholder="YYYY"
                                    tag="span"
                                />
                                {' - '}
                                <EditableField
                                    value={edu.endYear || 'Nay'}
                                    onChange={(val) => updateEducation(edu.id, 'endYear', val)}
                                    placeholder="YYYY"
                                    tag="span"
                                />
                            </div>
                            <div className="timeline-right">
                                <button
                                    className="remove-btn-inline"
                                    onClick={() => removeEducation(edu.id)}
                                    title="Xóa"
                                >
                                    <span className="material-icons">close</span>
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
            </div>
        </div>
    );
}

export default ProfessionalTemplate;
