import api from './axiosConfig';

// Lấy danh sách mẫu CV
export const getTemplates = async () => {
  try {
    const response = await api.get('/Template');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách mẫu CV:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    // Trả về danh sách mẫu mặc định nếu API gặp lỗi
    return [
      { id: 1, key: 'professional', name: 'Mẫu Chuyên Nghiệp', description: 'Thiết kế chuyên nghiệp với tông màu đỏ', thumbnail: '/templates/professional.jpg' },
      { id: 2, key: 'modern', name: 'Mẫu Hiện Đại', description: 'Thiết kế hiện đại với tông màu tím', thumbnail: '/templates/modern.jpg' },
      { id: 3, key: 'formal', name: 'Mẫu Truyền Thống', description: 'Thiết kế truyền thống, trang trọng', thumbnail: '/templates/formal.jpg' }
    ];
  }
};

// Xem trước CV
export const previewCv = async (cvData) => {
  try {
    console.log('Gọi API preview');
    const response = await api.post('/Template/preview', cvData, {
      responseType: 'text'
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API preview:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Xuất PDF
export const exportCvPdf = async (cvData) => {
  try {
    const response = await api.post('/Template/export/pdf', cvData, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API export PDF:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};