# MONITORING

Tài liệu này mô tả chiến lược monitoring và observability cho hệ thống Tutor.

## Health Checks

Tất cả services có endpoint `/health`:
- Core Service: `http://localhost:6889/health`
- AI Service: `http://localhost:8001/health`

## Logging

### Log Levels
- **ERROR**: Lỗi nghiêm trọng cần xử lý ngay
- **WARN**: Cảnh báo cần chú ý
- **INFO**: Thông tin hoạt động bình thường
- **DEBUG**: Thông tin debug (chỉ trong development)

### Log Format
- Structured logging (JSON format)
- Include: timestamp, level, service, message, context

## Metrics

### Application Metrics
- Request rate
- Response time
- Error rate
- Active users

### System Metrics
- CPU usage
- Memory usage
- Disk I/O
- Network I/O

## Alerts

### Critical Alerts
- Service down
- Database connection failure
- High error rate (> 5%)

### Warning Alerts
- High response time (> 5s)
- High CPU usage (> 80%)
- Low disk space (< 20%)

---

← Quay lại: [README.md](../README.md)

