import React, { useState, useEffect } from 'react';
import { getCVHistory, deleteCV } from '@/api/cvApi';
import './HistorySidebar.css';

const HistorySidebar = ({ onSelectCV, currentCvId, isOpen, onClose, onDeleteSuccess }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        }
    }, [isOpen, currentCvId]); // Refetch when opened or when current CV changes (saved)

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await getCVHistory();
            // Ensure we have an array
            const data = Array.isArray(response) ? response : (response.data || []);

            // Sort by updated date desc (handle both camelCase and PascalCase)
            const sortedData = data.sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.UpdatedAt);
                const dateB = new Date(b.updatedAt || b.UpdatedAt);
                return dateB - dateA;
            });
            setHistory(sortedData);
        } catch (error) {
            console.error('Error fetching history:', error);
            setHistory([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Bạn có chắc chắn muốn xóa CV này?')) {
            try {
                await deleteCV(id);
                fetchHistory(); // Refresh list
                if (onDeleteSuccess) {
                    onDeleteSuccess(id);
                }
            } catch (error) {
                console.error('Error deleting CV:', error);
                alert('Không thể xóa CV. Vui lòng thử lại.');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`history-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h3>Lịch sử CV</h3>
                <button className="btn-close-sidebar" onClick={onClose}>
                    <span className="material-icons">close</span>
                </button>
            </div>

            <div className="sidebar-content">
                {isLoading ? (
                    <div className="sidebar-loading">
                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                        <span>Đang tải...</span>
                    </div>
                ) : history.length === 0 ? (
                    <div className="sidebar-empty">
                        <p>Chưa có CV nào được lưu.</p>
                    </div>
                ) : (
                    <ul className="history-list">
                        {history.map((cv) => {
                            // Handle both camelCase and PascalCase
                            const id = cv.id || cv.Id;
                            const title = cv.title || cv.Title;
                            const updatedAt = cv.updatedAt || cv.UpdatedAt;
                            const templateType = cv.templateType || cv.TemplateType;

                            return (
                                <li
                                    key={id}
                                    className={`history-item ${currentCvId === id ? 'active' : ''}`}
                                    onClick={() => onSelectCV(id)}
                                >
                                    <div className="history-item-content">
                                        <h4 className="history-title">{title}</h4>
                                        <span className="history-date">{formatDate(updatedAt)}</span>
                                        <span className="history-template-badge">{templateType}</span>
                                    </div>
                                    <button
                                        className="btn-delete-history"
                                        onClick={(e) => handleDelete(e, id)}
                                        title="Xóa CV"
                                    >
                                        <span className="material-icons">delete</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistorySidebar;
