# 🔧 ĐỀ XUẤT FIXES - MATCHCV SYSTEM

## 🎯 Tổng Quan

File này chứa các fixes cụ thể cho các vấn đề đã phát hiện trong báo cáo đánh giá.

---

## 🔴 CRITICAL FIXES (Phải fix ngay)

### 1. Fix Route Mismatch - Create CV

**File:** `frontend/src/services/api.ts`

**Vấn đề:**
```typescript
// ❌ SAI - Line 68
createCv: async (dto: CreateDocumentDto): Promise<DocumentDto> => {
  const response = await apiClient.post<ApiResponse<DocumentDto>>('/cv', dto)
  return response.data.Data
}
```

**Backend expect:** `POST /api/cv/create?userId=X`

**Fix:**
```typescript
// ✅ ĐÚNG
createCv: async (dto: CreateDocumentDto, userId: number): Promise<DocumentDto> => {
  const response = await apiClient.post<ApiResponse<DocumentDto>>(
    `/cv/create?userId=${userId}`,
    dto
  )
  return response.data?.Data ?? ({} as DocumentDto)
}
```

**Update caller:** `frontend/src/pages/MyCVs.tsx`
```typescript
// Line 127
const newCv = await cvApi.createCv({
  originalName: file.name,
  docType: file.type || 'application/pdf',
}, USER_ID)  // ✅ Thêm userId

// Line 152
const newCv = await cvApi.createCv({
  originalName: 'New CV',
  docType: 'application/pdf',
}, USER_ID)  // ✅ Thêm userId
```

---

### 2. Fix Route Mismatch - Upload CV

**File:** `frontend/src/services/api.ts`

**Vấn đề:**
```typescript
// ❌ SAI - Line 94
uploadCv: async (id: number, file: File): Promise<DocumentDto> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await apiClient.post<ApiResponse<DocumentDto>>(
    `/cv/${id}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data.Data
}
```

**Backend expect:** `POST /api/cv/upload?userId=X&id=Y`

**Fix:**
```typescript
// ✅ ĐÚNG
uploadCv: async (id: number, file: File, userId: number): Promise<DocumentDto> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await apiClient.post<ApiResponse<DocumentDto>>(
    `/cv/upload?userId=${userId}&id=${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data?.Data ?? ({} as DocumentDto)
}
```

**Update caller:** `frontend/src/pages/MyCVs.tsx`
```typescript
// Line 132
await cvApi.uploadCv(newCv.id, file, USER_ID)  // ✅ Thêm userId
```

---

### 3. Fix Route Mismatch - Analyze CV

**File:** `frontend/src/services/api.ts`

**Vấn đề:**
```typescript
// ❌ SAI - Line 113
analyzeCv: async (id: number): Promise<AnalysisResultDto> => {
  const response = await apiClient.post<ApiResponse<AnalysisResultDto>>(`/cv/${id}/analyze`)
  return response.data.Data
}
```

**Backend expect:** `POST /api/cv/analyze/{id}?userId=X`

**Fix:**
```typescript
// ✅ ĐÚNG
analyzeCv: async (id: number, userId: number): Promise<AnalysisResultDto> => {
  const response = await apiClient.post<ApiResponse<AnalysisResultDto>>(
    `/cv/analyze/${id}?userId=${userId}`
  )
  return response.data?.Data ?? ({} as AnalysisResultDto)
}
```

**Update caller:** `frontend/src/pages/MyCVs.tsx`
```typescript
// Line 86
mutationFn: (id: number) => cvApi.analyzeCv(id, USER_ID),  // ✅ Thêm userId
```

---

### 4. Fix Missing userId in Get/Update/Delete

**File:** `frontend/src/services/api.ts`

**Vấn đề:**
```typescript
// ❌ SAI - Line 59, 77, 86
getCv: async (id: number): Promise<DocumentDto> => {
  const response = await apiClient.get<ApiResponse<DocumentDto>>(`/cv/${id}`)
  return response.data.Data
}

updateCv: async (id: number, dto: UpdateDocumentDto): Promise<DocumentDto> => {
  const response = await apiClient.put<ApiResponse<DocumentDto>>(`/cv/${id}`, dto)
  return response.data.Data
}

deleteCv: async (id: number): Promise<void> => {
  await apiClient.delete(`/cv/${id}`)
}
```

**Backend expect:** Query param `userId`

**Fix:**
```typescript
// ✅ ĐÚNG
getCv: async (id: number, userId: number): Promise<DocumentDto> => {
  const response = await apiClient.get<ApiResponse<DocumentDto>>(
    `/cv/${id}?userId=${userId}`
  )
  return response.data?.Data ?? ({} as DocumentDto)
}

updateCv: async (id: number, dto: UpdateDocumentDto, userId: number): Promise<DocumentDto> => {
  const response = await apiClient.put<ApiResponse<DocumentDto>>(
    `/cv/${id}?userId=${userId}`,
    dto
  )
  return response.data?.Data ?? ({} as DocumentDto)
}

deleteCv: async (id: number, userId: number): Promise<void> => {
  await apiClient.delete(`/cv/${id}?userId=${userId}`)
}
```

---

### 5. Fix Error Status Codes (Backend)

**File:** `matchCV_Project/Controllers/CVController.cs`

**Vấn đề:**
```csharp
// ❌ SAI - Line 54-58, 94-98, 114-118, 166-170
catch (Exception ex) {
    _logger.LogError($"Error retrieving CVs: {ex.Message}");
    return NotFound(BaseResponseDto<IEnumerable<DocumentDto>>.FailureResponse(ex.Message));
}
```

**Fix:**
```csharp
// ✅ ĐÚNG
catch (Exception ex) {
    _logger.LogError(ex, "Error retrieving CVs for user {UserId}", userId);
    return StatusCode(
        StatusCodes.Status500InternalServerError,
        BaseResponseDto<IEnumerable<DocumentDto>>.FailureResponse(
            "An error occurred while retrieving CVs. Please try again later."
        )
    );
}
```

**Apply cho tất cả catch blocks:**
- `GetUserCvs` (line 54)
- `GetCv` (line 74)
- `UpdateCv` (line 94)
- `DeleteCv` (line 114)
- `AnalyzeCv` (line 166)

**Exception types nên handle riêng:**
```csharp
catch (ArgumentException ex) {
    _logger.LogWarning(ex, "Invalid request: {Message}", ex.Message);
    return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(ex.Message));
}
catch (UnauthorizedAccessException ex) {
    _logger.LogWarning(ex, "Unauthorized access attempt");
    return StatusCode(
        StatusCodes.Status403Forbidden,
        BaseResponseDto<DocumentDto>.FailureResponse("You are not allowed to access this resource")
    );
}
catch (Exception ex) {
    _logger.LogError(ex, "Unexpected error");
    return StatusCode(
        StatusCodes.Status500InternalServerError,
        BaseResponseDto<DocumentDto>.FailureResponse("An error occurred. Please try again later.")
    );
}
```

---

### 6. Add File Validation (Backend)

**File:** `matchCV_Project/Controllers/CVController.cs`

**Vấn đề:** Không validate file extension, size, content type

**Fix:**
```csharp
// ✅ THÊM vào method UploadFile (line 128)
[HttpPost("upload")]
public async Task<IActionResult> UploadFile([FromQuery] int userId, [FromQuery] int? id, IFormFile file)
{
    try
    {
        if (file == null || file.Length == 0)
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse("No file provided"));

        // ✅ Validate file extension
        var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(extension))
        {
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                "Invalid file format. Only PDF, DOC, and DOCX files are allowed."));
        }

        // ✅ Validate file size (10MB limit)
        const long maxFileSize = 10 * 1024 * 1024; // 10MB
        if (file.Length > maxFileSize)
        {
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                $"File size exceeds the 10MB limit. Current size: {file.Length / 1024 / 1024}MB"));
        }

        // ✅ Validate content type
        var allowedContentTypes = new[]
        {
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        };
        if (!allowedContentTypes.Contains(file.ContentType?.ToLowerInvariant()))
        {
            return BadRequest(BaseResponseDto<DocumentDto>.FailureResponse(
                "Invalid content type. Please upload a valid PDF or Word document."));
        }

        // Continue with existing upload logic...
        if (id.HasValue && id.Value > 0)
        {
            var resultExisting = await _documentService.UploadFileAsync(id.Value, file, userId);
            return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(resultExisting, "File uploaded successfully"));
        }
        else
        {
            var resultNew = await _documentService.CreateAndUploadAsync(file, userId);
            return Ok(BaseResponseDto<DocumentDto>.SuccessResponse(resultNew, "File uploaded and CV created successfully"));
        }
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error uploading file");
        return StatusCode(
            StatusCodes.Status500InternalServerError,
            BaseResponseDto<DocumentDto>.FailureResponse("An error occurred while uploading the file.")
        );
    }
}
```

---

## ⚠️ HIGH PRIORITY FIXES

### 7. Add Null Checks (Frontend)

**File:** `frontend/src/services/api.ts`

**Fix tất cả return statements:**
```typescript
// ✅ ĐÚNG - Thêm null check
getUserCvs: async (userId: number): Promise<DocumentDto[]> => {
  const response = await apiClient.get<ApiResponse<DocumentDto[]>>(`/cv/user/${userId}`)
  return response.data?.Data ?? []
}

getCv: async (id: number, userId: number): Promise<DocumentDto> => {
  const response = await apiClient.get<ApiResponse<DocumentDto>>(`/cv/${id}?userId=${userId}`)
  if (!response.data?.Data) {
    throw new Error('CV not found')
  }
  return response.data.Data
}
```

---

### 8. Add Loading States cho Actions

**File:** `frontend/src/pages/MyCVs.tsx`

**Fix:**
```typescript
// ✅ THÊM loading state cho buttons
const handleAnalyze = (id: number) => {
  if (analyzeMutation.isPending) {
    toast({
      title: 'Please wait',
      description: 'Analysis is already in progress',
    })
    return
  }
  analyzeMutation.mutate(id)
}

// ✅ Update button trong CvTable
<Button
  variant="ghost"
  size="icon"
  onClick={() => onAnalyze(cv.Id)}
  disabled={analyzeMutation.isPending}  // ✅ Disable khi đang process
  className="h-8 w-8 text-gray-400 hover:text-purple-400"
  title="Analyze CV"
>
  {analyzeMutation.isPending ? (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
  ) : (
    <RotateCcw className="h-4 w-4" />
  )}
</Button>
```

---

### 9. Add Confirmation Dialog cho Delete

**File:** `frontend/src/pages/MyCVs.tsx`

**Fix:**
```typescript
// ✅ THÊM confirmation
const handleDelete = (id: number, name: string) => {
  if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
    return
  }
  deleteMutation.mutate(id)
}

// ✅ Update CvTable để có delete button
<Button
  variant="ghost"
  size="icon"
  onClick={() => onDelete(cv.Id, cv.OriginalName)}
  disabled={deleteMutation.isPending}
  className="h-8 w-8 text-gray-400 hover:text-red-400"
  title="Delete CV"
>
  <Trash2 className="h-4 w-4" />
</Button>
```

---

### 10. Optimize Performance với useMemo

**File:** `frontend/src/pages/MyCVs.tsx`

**Fix:**
```typescript
import { useMemo } from 'react'

// ✅ THÊM useMemo
const insights = useMemo(
  () => calculateAiInsights(cvs),
  [cvs]
)

const summary = useMemo(
  () => calculateActivitySummary(cvs),
  [cvs]
)
```

---

### 11. Add Request Cancellation

**File:** `frontend/src/services/api.ts`

**Fix:**
```typescript
// ✅ THÊM AbortController support
import { AxiosRequestConfig } from 'axios'

export const cvApi = {
  getUserCvs: async (userId: number, signal?: AbortSignal): Promise<DocumentDto[]> => {
    const response = await apiClient.get<ApiResponse<DocumentDto[]>>(
      `/cv/user/${userId}`,
      { signal } as AxiosRequestConfig
    )
    return response.data?.Data ?? []
  },
  // ... tương tự cho các methods khác
}
```

**Update trong component:**
```typescript
// MyCVs.tsx
useEffect(() => {
  const controller = new AbortController()
  
  const fetchCvs = async () => {
    try {
      const data = await cvApi.getUserCvs(USER_ID, controller.signal)
      // ... handle data
    } catch (error) {
      if (error.name !== 'AbortError') {
        // Handle error
      }
    }
  }
  
  fetchCvs()
  
  return () => {
    controller.abort()
  }
}, [])
```

---

## 📊 MEDIUM PRIORITY FIXES

### 12. Add File Upload Progress

**File:** `frontend/src/services/api.ts`

**Fix:**
```typescript
uploadCv: async (
  id: number,
  file: File,
  userId: number,
  onProgress?: (progress: number) => void
): Promise<DocumentDto> => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await apiClient.post<ApiResponse<DocumentDto>>(
    `/cv/upload?userId=${userId}&id=${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
    }
  )
  return response.data?.Data ?? ({} as DocumentDto)
}
```

**Update UI:**
```typescript
// MyCVs.tsx
const [uploadProgress, setUploadProgress] = useState<number | null>(null)

const handleUpload = async (file: File) => {
  setUploadProgress(0)
  try {
    const newCv = await cvApi.createCv({...}, USER_ID)
    await cvApi.uploadCv(newCv.id, file, USER_ID, (progress) => {
      setUploadProgress(progress)
    })
    setUploadProgress(null)
    // ... success handling
  } catch (error) {
    setUploadProgress(null)
    // ... error handling
  }
}

// ✅ Hiển thị progress bar
{uploadProgress !== null && (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div
      className="bg-purple-600 h-2 rounded-full transition-all"
      style={{ width: `${uploadProgress}%` }}
    />
  </div>
)}
```

---

### 13. Improve Error Messages

**File:** `frontend/src/services/api.ts`

**Fix:**
```typescript
// ✅ Standardize error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection and try again.')
    }
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      
      let message = 'An error occurred'
      
      if (data?.Message) {
        message = data.Message
      } else if (data?.message) {
        message = data.message
      } else if (data?.Errors && data.Errors.length > 0) {
        message = data.Errors.join(', ')
      } else {
        // Standard messages based on status code
        switch (status) {
          case 400:
            message = 'Invalid request. Please check your input.'
            break
          case 401:
            message = 'Unauthorized. Please login again.'
            break
          case 403:
            message = 'You do not have permission to perform this action.'
            break
          case 404:
            message = 'Resource not found.'
            break
          case 500:
            message = 'Server error. Please try again later.'
            break
          default:
            message = `Error ${status}: ${error.message || 'An error occurred'}`
        }
      }
      
      throw new Error(message)
    } else if (error.request) {
      throw new Error(
        `Cannot connect to the server. Please make sure the backend is running on ${API_BASE_URL}`
      )
    } else {
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
)
```

---

### 14. Add Retry Logic

**File:** `frontend/src/services/api.ts`

**Fix:**
```typescript
// ✅ THÊM retry logic
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

const retryRequest = async (config: any, retryCount = 0): Promise<any> => {
  try {
    return await apiClient(config)
  } catch (error: any) {
    if (
      retryCount < MAX_RETRIES &&
      error.response?.status >= 500 &&
      error.response?.status < 600
    ) {
      // Retry on server errors
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)))
      return retryRequest(config, retryCount + 1)
    }
    throw error
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    
    // Retry logic
    if (
      !config._retry &&
      error.response?.status >= 500 &&
      error.response?.status < 600
    ) {
      config._retry = true
      return retryRequest(config)
    }
    
    // ... existing error handling
  }
)
```

---

## 📝 TESTING CHECKLIST

Sau khi apply fixes, test lại:

- [ ] Create CV với userId
- [ ] Upload CV với userId và file validation
- [ ] Analyze CV với userId
- [ ] Get/Update/Delete CV với userId
- [ ] Error status codes đúng (500 cho exceptions)
- [ ] File validation (extension, size, content type)
- [ ] Null checks không crash
- [ ] Loading states hiển thị đúng
- [ ] Confirmation dialog cho delete
- [ ] Performance improvements (useMemo)
- [ ] Upload progress hiển thị
- [ ] Error messages rõ ràng
- [ ] Retry logic hoạt động

---

**Last Updated:** 2025-01-XX  
**Priority:** Fix Critical issues trước, sau đó High, cuối cùng Medium

