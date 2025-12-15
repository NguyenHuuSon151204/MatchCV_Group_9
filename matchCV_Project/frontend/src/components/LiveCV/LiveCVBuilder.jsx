import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useToastContext } from '@/contexts/toast-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exportCvPdf, getTemplates } from '@/api/templateApi';
import { saveCV, getCVById } from '@/api/cvApi';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import FormalTemplate from './templates/FormalTemplate';
import HistorySidebar from './HistorySidebar';
import './LiveCVBuilder.css';

const DEFAULT_AVATAR_BASE64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJyBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI0UwRTdGRiIvPgogIDxwYXRoIGQ9Ik01MCAyNUM0MC4zMzUgMjUgMzIuNSAzMi44MzUgMzIuNSA0Mi41QzMyLjUgNTIuMTY1IDQwLjMzNSA2MCA1MCA2MEM1OS42NjUgNjAgNjcuNSA1Mi4xNjUgNjcuNSA0Mi41QzY3LjUgMzIuODM1IDU5LjY2NSAyNSA1MCAyNVoiIGZpbGw9IiM0RjQ2RTUiLz4KICA8cGF0aCBkPSJNNTAgNjVDMzEuNSA2NSAxNy41IDc1IDE3LjUgODcuNVYxMDBIODIuNVY4Ny41QzgyLjUgNzUgNjguNSA2NSA1MCA2NVoiIGZpbGw9IiM0RjQ2RTUiLz4KPC9zdmc+";

function LiveCVBuilder() {
    const [templates, setTemplates] = useState([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [showTemplateSelection, setShowTemplateSelection] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showConfirmNewCV, setShowConfirmNewCV] = useState(false); // New state for confirm dialog
    const [isExitAfterSave, setIsExitAfterSave] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });
    const [cvTitle, setCvTitle] = useState('');
    const [currentCvId, setCurrentCvId] = useState(0);
    const fileInputRef = useRef(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToastContext();

    const initialCvData = {
        templateType: 'professional',
        personalInfo: {
            fullName: 'Nguyễn Quỳnh Như',
            position: 'Quản lý nhà hàng',
            email: 'nhu.nguyen@example.com',
            phone: '0987 654 321',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            summary: 'Tôi là một quản lý nhà hàng có kinh nghiệm với hơn 5 năm làm việc trong ngành F&B. Tôi có khả năng quản lý đội ngũ nhân viên, kiểm soát chi phí và nâng cao trải nghiệm khách hàng.',
            avatarBase64: DEFAULT_AVATAR_BASE64,
            website: ''
        },
        experiences: [
            {
                id: 1,
                company: 'Nhà hàng ABC',
                position: 'Quản lý',
                startDate: '01/2020',
                endDate: '12/2023',
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
            { id: 1, name: 'Quản lý nhân sự', level: 'Thành thạo' },
            { id: 2, name: 'Dịch vụ khách hàng', level: 'Chuyên gia' },
            { id: 3, name: 'Quản lý chi phí', level: 'Thành thạo' }
        ],
        customSections: [],
        sectionOrder: ['summary', 'experiences', 'educations', 'skills']
    };

    const [cvData, setCvData] = useState(initialCvData);

    // Load templates and check for ID in URL
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates();
                setTemplates(data);

                // Check for ID in URL
                const cvId = searchParams.get('id');
                if (cvId) {
                    await loadCVFromHistory(cvId);
                } else if (location.state?.initialData) {
                    const { initialData } = location.state;
                    setCvTitle(initialData.title || '');
                    setCvData(prev => ({
                        ...prev,
                        personalInfo: {
                            ...prev.personalInfo,
                            ...(initialData.personalInfo || {})
                        }
                    }));
                } else if (typeof window !== 'undefined') {
                    const savedCvData = localStorage.getItem('liveCvData');
                    if (savedCvData) {
                        const parsedData = JSON.parse(savedCvData);
                        setCvData(parsedData);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi tải mẫu CV:', error);
            } finally {
                setIsLoadingTemplates(false);
            }
        };

        fetchTemplates();
    }, [searchParams, location.state]);

    const loadCVFromHistory = async (id) => {
        try {
            const savedCV = await getCVById(id);
            if (savedCV) {
                // Handle both camelCase and PascalCase for cvData
                const loadedCvData = savedCV.cvData || savedCV.CvData;

                if (loadedCvData) {
                    // Ensure loaded data is merged with initial structure to prevent missing fields
                    setCvData(prev => ({
                        ...initialCvData,
                        ...loadedCvData,
                        personalInfo: { ...initialCvData.personalInfo, ...(loadedCvData.personalInfo || {}) },
                        experiences: loadedCvData.experiences || [],
                        educations: loadedCvData.educations || [],
                        skills: loadedCvData.skills || [],
                        customSections: loadedCvData.customSections || [],
                        sectionOrder: loadedCvData.sectionOrder || ['summary', 'experiences', 'educations', 'skills']
                    }));
                }

                setCvTitle(savedCV.title || savedCV.Title || '');
                setCurrentCvId(savedCV.id || savedCV.Id);
            }
        } catch (error) {
            console.error('Error loading CV:', error);
            if (error.response && error.response.status === 404) {
                toast.error('CV không tồn tại hoặc đã bị xóa.');
                // Reset to new CV state and clear URL
                setCvData(initialCvData);
                setCvTitle('');
                setCurrentCvId(0);
                navigate('/app/cv-builder', { replace: true });
            } else {
                toast.error('Không thể tải CV từ lịch sử.');
            }
        }
    };

    // Auto-save to local storage
    useEffect(() => {
        if (typeof window !== 'undefined' && currentCvId === 0) {
            localStorage.setItem('liveCvData', JSON.stringify(cvData));
        }
    }, [cvData, currentCvId]);

    const handleUpdate = (newCvData) => {
        setCvData(newCvData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 2MB');
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

    const saveCvToBackend = async (titleToUse) => {
        // Helper to parse MM/YYYY to ISO Date
        const parseDate = (dateStr) => {
            if (!dateStr) return new Date().toISOString();
            if (dateStr.includes('/')) {
                const [month, year] = dateStr.split('/');
                return new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
            }
            // If it's already an ISO string or other format, try to parse it
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
        };

        // Prepare data for backend - Keep IDs for consistency
        const formattedCvData = {
            ...cvData,
            experiences: cvData.experiences.map((exp) => ({
                ...exp,
                startDate: parseDate(exp.startDate),
                endDate: (exp.endDate && exp.endDate.toLowerCase() !== 'hiện tại') ? parseDate(exp.endDate) : null
            })),
            educations: cvData.educations.map((edu) => ({
                ...edu,
                startYear: parseInt(edu.startYear) || new Date().getFullYear(),
                endYear: (edu.endYear && !isNaN(parseInt(edu.endYear))) ? parseInt(edu.endYear) : null
            })),
            skills: cvData.skills.map((skill) => ({
                ...skill
            })),
            customSections: cvData.customSections || [],
            sectionOrder: cvData.sectionOrder || ['summary', 'experiences', 'educations', 'skills']
        };

        console.log('Saving CV Data:', formattedCvData);

        return await saveCV({
            id: parseInt(currentCvId) || 0,
            title: titleToUse,
            templateType: cvData.templateType,
            cvData: formattedCvData
        });
    };

    const handleSaveCV = async (forceExit = false) => {
        // If called from event handler, forceExit will be the event object, so check type
        const shouldExit = (typeof forceExit === 'boolean' && forceExit) || isExitAfterSave;

        if (!cvTitle.trim()) {
            toast.warning('Vui lòng nhập tên cho CV của bạn');
            return;
        }

        try {
            const result = await saveCvToBackend(cvTitle);
            console.log('Save result:', result);

            // Handle both camelCase (id) and PascalCase (Id)
            const savedId = result ? (result.id || result.Id) : null;

            if (savedId) {
                setCurrentCvId(savedId);
                toast.success('CV đã được lưu thành công!');
                setShowSaveDialog(false);

                if (shouldExit) {
                    navigate('/app/my-cvs');
                } else {
                    // Update URL without reloading if the ID changed or if it was new
                    if (currentCvId !== savedId) {
                        navigate(`/app/cv-builder?id=${savedId}`, { replace: true });
                    }
                }
            } else {
                console.error('Saved CV but no ID returned:', result);
                toast.error('Lưu CV thành công nhưng không nhận được ID.');
            }
        } catch (error) {
            console.error('Error saving CV:', error);
            if (error.response) {
                console.error('Server Error Details:', error.response.data);
                toast.error(`Lỗi lưu CV: ${error.response.data.message || 'Dữ liệu không hợp lệ'}`);
            } else {
                toast.error('Không thể lưu CV. Vui lòng thử lại.');
            }
        }
    };

    const handleExportPdf = async () => {
        try {
            setIsExporting(true);

            if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
                toast.warning('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên và Email)');
                return;
            }

            // Auto-save before export
            try {
                const titleToSave = cvTitle || `CV ${cvData.personalInfo.fullName}`;
                const result = await saveCvToBackend(titleToSave);

                // Update state regardless of whether it was new or existing, to ensure sync
                if (result) {
                    const savedId = result.id || result.Id;
                    if (savedId) {
                        const prevId = currentCvId;
                        setCurrentCvId(savedId);

                        // If it was a new CV (ID 0) or ID changed, update URL
                        if (prevId === 0 || prevId !== savedId) {
                            setCvTitle(titleToSave);
                            navigate(`/app/cv-builder?id=${savedId}`, { replace: true });
                        }
                    }
                }
            } catch (saveError) {
                console.error('Auto-save failed:', saveError);
                // Continue with export even if save fails
            }

            const parseDate = (dateStr) => {
                if (!dateStr) return null;
                if (dateStr.includes('/')) {
                    const [month, year] = dateStr.split('/');
                    return new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
                }
                return new Date(dateStr).toISOString();
            };

            const exportData = {
                templateType: cvData.templateType,
                personalInfo: {
                    fullName: cvData.personalInfo.fullName,
                    email: cvData.personalInfo.email,
                    phone: cvData.personalInfo.phone,
                    address: cvData.personalInfo.address,
                    summary: cvData.personalInfo.summary,
                    avatarBase64: cvData.personalInfo.avatarBase64 || '',
                    position: cvData.personalInfo.position,
                    website: cvData.personalInfo.website,
                    customContacts: (cvData.personalInfo.customContacts || []).map(c => ({
                        id: c.id,
                        value: c.value
                    }))
                },
                experiences: cvData.experiences.map(exp => ({
                    company: exp.company,
                    position: exp.position,
                    startDate: parseDate(exp.startDate),
                    endDate: exp.endDate ? parseDate(exp.endDate) : null,
                    description: exp.description
                })),
                educations: cvData.educations.map(edu => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    fieldOfStudy: edu.fieldOfStudy,
                    startYear: parseInt(edu.startYear) || null,
                    endYear: parseInt(edu.endYear) || null
                })),
                skills: cvData.skills.map(skill => ({
                    name: skill.name,
                    level: skill.level
                })),
                customSections: cvData.customSections?.map(sec => ({
                    title: sec.title,
                    items: sec.items.map(item => ({
                        title: item.title,
                        subtitle: item.subtitle,
                        startDate: parseDate(item.startDate),
                        endDate: item.endDate ? parseDate(item.endDate) : null,
                        description: item.description
                    }))
                })) || [],
                sidebarSections: cvData.sidebarSections?.map(sec => ({
                    title: sec.title,
                    items: sec.items?.map(item => ({
                        title: item.title,
                        subtitle: item.subtitle
                    })) || []
                })) || []
            };

            const response = await exportCvPdf(exportData);

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.error('Lỗi khi xuất PDF:', error);
            toast.error('Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleSelectTemplate = (templateKey) => {
        setCvData(prev => ({
            ...prev,
            templateType: templateKey
        }));
        setShowTemplateSelection(false);
    };

    const handleBackToTemplates = () => {
        setShowTemplateSelection(true);
    };

    const addCustomSection = () => {
        const newId = `custom-${Date.now()}`;
        setCvData(prev => ({
            ...prev,
            customSections: [
                ...(prev.customSections || []),
                {
                    id: newId,
                    title: 'Tiêu đề mục mới',
                    items: [{ id: Date.now(), title: '', subtitle: '', startDate: '', endDate: '', description: '' }]
                }
            ],
            // Append to order if not exists
            sectionOrder: prev.sectionOrder ? [...prev.sectionOrder, newId] : ['summary', 'experiences', 'educations', 'skills', newId]
        }));
        toast.success('Đã thêm mục mới! Cuộn xuống dưới để xem.');
    };

    const handleCreateNewCV = () => {
        setShowConfirmNewCV(true);
    };

    const confirmCreateNewCV = () => {
        setCvData(initialCvData);
        setCvTitle('');
        setCurrentCvId(0);
        navigate('/app/cv-builder'); // Clear ID from URL
        setShowConfirmNewCV(false);
    };

    const handleCvDeleted = (deletedId) => {
        if (deletedId === currentCvId) {
            setCvData(initialCvData);
            setCvTitle('');
            setCurrentCvId(0);
            navigate('/app/cv-builder');
        }
    };

    const triggerConfirm = (message, action) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Xác nhận',
            message: message,
            onConfirm: action
        });
    };

    // Safety check to prevent crash if cvData is somehow undefined
    if (!cvData) {
        return <div className="p-4 text-center">Đang tải dữ liệu...</div>;
    }

    if (showTemplateSelection) {
        return (
            <div className="template-selection-container">
                <h2 className="text-center mb-4">Chọn Mẫu CV</h2>
                {isLoadingTemplates ? (
                    <div className="loading-state">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p>Đang tải danh sách mẫu CV...</p>
                    </div>
                ) : (
                    <div className="template-grid">
                        {templates.map((template) => (
                            <div
                                key={template.id || template.Id}
                                className="template-card"
                                onClick={() => handleSelectTemplate(template.key || template.Key)}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{template.name || template.Name}</h5>
                                    <p className="card-description">{template.description || template.Description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectTemplate(template.key || template.Key);
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

    return (
        <div className="live-cv-builder">
            <HistorySidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onSelectCV={(id) => {
                    loadCVFromHistory(id);
                    setIsSidebarOpen(false);
                }}
                currentCvId={currentCvId}
                onDeleteSuccess={handleCvDeleted}
            />

            <div className="toolbar">
                <div className="toolbar-left">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="btn btn-outline"
                            onClick={() => navigate('/app/my-cvs')}
                            title="Quay về trang chủ"
                        >
                            <span className="material-icons">arrow_back</span>
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setIsSidebarOpen(true)}
                            title="Lịch sử CV"
                        >
                            <span className="material-icons">history</span>
                        </button>
                        <div>
                            <h1 className="toolbar-title">CV Builder</h1>
                            <span className="toolbar-subtitle">Click vào bất kỳ đâu để chỉnh sửa</span>
                        </div>
                    </div>
                </div>
                <div className="toolbar-right">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        className="btn btn-outline"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <span className="material-icons">photo_camera</span>
                        Đổi ảnh
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={handleCreateNewCV}
                        title="Tạo CV mới"
                    >
                        <span className="material-icons">add_circle_outline</span>
                        Tạo mới
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={handleBackToTemplates}
                    >
                        <span className="material-icons">dashboard</span>
                        Đổi mẫu
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setCvTitle(cvTitle || `CV ${cvData.personalInfo.fullName}`);
                            setShowSaveDialog(true);
                        }}
                    >
                        <span className="material-icons">save</span>
                        Lưu CV
                    </button>
                    <button
                        className="btn btn-success"
                        style={{ backgroundColor: '#10b981', color: 'white', borderColor: '#10b981' }}
                        onClick={() => {
                            if (!cvTitle) {
                                setCvTitle(`CV ${cvData.personalInfo.fullName}`);
                            }
                            setShowSaveDialog(true);
                        }}
                        title="Lưu và quay về danh sách"
                    >
                        <span className="material-icons">check_circle</span>
                        Hoàn tất
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleExportPdf}
                        disabled={isExporting}
                    >
                        <span className="material-icons">picture_as_pdf</span>
                        {isExporting ? 'Đang xuất...' : 'Xuất PDF'}
                    </button>
                </div>
            </div>

            <div className="cv-editor">
                <div className="cv-paper">
                    {cvData.templateType === 'professional' && (
                        <ProfessionalTemplate
                            cvData={cvData}
                            onUpdate={handleUpdate}
                            onImageClick={() => fileInputRef.current?.click()}
                            onAddSection={addCustomSection}
                            onConfirm={triggerConfirm}
                        />
                    )}
                    {cvData.templateType === 'modern' && (
                        <ModernTemplate
                            cvData={cvData}
                            onUpdate={handleUpdate}
                            onImageClick={() => fileInputRef.current?.click()}
                            onAddSection={addCustomSection}
                            onConfirm={triggerConfirm}
                        />
                    )}
                    {cvData.templateType === 'formal' && (
                        <FormalTemplate
                            cvData={cvData}
                            onUpdate={handleUpdate}
                            onImageClick={() => fileInputRef.current?.click()}
                            onAddSection={addCustomSection}
                            onConfirm={triggerConfirm}
                        />
                    )}
                </div>
            </div>

            {/* Save Dialog */}
            {showSaveDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => {
                    setShowSaveDialog(false);
                    setIsExitAfterSave(false);
                }}>
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-gray-200" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                            <span className="material-icons text-primary">save</span>
                            <h3>Lưu CV</h3>
                        </div>
                        <div className="mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Tên CV:</label>
                                <Input
                                    type="text"
                                    value={cvTitle}
                                    onChange={(e) => setCvTitle(e.target.value)}
                                    placeholder="Ví dụ: CV Quản lý nhà hàng"
                                    className="w-full"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveCV(true);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => {
                                setShowSaveDialog(false);
                                setIsExitAfterSave(false);
                            }}>
                                Hủy
                            </Button>
                            <Button variant="secondary" onClick={() => handleSaveCV(false)}>
                                Lưu lại
                            </Button>
                            <Button onClick={() => handleSaveCV(true)}>
                                Lưu & Thoát
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Create New CV Dialog */}
            {showConfirmNewCV && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmNewCV(false)}>
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-gray-200" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                            <span className="material-icons text-warning" style={{ color: '#f59e0b' }}>warning</span>
                            <h3>Tạo CV mới</h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Bạn có chắc chắn muốn tạo CV mới? Các thay đổi chưa lưu sẽ bị mất.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowConfirmNewCV(false)}>
                                Hủy
                            </Button>
                            <Button onClick={confirmCreateNewCV} className="bg-red-600 hover:bg-red-700 text-white">
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Generic Confirm Dialog */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}>
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-gray-200" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                            <span className="material-icons text-warning" style={{ color: '#f59e0b' }}>help_outline</span>
                            <h3>{confirmDialog.title}</h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {confirmDialog.message}
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}>
                                Hủy
                            </Button>
                            <Button onClick={() => {
                                if (confirmDialog.onConfirm) confirmDialog.onConfirm();
                                setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                            }} className="bg-red-600 hover:bg-red-700 text-white">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveCVBuilder;