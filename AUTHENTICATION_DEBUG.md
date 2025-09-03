# Authentication Debug Guide

## Vấn đề đã được sửa

### 1. Cải thiện AuthContext
- **Health check delay**: Thêm delay 5 giây trước khi bắt đầu health check
- **Retry logic**: Thêm cơ chế retry với exponential backoff cho network errors
- **Better error handling**: Xử lý lỗi network tốt hơn, không xóa user state ngay lập tức
- **Improved initialization**: Thêm delay cho localStorage và cải thiện logic khởi tạo

### 2. Cải thiện TokenManager
- **Backup token system**: Tự động khôi phục token từ backup nếu main token bị mất
- **Better validation**: Tăng buffer time từ 5 phút lên 10 phút
- **Retry mechanism**: Thêm cơ chế retry cho network errors
- **Token recovery**: Tự động khôi phục token khi cần thiết

### 3. Cải thiện API Client
- **Smarter 401 handling**: Chỉ xóa token cho core auth endpoints
- **Retry logic**: Thêm retry cho network errors
- **Better error classification**: Phân loại lỗi tốt hơn

### 4. Debug Components
- **AuthStatus component**: Hiển thị trạng thái authentication real-time
- **TokenDebugger**: Monitor token state và tự động recovery
- **Enhanced logging**: Log chi tiết hơn cho debugging

## Cách sử dụng

### 1. Debug Mode
Trong development mode, bạn sẽ thấy:
- **AuthStatus component** ở góc phải dưới màn hình
- **Console logs** chi tiết về token state
- **Auto-monitoring** token mỗi 30 giây

### 2. Console Commands
```javascript
// Kiểm tra trạng thái token
TokenDebugger.logTokenState()

// Export thông tin token
TokenDebugger.exportTokenInfo()

// Test API calls
AuthDebugger.testAuthAPI()

// Simulate errors để test
AuthDebugger.enableProfileError(true)
```

### 3. Kiểm tra localStorage
```javascript
// Kiểm tra token trong localStorage
localStorage.getItem('authToken')
localStorage.getItem('authToken_backup')
localStorage.getItem('lastValidToken')
```

## Các cải tiến chính

### 1. Persistence
- Token được lưu ở 2 nơi: main và backup
- Tự động khôi phục từ backup nếu main bị mất
- Timestamp tracking để debug

### 2. Recovery
- Tự động khôi phục token khi page refresh
- Health check với delay để tránh interference
- Retry logic cho network errors

### 3. Error Handling
- Phân biệt network errors vs authentication errors
- Không xóa user state ngay lập tức cho network errors
- Better error classification và handling

### 4. Monitoring
- Real-time token state monitoring
- Page visibility change detection
- localStorage change detection
- Auto-recovery attempts

## Troubleshooting

### Vấn đề: Token bị mất sau refresh
**Giải pháp**: TokenManager tự động khôi phục từ backup

### Vấn đề: User state bị clear không mong muốn
**Giải pháp**: Health check delay và better error classification

### Vấn đề: Network errors gây logout
**Giải pháp**: Retry logic và không clear state cho network errors

### Vấn đề: Token validation quá strict
**Giải pháp**: Tăng buffer time và better expiration handling

## Testing

### 1. Test Login Flow
1. Đăng nhập bình thường
2. Refresh trang
3. Kiểm tra user state vẫn giữ nguyên
4. Kiểm tra console logs

### 2. Test Token Recovery
1. Xóa main token khỏi localStorage
2. Refresh trang
3. Kiểm tra token được khôi phục từ backup
4. Kiểm tra user state

### 3. Test Network Errors
1. Disconnect internet
2. Thực hiện API call
3. Kiểm tra retry logic
4. Reconnect và kiểm tra recovery

### 4. Test Token Expiration
1. Đợi token gần hết hạn
2. Kiểm tra warning logs
3. Kiểm tra auto-cleanup

## Monitoring

### Console Logs
- 🔍 Token monitoring
- 🔑 Token operations
- ⚠️ Warnings
- ❌ Errors
- 🔄 Recovery attempts
- ✅ Success operations

### AuthStatus Component
- Real-time authentication status
- Token expiration countdown
- User information
- Test API call button

### TokenDebugger
- Auto-monitoring mỗi 30 giây
- Health check và recovery
- localStorage change detection
- Page visibility monitoring

## Best Practices

### 1. Development
- Luôn bật debug mode
- Monitor console logs
- Test các edge cases
- Sử dụng AuthStatus component

### 2. Production
- Disable debug components
- Monitor error logs
- Track authentication metrics
- Regular token health checks

### 3. Maintenance
- Regular code review
- Update dependencies
- Monitor performance
- Test authentication flows

## Future Improvements

### 1. Token Refresh
- Implement automatic token refresh
- Silent authentication
- Background refresh

### 2. Multi-tab Support
- Cross-tab authentication sync
- Tab-specific token management
- Shared authentication state

### 3. Offline Support
- Offline authentication cache
- Sync when online
- Conflict resolution

### 4. Security Enhancements
- Token encryption
- Secure storage
- Biometric authentication
- Multi-factor authentication
