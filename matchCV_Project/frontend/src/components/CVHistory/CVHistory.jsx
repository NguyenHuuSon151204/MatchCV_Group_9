import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCVHistory, deleteCV } from '@/api/cvApi';
import './CVHistory.css';

function CVHistory() {
    const [cvList, setCvList] = useState([]);
    const [filteredCvList, setFilteredCvList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, cvId: null, cvTitle: '' });
    const navigate = useNavigate();

    useEffect(() => {
        loadCVHistory();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = cvList.filter(cv =>
                cv.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCvList(filtered);
        } else {
            setFilteredCvList(cvList);
        }
    }, [searchTerm, cvList]);

    const loadCVHistory = async () => {
        try {
            setLoading(true);
            const data = await getCVHistory();
            setCvList(data);
            setFilteredCvList(data);
        } catch (error) {
            console.error('Error loading CV history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCV = (cvId) => {
        navigate(`/app/cv-builder?id=${cvId}`);
    };

    const handleDeleteClick = (cv) => {
        setDeleteModal({ show: true, cvId: cv.id, cvTitle: cv.title });
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteCV(deleteModal.cvId);
            setDeleteModal({ show: false, cvId: null, cvTitle: '' });
            loadCVHistory(); // Reload list
        } catch (error) {
            console.error('Error deleting CV:', error);
            alert('Không thể xóa CV. Vui lòng thử lại.');
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ show: false, cvId: null, cvTitle: '' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTemplateClass = (templateType) => {
        return `template-${templateType.toLowerCase()}`;
    };

    const getTemplateLabel = (templateType) => {
        const labels = {
            professional: 'Chuyên nghiệp',
            modern: 'Hiện đại',
            formal: 'Trang trọng'
        };
        return labels[templateType.toLowerCase()] || templateType;
    };

    if (loading) {
        return (
            <div className="cv-history-container">
                <div className="loading-state">
                    <span className="material-icons rotating">refresh</span>
                    <p>Đang tải lịch sử CV...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cv-history-container">
            <div className="cv-history-header">
                <h1>Lịch sử CV của tôi</h1>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm CV..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="material-icons search-icon">search</span>
                </div>
            </div>

            {filteredCvList.length === 0 ? (
                <div className="empty-state">
                    <span className="material-icons empty-state-icon">description</span>
                    <h3>Chưa có CV nào được lưu</h3>
                    <p>Hãy tạo CV đầu tiên của bạn!</p>
                </div>
            ) : (
                <div className="cv-grid">
                    {filteredCvList.map((cv) => (
                        <div
                            key={cv.id}
                            className="cv-card"
                            onClick={() => handleEditCV(cv.id)}
                        >
                            <div className="cv-card-header">
                                <div>
                                    <h3 className="cv-card-title">{cv.title}</h3>
                                    <span className={`cv-card-template ${getTemplateClass(cv.templateType)}`}>
                                        {getTemplateLabel(cv.templateType)}
                                    </span>
                                </div>
                                <div className="cv-card-actions" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="action-btn edit"
                                        onClick={() => handleEditCV(cv.id)}
                                        title="Chỉnh sửa"
                                    >
                                        <span className="material-icons">edit</span>
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDeleteClick(cv)}
                                        title="Xóa"
                                    >
                                        <span className="material-icons">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="cv-card-dates">
                                <div>Tạo: {formatDate(cv.createdAt)}</div>
                                <div>Cập nhật: {formatDate(cv.updatedAt)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="modal-overlay" onClick={handleDeleteCancel}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="material-icons">warning</span>
                            <h3>Xác nhận xóa</h3>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa CV "<strong>{deleteModal.cvTitle}</strong>"?
                            <br />
                            Hành động này không thể hoàn tác.
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-cancel" onClick={handleDeleteCancel}>
                                Hủy
                            </button>
                            <button className="btn btn-delete" onClick={handleDeleteConfirm}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CVHistory;
