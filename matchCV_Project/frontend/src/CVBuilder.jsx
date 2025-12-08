import { useState, useRef, useEffect } from 'react';
import { previewCv, exportCvPdf, getTemplates } from '@/api/templateApi';
import '@/styles/CVBuilder.css';

// KHÔNG CẦN import icon từ @material-ui/icons hoặc @mui/icons-material nữa.
// Thay vào đó, chúng ta dựa vào CSS Font (Material Icons) được nhúng trong CVBuilder.css

function CVBuilder() {
    const [templates, setTemplates] = useState([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [showTemplateSelection, setShowTemplateSelection] = useState(false);
    const [activeTab, setActiveTab] = useState('content');

    const [cvData, setCvData] = useState({
        templateType: 'modern',
        personalInfo: {
            fullName: 'Nguyễn Quỳnh Như',
            position: 'Quản lý nhà hàng',
            email: 'nhu.nguyen@example.com',
            phone: '0987 654 321',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            summary: 'Tôi là một quản lý nhà hàng có kinh nghiệm với hơn 5 năm làm việc trong ngành F&B. Tôi có khả năng quản lý đội ngũ nhân viên, kiểm soát chi phí và nâng cao trải nghiệm khách hàng.',
            avatarBase64: null,
            dateOfBirth: '1995-05-16', 
        },
        experiences: [
            {
                id: 1,
                company: 'Nhà hàng ABC',
                position: 'Quản lý',
                startDate: '2020-01',
                endDate: '2023-12',
                description: 'Quản lý hoạt động hàng ngày của nhà hàng, đào tạo nhân viên mới, kiểm soát chi phí và đảm bảo chất lượng dịch vụ.'
            }
        ],
        educations: [
            {
                id: 1,
                institution: 'Đại học Kinh tế TP.HCM',
                degree: 'Cử nhân',
                fieldOfStudy: 'Quản trị Nhà hàng & Dịch vụ Ăn uống',
                startYear: '2016',
                endYear: '2020'
            }
        ],
        skills: [
            { id: 1, name: 'Quản lý nhân sự', level: '' }, 
            { id: 2, name: 'Dịch vụ khách hàng', level: '' },
            { id: 3, name: 'Quản lý chi phí', level: '' }
        ]
    });

    const [previewHtml, setPreviewHtml] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Xử lý thay đổi dữ liệu chung
    const handleInputChange = (section, field, value) => {
        setCvData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Xử lý ảnh đại diện (Giữ nguyên)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('Kích thước ảnh không được vượt quá 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setCvData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    avatarBase64: base64String
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    // Hàm chung cho thêm/sửa/xóa Experience, Education, Skill (Giữ nguyên)
    const createItemUpdater = (section) => ({
        add: () => {
            const newItem = section === 'experiences' ? { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '' }
                : section === 'educations' ? { id: Date.now(), institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }
                    : { id: Date.now(), name: '', level: 'Trung bình' };
            setCvData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
        },
        update: (id, field, value) => {
            setCvData(prev => ({
                ...prev,
                [section]: prev[section].map(item =>
                    item.id === id ? { ...item, [field]: value } : item
                )
            }));
        },
        remove: (id) => {
            setCvData(prev => ({
                ...prev,
                [section]: prev[section].filter(item => item.id !== id)
            }));
        }
    });

    const experienceActions = createItemUpdater('experiences');
    const educationActions = createItemUpdater('educations');
    const skillActions = createItemUpdater('skills');

    // Xem trước CV (Giữ nguyên logic)
    const handlePreview = async () => {
        try {
            setIsLoading(true);
            if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
                return;
            }

            const data = {
                ...cvData,
                personalInfo: {
                    ...cvData.personalInfo,
                    avatarBase64: cvData.personalInfo.avatarBase64 || ''
                }
            };

            const html = await previewCv(data);
            setPreviewHtml(html);
        } catch (error) {
            console.error('Lỗi khi xem trước:', error);
            alert(error.response?.data?.message || 'Có lỗi xảy ra khi tạo bản xem trước');
        } finally {
            setIsLoading(false);
        }
    };

    // Xuất PDF (Giữ nguyên logic)
    const handleExportPdf = async () => {
        try {
            setIsLoading(true);
            if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
                return;
            }

            const data = {
                ...cvData,
                personalInfo: {
                    ...cvData.personalInfo,
                    avatarBase64: cvData.personalInfo.avatarBase64 || ''
                }
            };

            const pdfBlob = await exportCvPdf(data);
            
            const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CV-${cvData.personalInfo.fullName || 'ung-vien'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Lỗi khi xuất PDF:', error);
            alert(error.response?.data?.message || 'Có lỗi xảy ra khi xuất file PDF');
        } finally {
            setIsLoading(false);
        }
    };

    // Load templates và khôi phục dữ liệu (Giữ nguyên logic)
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates();
                setTemplates(data);
                
                if (typeof window !== 'undefined') {
                    const savedCvData = localStorage.getItem('cvData');
                    if (savedCvData) {
                        const parsedData = JSON.parse(savedCvData);
                        setCvData(parsedData);
                        if (parsedData.templateType) {
                            setShowTemplateSelection(false);
                        }
                    } else {
                        setShowTemplateSelection(true);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi tải mẫu CV:', error);
            } finally {
                setIsLoadingTemplates(false);
            }
        };

        fetchTemplates();
        
        return () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cvData');
            }
        };
    }, []);

    // Tự động cập nhật preview (Giữ nguyên logic)
    useEffect(() => {
        if (!showTemplateSelection) {
            const timeoutId = setTimeout(() => {
                handlePreview();
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cvData', JSON.stringify(cvData));
                }
            }, 1000); // Debounce 1 giây
            return () => clearTimeout(timeoutId);
        }
    }, [cvData, showTemplateSelection]);

    // Xử lý chọn mẫu CV (Giữ nguyên logic)
    const handleSelectTemplate = async (templateId) => {
        const newCvData = {
            ...cvData,
            templateType: templateId
        };
        
        setCvData(newCvData);
        setShowTemplateSelection(false);
        
        try {
            setIsLoading(true);
            const data = {
                ...newCvData,
                personalInfo: {
                    ...newCvData.personalInfo,
                    avatarBase64: newCvData.personalInfo.avatarBase64 || ''
                }
            };
            
            const html = await previewCv(data);
            setPreviewHtml(html);
        } catch (error) {
            console.error('Lỗi khi cập nhật preview:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Quay lại màn hình chọn mẫu (Giữ nguyên logic)
    const handleBackToTemplates = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
        setShowTemplateSelection(true);
    };

    // --- Màn hình chọn mẫu ---
    if (showTemplateSelection) {
        return (
            <div className="template-selection-container">
                <h2 className="text-center mb-4">Chọn Mẫu CV</h2>
                {isLoadingTemplates ? (
                    <div className="loading-state">
                        {/* Placeholder cho spinner */}
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p>Đang tải danh sách mẫu CV...</p>
                    </div>
                ) : (
                    <div className="template-grid">
                        {templates.map((template) => (
                            <div key={template.id} className="template-card" onClick={() => handleSelectTemplate(template.id)}>
                                <img src={template.thumbnail} alt={template.name} className="template-thumbnail" />
                                <div className="card-body">
                                    <h5 className="card-title">{template.name}</h5>
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectTemplate(template.id);
                                        }}
                                    >
                                        Chọn mẫu này
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    // --- Kết thúc Màn hình chọn mẫu ---

    // --- Màn hình Tạo CV (Sử dụng Material Icons qua CSS Font) ---
    return (
        <div className="app-container">
            {/* Sidebar - Thanh bên */}
            <div className="sidebar">
                <div className="logo">CV</div>
                <nav className="nav">
                    <a className={`nav-item ${activeTab === 'content' ? 'active' : ''}`} href="#" title="Nội dung" onClick={() => setActiveTab('content')}>
                        <span className="material-icons">description</span>
                        <span className="nav-label">Nội dung</span>
                    </a>
                    <a className={`nav-item ${activeTab === 'design' ? 'active' : ''}`} href="#" title="Thiết kế & Font" onClick={() => setActiveTab('design')}>
                        <span className="material-icons">palette</span>
                        <span className="nav-label">Thiết kế & Font</span>
                    </a>
                    <a className={`nav-item ${activeTab === 'storage' ? 'active' : ''}`} href="#" title="Lưu trữ" onClick={() => setActiveTab('storage')}>
                        <span className="material-icons">inventory</span>
                        <span className="nav-label">Lưu trữ</span>
                    </a>
                </nav>
                <div className="footer-nav">
                    <a className="nav-item" href="#" title="Cài đặt">
                        <span className="material-icons">settings</span>
                    </a>
                    <img alt="User Avatar" className="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfdakh4CSr_WDDKS9G8BoH6dqSvaqc5pRZ0ESux3vcrgp5jkKv2XKfNf3VQd8YM1LHbCbpXgQf9AlOUbleCd5eaBu5Ht_yjQ1SQrdr8E-D2-6hdEM4fy36CAp2s-826fphFMz1Xrx-rg7dGYFTaTJ2N5xbGASeQTTQwakMLj9ttx6n8iol3qKq6SzKUicFMuLElxG9CPzZOq3fxNVW-XArWyvlPXZBC91yYP2ic3qLo0q6FYYwzfZ8e8ArVhrABoW6XbwrumlJ-Ms" />
                </div>
            </div>

            <div className="main-container">
                {/* Content Panel - Bảng Nội dung */}
                <main className="content-panel">
                    <h1>Nội dung CV</h1>
                    <div className="sections">
                        
                        {/* 1. Thông tin cá nhân */}
                        <div className="section">
                            <h2>Thông tin cá nhân</h2>
                            <div className="form-group">
                                <div className="input-float">
                                    <input className="input" id="fullName" placeholder="Họ và tên" type="text" 
                                           value={cvData.personalInfo.fullName} 
                                           onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                                    <label htmlFor="fullName">Họ và tên</label>
                                </div>
                                <div className="input-float">
                                    <input className="input" id="position" placeholder="Vị trí ứng tuyển" type="text" 
                                           value={cvData.personalInfo.position} 
                                           onChange={(e) => handleInputChange('personalInfo', 'position', e.target.value)} />
                                    <label htmlFor="position">Vị trí ứng tuyển</label>
                                </div>
                                <div className="input-grid">
                                    <div className="input-float">
                                        <input className="input" id="email" placeholder="Email" type="email" 
                                               value={cvData.personalInfo.email} 
                                               onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-float">
                                        <input className="input" id="phone" placeholder="Số điện thoại" type="tel" 
                                               value={cvData.personalInfo.phone} 
                                               onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
                                        <label htmlFor="phone">Số điện thoại</label>
                                    </div>
                                </div>
                                <div className="input-float">
                                    <input className="input" id="address" placeholder="Địa chỉ" type="text" 
                                           value={cvData.personalInfo.address} 
                                           onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)} />
                                    <label htmlFor="address">Địa chỉ</label>
                                </div>
                                <div className="input-float">
                                    <textarea className="input" id="summary" placeholder="Giới thiệu bản thân" rows="3" 
                                              value={cvData.personalInfo.summary} 
                                              onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)} />
                                    <label htmlFor="summary">Giới thiệu bản thân</label>
                                </div>
                                <div className="input-float">
                                    <input className="input" id="dateOfBirth" placeholder="Ngày sinh (YYYY-MM-DD)" type="date" 
                                           value={cvData.personalInfo.dateOfBirth} 
                                           onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)} />
                                    <label htmlFor="dateOfBirth">Ngày sinh</label>
                                </div>
                                <div className="input-float">
                                    <input className="input" id="avatar" type="file" accept="image/*" 
                                           onChange={handleImageChange} ref={fileInputRef} />
                                    <label htmlFor="avatar">Ảnh đại diện</label>
                                </div>
                            </div>
                        </div>

                        {/* 2. Kinh nghiệm làm việc */}
                        <div className="section">
                            <div className="section-header">
                                <h2>Kinh nghiệm làm việc</h2>
                                <button className="add-btn" onClick={experienceActions.add} disabled={isLoading}>
                                    <span className="material-icons">add_circle_outline</span>
                                    <span>Thêm kinh nghiệm</span>
                                </button>
                            </div>
                            <div className="items">
                                {cvData.experiences.map((exp, index) => (
                                    <div key={exp.id} className="item">
                                        <div className="item-close">
                                            <button className="close-btn" onClick={() => experienceActions.remove(exp.id)} disabled={isLoading}>
                                                <span className="material-icons">cancel</span>
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-float">
                                                <input className="input" id={`company${exp.id}`} placeholder="Công ty" type="text" 
                                                       value={exp.company} 
                                                       onChange={(e) => experienceActions.update(exp.id, 'company', e.target.value)} />
                                                <label htmlFor={`company${exp.id}`}>Công ty</label>
                                            </div>
                                            <div className="input-float">
                                                <input className="input" id={`position${exp.id}`} placeholder="Vị trí" type="text" 
                                                       value={exp.position} 
                                                       onChange={(e) => experienceActions.update(exp.id, 'position', e.target.value)} />
                                                <label htmlFor={`position${exp.id}`}>Vị trí</label>
                                            </div>
                                            <div className="input-grid">
                                                <div className="input-float">
                                                    <input className="input" id={`startDate${exp.id}`} placeholder="Ngày bắt đầu" type="date" 
                                                           value={exp.startDate} 
                                                           onChange={(e) => experienceActions.update(exp.id, 'startDate', e.target.value)} />
                                                    <label htmlFor={`startDate${exp.id}`}>Ngày bắt đầu</label>
                                                </div>
                                                <div className="input-float">
                                                    <input className="input" id={`endDate${exp.id}`} placeholder="Ngày kết thúc" type="date" 
                                                           value={exp.endDate} 
                                                           onChange={(e) => experienceActions.update(exp.id, 'endDate', e.target.value)} />
                                                    <label htmlFor={`endDate${exp.id}`}>Ngày kết thúc</label>
                                                </div>
                                            </div>
                                            <div className="input-float">
                                                <textarea className="input" id={`desc${exp.id}`} placeholder="Mô tả" rows="3" 
                                                          value={exp.description} 
                                                          onChange={(e) => experienceActions.update(exp.id, 'description', e.target.value)} />
                                                <label htmlFor={`desc${exp.id}`}>Mô tả</label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Học vấn */}
                        <div className="section">
                            <div className="section-header">
                                <h2>Học vấn</h2>
                                <button className="add-btn" onClick={educationActions.add} disabled={isLoading}>
                                    <span className="material-icons">add_circle_outline</span>
                                    <span>Thêm học vấn</span>
                                </button>
                            </div>
                            <div className="items">
                                {cvData.educations.map((edu, index) => (
                                    <div key={edu.id} className="item">
                                        <div className="item-close">
                                            <button className="close-btn" onClick={() => educationActions.remove(edu.id)} disabled={isLoading}>
                                                <span className="material-icons">cancel</span>
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-float">
                                                <input className="input" id={`institution${edu.id}`} placeholder="Trường / Tổ chức" type="text" 
                                                       value={edu.institution} 
                                                       onChange={(e) => educationActions.update(edu.id, 'institution', e.target.value)} />
                                                <label htmlFor={`institution${edu.id}`}>Trường / Tổ chức</label>
                                            </div>
                                            <div className="input-float">
                                                <input className="input" id={`degree${edu.id}`} placeholder="Bằng cấp" type="text" 
                                                       value={edu.degree} 
                                                       onChange={(e) => educationActions.update(edu.id, 'degree', e.target.value)} />
                                                <label htmlFor={`degree${edu.id}`}>Bằng cấp</label>
                                            </div>
                                            <div className="input-float">
                                                <input className="input" id={`fieldOfStudy${edu.id}`} placeholder="Chuyên ngành" type="text" 
                                                       value={edu.fieldOfStudy} 
                                                       onChange={(e) => educationActions.update(edu.id, 'fieldOfStudy', e.target.value)} />
                                                <label htmlFor={`fieldOfStudy${edu.id}`}>Chuyên ngành</label>
                                            </div>
                                            <div className="input-grid">
                                                <div className="input-float">
                                                    <input className="input" id={`startYear${edu.id}`} placeholder="Năm bắt đầu" type="number" 
                                                           value={edu.startYear} 
                                                           onChange={(e) => educationActions.update(edu.id, 'startYear', e.target.value)} />
                                                    <label htmlFor={`startYear${edu.id}`}>Năm bắt đầu</label>
                                                </div>
                                                <div className="input-float">
                                                    <input className="input" id={`endYear${edu.id}`} placeholder="Năm kết thúc" type="number" 
                                                           value={edu.endYear} 
                                                           onChange={(e) => educationActions.update(edu.id, 'endYear', e.target.value)} />
                                                    <label htmlFor={`endYear${edu.id}`}>Năm kết thúc</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Kỹ năng */}
                        <div className="section">
                            <div className="section-header">
                                <h2>Kỹ năng</h2>
                                <button className="add-btn" onClick={skillActions.add} disabled={isLoading}>
                                    <span className="material-icons">add_circle_outline</span>
                                    <span>Thêm kỹ năng</span>
                                </button>
                            </div>
                            <div className="items">
                                {cvData.skills.map((skill, index) => (
                                    <div key={skill.id} className="item">
                                        <div className="item-row">
                                            <div className="input-grid">
                                                <div className="input-float">
                                                    <input className="input" id={`skillName${skill.id}`} placeholder="Tên kỹ năng" type="text" 
                                                           value={skill.name} 
                                                           onChange={(e) => skillActions.update(skill.id, 'name', e.target.value)} />
                                                    <label htmlFor={`skillName${skill.id}`}>Tên kỹ năng</label>
                                                </div>
                                                <div className="input-float">
                                                    <select className="select" id={`skillLevel${skill.id}`}
                                                            value={skill.level} 
                                                            onChange={(e) => skillActions.update(skill.id, 'level', e.target.value)} >
                                                        <option value="Mới bắt đầu">Mới bắt đầu</option>
                                                        <option value="Trung bình">Trung bình</option>
                                                        <option value="Thành thạo">Thành thạo</option>
                                                        <option value="Chuyên gia">Chuyên gia</option>
                                                    </select>
                                                    <label htmlFor={`skillLevel${skill.id}`}></label>
                                                </div>
                                            </div>
                                            <button className="close-btn" onClick={() => skillActions.remove(skill.id)} disabled={isLoading}>
                                                <span className="material-icons">cancel</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Thêm nút Xem trước/Xuất PDF vào cuối content-panel */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 section" style={{ backgroundColor: 'white' }}>
                        <button 
                            className="btn btn-secondary" 
                            onClick={handlePreview}
                            disabled={isLoading}
                        >
                            <span className="material-icons"></span>
                            {isLoading ? 'Đang tải...' : ''}
                        </button>
                        <button 
                            className="btn btn-success" 
                            onClick={handleExportPdf}
                            disabled={isLoading}
                        >
                             <span className="material-icons"></span>
                            {isLoading ? 'Đang xử lý...' : ' '}
                        </button>
                    </div>
                </main>

                {/* Preview Panel - Bảng Xem trước */}
                <div className="preview-panel">
                    <header className="preview-header">
                        <div className="header-buttons">
                            <button className="btn btn-secondary" onClick={handleExportPdf} disabled={isLoading}>
                                <span className="material-icons">picture_as_pdf</span>
                                <span>Download</span>
                            </button>
                            <button className="btn btn-icon" onClick={() => window.print()} title="In CV">
                                <span className="material-icons">print</span>
                            </button>
                            <button className="btn btn-icon" onClick={handleBackToTemplates} title="Đổi mẫu CV">
                                <span className="material-icons">dashboard</span>
                            </button>
                        </div>
                    </header>
                    <div className="preview-container">
                        {isLoading && previewHtml === '' ? (
                            <div className="loading-overlay">Đang tải bản xem trước...</div>
                        ) : previewHtml ? (
                            <div
                                className="cv-preview"
                                dangerouslySetInnerHTML={{ __html: previewHtml }}
                            />
                        ) : (
                            <div className="alert-info-preview">
                                Nhấn **Xem trước** để xem CV của bạn theo mẫu **{cvData.templateType}**.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVBuilder;