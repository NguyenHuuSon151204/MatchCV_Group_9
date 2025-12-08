import React, { useState, useEffect } from 'react';
import { getCVHistory, deleteCV } from '@/api/cvApi';
import { useToastContext } from '@/contexts/toast-context';
import { Button } from '@/components/ui/button';
import './HistorySidebar.css';

const HistorySidebar = ({ onSelectCV, currentCvId, isOpen, onClose, onDeleteSuccess }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const toast = useToastContext();

    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        }
    }, [isOpen, currentCvId]);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await getCVHistory();
            const data = Array.isArray(response) ? response : (response.data || []);
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

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setDeletingId(id);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;

        try {
            await deleteCV(deletingId);
            toast.success('Đã xóa CV thành công');
            fetchHistory();
            if (onDeleteSuccess) {
                onDeleteSuccess(deletingId);
            }
        } catch (error) {
            console.error('Error deleting CV:', error);
            toast.error('Không thể xóa CV. Vui lòng thử lại.');
        } finally {
            setDeletingId(null);
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
        <>
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
                                            onClick={(e) => handleDeleteClick(e, id)}
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

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeletingId(null)}>
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl ring-1 ring-gray-200" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                            <span className="material-icons text-red-500">delete_forever</span>
                            <h3>Xóa CV</h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Bạn có chắc chắn muốn xóa CV này? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDeletingId(null)}>
                                Hủy
                            </Button>
                            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                Xóa vĩnh viễn
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistorySidebar;
