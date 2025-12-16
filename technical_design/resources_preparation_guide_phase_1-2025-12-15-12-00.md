# HƯỚNG DẪN CHUẨN BỊ TÀI NGUYÊN – TUTOR CORE SERVICE

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer  
**Status:** Draft  
**Version:** 2025-12-15-12-00  
**Author:** Auto (Cursor AI)

- ← Quay lại: [Tài liệu tổng quan](../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này liệt kê **tất cả tài nguyên cần chuẩn bị** để triển khai các tính năng trong module `tutor-core-service`, bao gồm:
- Firebase Admin SDK credentials
- OTP service configuration
- OAuth providers (Google/Apple) credentials
- AI Service configuration
- Object Storage (S3) credentials
- Các API keys và secrets khác

Mỗi tài nguyên bao gồm:
- Mô tả và ví dụ
- Hướng dẫn từng bước để lấy được thông tin
- Nơi lưu trữ và cách sử dụng

---

## 2. TỔNG QUAN THEO ĐỘ ƯU TIÊN

### 2.1. Priority: HIGH

1. **Firebase Admin SDK Integration**
2. **OTP Service Implementation**
3. **Phone-based Authentication**

### 2.2. Priority: MEDIUM

4. **OAuth Providers (Google/Apple)**
5. **AI Service Client**

### 2.3. Priority: LOW

6. **Object Storage Integration**

---

## 3. FIREBASE ADMIN SDK (HIGH PRIORITY)

### 3.1. Tài nguyên cần có

#### 3.1.1. Firebase Service Account JSON File

**Mô tả:**
File JSON chứa thông tin xác thực để Core Service có thể sử dụng Firebase Admin SDK để:
- Gửi OTP qua SMS
- Xác minh OAuth tokens (Google/Apple)
- Quản lý users trong Firebase

**Ví dụ cấu trúc file:**
{
  "type": "service_account",
  "project_id": "tutor-platform-12345",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@tutor-platform-12345.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40tutor-platform-12345.iam.gserviceaccount.com"
}

**Thông tin quan trọng:**
- `project_id`: ID của Firebase project
- `private_key`: Private key để xác thực
- `client_email`: Email của service account

**Nơi lưu trữ:**
- Development: `tutor-core-service/src/main/resources/firebase-service-account.json`
- Production: Environment variable hoặc secrets manager (không commit vào git)

#### 3.1.2. Firebase Project ID

**Mô tả:**
ID của Firebase project, dùng để khởi tạo Firebase Admin SDK.

**Ví dụ:**
```
tutor-platform-12345
```

**Cách lấy:**
- Có trong Firebase Service Account JSON (field `project_id`)
- Hoặc xem trong Firebase Console → Project Settings → General

---

### 3.2. Hướng dẫn lấy Firebase Service Account JSON

#### Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** hoặc **"Create a project"**
3. Nhập tên project: `Tutor Platform` (hoặc tên bạn muốn)
4. Chọn **Google Analytics** (tùy chọn, có thể bỏ qua)
5. Click **"Create project"**
6. Đợi project được tạo (khoảng 30 giây)

#### Bước 2: Enable Authentication Methods

1. Trong Firebase Console, vào **Authentication** (menu bên trái)
2. Click **"Get started"** (nếu lần đầu)
3. Vào tab **"Sign-in method"**
4. Enable các phương thức sau:

   **a. Phone Authentication:**
   - Click vào **"Phone"**
   - Bật **"Enable"**
   - Chọn **"Phone numbers for testing"** (development) hoặc cấu hình production
   - Click **"Save"**

   **b. Google Sign-In:**
   - Click vào **"Google"**
   - Bật **"Enable"**
   - Nhập **Project support email** (email của bạn)
   - Click **"Save"**

   **c. Apple Sign-In:**
   - Click vào **"Apple"**
   - Bật **"Enable"**
   - Nhập **Apple Services ID** (cần tạo trong Apple Developer Console - xem phần OAuth)
   - Click **"Save"**

#### Bước 3: Generate Service Account Key

1. Vào **Project Settings** (icon bánh răng ở menu bên trái)
2. Vào tab **"Service accounts"**
3. Click **"Generate new private key"**
4. Xác nhận trong popup (click **"Generate key"**)
5. File JSON sẽ được tải xuống tự động
6. Đổi tên file thành: `firebase-service-account.json`
7. Lưu file vào: `tutor-core-service/src/main/resources/firebase-service-account.json`

**⚠️ LƯU Ý BẢO MẬT:**
- **KHÔNG** commit file này vào Git
- Thêm vào `.gitignore`: `**/firebase-service-account.json`
- Trong production, sử dụng environment variable hoặc secrets manager

---

## 4. OTP SERVICE CONFIGURATION (HIGH PRIORITY)

### 4.1. Tài nguyên cần có

#### 4.1.1. Firebase Phone Authentication Configuration

**Mô tả:**
Cấu hình để Firebase có thể gửi OTP qua SMS. Trong Phase 1, sử dụng Firebase Authentication để gửi OTP.

**Thông tin cần:**
- Firebase Project ID (đã có từ phần 3)
- Firebase Service Account JSON (đã có từ phần 3)
- Test phone numbers (cho development)

**Ví dụ test phone numbers (Development):**
```
+84123456789,123456  // Format: +84xxxxxxxxx,OTP_CODE
+84987654321,654321
```

**Cách cấu hình test numbers:**
1. Vào Firebase Console → Authentication → Sign-in method
2. Click vào **"Phone"**
3. Scroll xuống phần **"Phone numbers for testing"**
4. Click **"Add phone number"**
5. Nhập số điện thoại và mã OTP test (ví dụ: `+84123456789` và `123456`)
6. Click **"Add"**

**⚠️ LƯU Ý:**
- Test numbers chỉ hoạt động trong development
- Production cần verify domain và enable billing (Firebase có free tier cho SMS)

---

### 4.2. Rate Limiting Configuration

**Mô tả:**
Cấu hình giới hạn số lần gửi OTP mỗi ngày (theo yêu cầu: tối đa 3 lần/ngày/số điện thoại).

**Thông tin cần:**
- Không cần tài nguyên bên ngoài
- Cấu hình trong code (database hoặc Redis)

**Ví dụ cấu hình:**
```yaml
# application.yml
otp:
  rate-limit:
    max-attempts-per-day: 3
    window-hours: 24
```

---

## 5. OAUTH PROVIDERS - GOOGLE (MEDIUM PRIORITY)

### 5.1. Tài nguyên cần có

#### 5.1.1. Google OAuth 2.0 Client Credentials

**Mô tả:**
Client ID và Client Secret để xác minh Google OAuth tokens từ frontend.

**Ví dụ:**
```properties
GOOGLE_OAUTH_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

**Thông tin cần:**
- `GOOGLE_OAUTH_CLIENT_ID`: Client ID từ Google Cloud Console
- `GOOGLE_OAUTH_CLIENT_SECRET`: Client Secret từ Google Cloud Console

---

### 5.2. Hướng dẫn lấy Google OAuth Credentials

#### Bước 1: Tạo OAuth 2.0 Client trong Google Cloud Console

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project Firebase của bạn (hoặc tạo project mới)
3. Vào **APIs & Services** → **Credentials**
4. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**

#### Bước 2: Configure OAuth Consent Screen (nếu chưa có)

1. Nếu chưa có, Google sẽ yêu cầu configure OAuth consent screen
2. Chọn **"External"** (cho development) hoặc **"Internal"** (cho G Suite)
3. Điền thông tin:
   - **App name**: `Tutor Platform`
   - **User support email**: Email của bạn
   - **Developer contact information**: Email của bạn
4. Click **"Save and Continue"**
5. Bỏ qua **Scopes** (click **"Save and Continue"**)
6. Bỏ qua **Test users** (click **"Save and Continue"**)
7. Click **"Back to Dashboard"**

#### Bước 3: Tạo OAuth Client ID

1. Vào **Credentials** → **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
2. Chọn **Application type**: **"Web application"**
3. Điền thông tin:
   - **Name**: `Tutor Platform Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (Parent Dashboard - dev)
     - `http://localhost:3001` (Admin Dashboard - dev)
     - `https://your-domain.com` (Production - thêm sau)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/callback/google` (Parent Dashboard - dev)
     - `http://localhost:3001/auth/callback/google` (Admin Dashboard - dev)
     - `https://your-domain.com/auth/callback/google` (Production - thêm sau)
4. Click **"Create"**
5. **Copy và lưu:**
   - **Client ID**: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

**⚠️ LƯU Ý:**
- Client Secret chỉ hiển thị 1 lần, hãy copy ngay
- Nếu quên, phải tạo client ID mới

---

## 6. OAUTH PROVIDERS - APPLE (MEDIUM PRIORITY)

### 6.1. Tài nguyên cần có

#### 6.1.1. Apple Sign In Configuration

**Mô tả:**
Apple Sign In yêu cầu cấu hình trong Apple Developer Console và Firebase.

**Thông tin cần:**
- Apple Services ID
- Apple Team ID
- Apple Key ID
- Apple Private Key (.p8 file)

**Ví dụ:**
```properties
APPLE_TEAM_ID=ABC123DEF4
APPLE_SERVICES_ID=com.tutor.platform
APPLE_KEY_ID=XYZ789ABC1
APPLE_PRIVATE_KEY_PATH=src/main/resources/apple-auth-key.p8
```

---

### 6.2. Hướng dẫn lấy Apple Sign In Credentials

#### Bước 1: Tạo App ID trong Apple Developer Console

1. Truy cập [Apple Developer Console](https://developer.apple.com/account/)
2. Vào **Certificates, Identifiers & Profiles**
3. Vào **Identifiers** → Click **"+"**
4. Chọn **"Services IDs"** → Click **"Continue"**
5. Điền thông tin:
   - **Description**: `Tutor Platform`
   - **Identifier**: `com.tutor.platform` (hoặc domain của bạn)
6. Click **"Continue"** → **"Register"**
7. Click vào Services ID vừa tạo
8. Bật **"Sign In with Apple"**
9. Click **"Configure"**
10. Điền thông tin:
    - **Primary App ID**: Chọn app ID của bạn (hoặc tạo mới)
    - **Website URLs**:
      - **Domains and Subdomains**: `your-domain.com`
      - **Return URLs**: `https://your-domain.com/auth/callback/apple`
11. Click **"Save"** → **"Continue"** → **"Save"**

#### Bước 2: Tạo Key cho Sign In with Apple

1. Vào **Keys** → Click **"+"**
2. Điền thông tin:
   - **Key Name**: `Tutor Platform Apple Auth Key`
   - Bật **"Sign In with Apple"**
3. Click **"Configure"** → Chọn **Primary App ID** → **"Save"**
4. Click **"Continue"** → **"Register"**
5. **Download key file** (`.p8` file) - chỉ download được 1 lần
6. Lưu file vào: `tutor-core-service/src/main/resources/apple-auth-key.p8`
7. **Copy và lưu:**
   - **Key ID**: `XYZ789ABC1` (hiển thị trong danh sách keys)
   - **Team ID**: Xem ở góc trên bên phải Apple Developer Console

#### Bước 3: Cấu hình trong Firebase

1. Vào Firebase Console → Authentication → Sign-in method
2. Click vào **"Apple"**
3. Điền thông tin:
   - **Services ID**: `com.tutor.platform` (từ Bước 1)
   - **Apple Team ID**: `ABC123DEF4` (từ Bước 2)
   - **OAuth Code Flow Configuration**: 
     - **Key ID**: `XYZ789ABC1` (từ Bước 2)
     - **Private Key**: Paste nội dung file `.p8` (hoặc upload)
4. Click **"Save"**

**⚠️ LƯU Ý:**
- File `.p8` chỉ download được 1 lần, hãy lưu cẩn thận
- **KHÔNG** commit file `.p8` vào Git
- Thêm vào `.gitignore`: `**/apple-auth-key.p8`

---

## 7. AI SERVICE CLIENT (MEDIUM PRIORITY)

### 7.1. Tài nguyên cần có

#### 7.1.1. AI Service URL và Configuration

**Mô tả:**
URL và cấu hình để Core Service gọi API đến AI Service.

**Ví dụ:**
```yaml
# application.yml
ai-service:
  url: http://localhost:8001
  timeout-ms: 30000
  retry-attempts: 3
  api-key: internal-api-key-12345  # Optional, nếu AI Service yêu cầu
```

**Thông tin cần:**
- **Development**: `http://localhost:8001`
- **Production**: URL của AI Service deployment (ví dụ: `https://ai-service.tutor.app`)

**Cách lấy:**
- Development: Mặc định là `http://localhost:8001` (xem trong `tutor-ai-service`)
- Production: URL từ deployment (Docker/Kubernetes/AWS/etc.)

#### 7.1.2. AI Service API Key (Optional)

**Mô tả:**
API key để xác thực requests từ Core Service đến AI Service (nếu AI Service yêu cầu).

**Ví dụ:**
```properties
AI_SERVICE_API_KEY=internal-api-key-12345-secure-random-string
```

**Cách tạo:**
- Tạo random string (32-64 ký tự)
- Lưu trong environment variable
- Cấu hình trong AI Service để accept key này

---

## 8. OBJECT STORAGE - S3 (LOW PRIORITY)

### 8.1. Tài nguyên cần có

#### 8.1.1. S3-Compatible Storage Credentials

**Mô tả:**
Credentials để upload và lưu trữ images (bài toán từ student app) trong S3-compatible storage.

**Ví dụ (Development - MinIO):**
```properties
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=tutor-uploads
S3_REGION=us-east-1
```

**Ví dụ (Production - AWS S3):**
```properties
S3_ENDPOINT=https://s3.amazonaws.com
S3_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
S3_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_BUCKET_NAME=tutor-uploads-prod
S3_REGION=us-east-1
```

**Thông tin cần:**
- `S3_ENDPOINT`: Endpoint URL của S3 service
- `S3_ACCESS_KEY`: Access key ID
- `S3_SECRET_KEY`: Secret access key
- `S3_BUCKET_NAME`: Tên bucket để lưu files
- `S3_REGION`: Region của S3 (ví dụ: `us-east-1`)

---

### 8.2. Hướng dẫn setup Object Storage

#### Option 1: MinIO (Development - Local)

**Bước 1: Chạy MinIO bằng Docker**

```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

**Bước 2: Tạo bucket**

1. Truy cập MinIO Console: `http://localhost:9001`
2. Login với:
   - Username: `minioadmin`
   - Password: `minioadmin`
3. Click **"Create Bucket"**
4. Tên bucket: `tutor-uploads`
5. Click **"Create Bucket"**

**Bước 3: Tạo Access Key (Optional - cho production-like setup)**

1. Vào **Access Keys** → **"Create Access Key"**
2. Copy **Access Key** và **Secret Key**
3. Sử dụng trong configuration

**Credentials mặc định (Development):**
```
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=tutor-uploads
S3_REGION=us-east-1
```

---

#### Option 2: AWS S3 (Production)

**Bước 1: Tạo AWS Account**

1. Truy cập [AWS Console](https://aws.amazon.com/)
2. Đăng ký/đăng nhập AWS account
3. Vào **IAM** (Identity and Access Management)

**Bước 2: Tạo IAM User cho S3 Access**

1. Vào **IAM** → **Users** → **"Add users"**
2. Username: `tutor-s3-user`
3. Chọn **"Access key - Programmatic access"**
4. Click **"Next: Permissions"**
5. Chọn **"Attach policies directly"**
6. Tìm và chọn: **"AmazonS3FullAccess"** (hoặc tạo custom policy chỉ cho bucket cụ thể)
7. Click **"Next"** → **"Create user"**
8. **Copy và lưu:**
   - **Access Key ID**: `AKIAIOSFODNN7EXAMPLE`
   - **Secret Access Key**: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` (chỉ hiển thị 1 lần)

**Bước 3: Tạo S3 Bucket**

1. Vào **S3** → **"Create bucket"**
2. Điền thông tin:
   - **Bucket name**: `tutor-uploads-prod` (phải unique globally)
   - **Region**: `us-east-1` (hoặc region gần bạn)
   - **Block Public Access**: Bật (recommended)
3. Click **"Create bucket"**

**Credentials:**
```
S3_ENDPOINT=https://s3.amazonaws.com
S3_ACCESS_KEY=<Access Key ID từ Bước 2>
S3_SECRET_KEY=<Secret Access Key từ Bước 2>
S3_BUCKET_NAME=tutor-uploads-prod
S3_REGION=us-east-1
```

---

## 9. TỔNG HỢP CHECKLIST

### 9.1. Tài nguyên cần chuẩn bị (theo thứ tự ưu tiên)

#### ✅ HIGH PRIORITY

- [ ] **Firebase Project** đã tạo
- [ ] **Firebase Service Account JSON** file đã download
- [ ] **Firebase Phone Authentication** đã enable
- [ ] **Firebase Test Phone Numbers** đã cấu hình (development)
- [ ] File `firebase-service-account.json` đã lưu vào `tutor-core-service/src/main/resources/`
- [ ] Đã thêm `firebase-service-account.json` vào `.gitignore`

#### ✅ MEDIUM PRIORITY

- [ ] **Google OAuth Client ID** đã tạo
- [ ] **Google OAuth Client Secret** đã lưu
- [ ] **Apple Services ID** đã tạo
- [ ] **Apple Key ID** đã lưu
- [ ] **Apple Private Key (.p8)** đã download và lưu
- [ ] **Apple Team ID** đã lưu
- [ ] **AI Service URL** đã xác định (dev: `http://localhost:8001`)
- [ ] **AI Service API Key** đã tạo (nếu cần)

#### ✅ LOW PRIORITY

- [ ] **MinIO** đã chạy (development) hoặc **AWS S3** đã setup (production)
- [ ] **S3 Bucket** đã tạo
- [ ] **S3 Access Key** và **Secret Key** đã lưu

---

## 10. ENVIRONMENT VARIABLES SUMMARY

### 10.1. File `.env` hoặc `application-dev.yml` cần có

```yaml
# Database (đã có)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tutor_db
    username: tutor
    password: tutor123

# JWT (đã có)
jwt:
  secret: your-secret-key-min-256-bits
  expiration-ms: 3600000

# Firebase (CẦN THÊM)
firebase:
  credentials-path: src/main/resources/firebase-service-account.json
  project-id: tutor-platform-12345

# OTP (CẦN THÊM)
otp:
  rate-limit:
    max-attempts-per-day: 3
    window-hours: 24

# Google OAuth (CẦN THÊM)
google:
  oauth:
    client-id: 123456789-abcdefghijklmnop.apps.googleusercontent.com
    client-secret: GOCSPX-abcdefghijklmnopqrstuvwxyz

# Apple OAuth (CẦN THÊM)
apple:
  team-id: ABC123DEF4
  services-id: com.tutor.platform
  key-id: XYZ789ABC1
  private-key-path: src/main/resources/apple-auth-key.p8

# AI Service (CẦN THÊM)
ai-service:
  url: http://localhost:8001
  timeout-ms: 30000
  retry-attempts: 3
  api-key: internal-api-key-12345  # Optional

# S3 Storage (CẦN THÊM - Low Priority)
s3:
  endpoint: http://localhost:9000
  access-key: minioadmin
  secret-key: minioadmin
  bucket-name: tutor-uploads
  region: us-east-1

# CORS (đã có)
cors:
  allowed-origins: http://localhost:3000,http://localhost:5173
```

---

## 11. BẢO MẬT VÀ BEST PRACTICES

### 11.1. Files không được commit vào Git

Thêm vào `.gitignore`:
```
# Firebase
**/firebase-service-account.json

# Apple
**/apple-auth-key.p8

# Environment files
**/.env
**/.env.local
**/.env.*.local
```

### 11.2. Secrets Management

**Development:**
- Sử dụng `.env` files (không commit)
- Sử dụng `.env.example` làm template

**Production:**
- Sử dụng **Environment Variables** (Docker/Kubernetes)
- Hoặc **AWS Secrets Manager** / **HashiCorp Vault**
- Hoặc **GitHub Secrets** (cho CI/CD)

### 11.3. Rotation Policy

- **Firebase Service Account**: Rotate mỗi 90 ngày (nếu có thể)
- **OAuth Client Secrets**: Rotate mỗi 180 ngày
- **S3 Access Keys**: Rotate mỗi 90 ngày
- **API Keys**: Rotate mỗi 90 ngày

---

## 12. TÀI LIỆU LIÊN QUAN

- [Environment Configuration](./environment_config_phase_1-2025-12-15-04-00.md)
- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)
- [Implementation Status](../../IMPLEMENTATION_STATUS.md)
- [Core Service README](../../../tutor-core-service/README.md)

---

## 13. GHI CHÚ / TODO

- [ ] Tạo script tự động setup MinIO cho development
- [ ] Tạo script validate tất cả credentials trước khi start service
- [ ] Document secret rotation procedures
- [ ] Setup secrets management tool cho production

---

## 14. LỊCH SỬ THAY ĐỔI

- 2025-12-15-12-00: Tạo mới Resources Preparation Guide

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)
```

Tài liệu đã được tạo. Tóm tắt:

## Tài nguyên cần chuẩn bị:

### HIGH PRIORITY:
1. Firebase Service Account JSON — file xác thực Firebase Admin SDK
2. Firebase Phone Authentication — cấu hình gửi OTP qua SMS
3. Firebase Test Phone Numbers — số test cho development

### MEDIUM PRIORITY:
4. Google OAuth Credentials — Client ID và Client Secret
5. Apple Sign In Credentials — Services ID, Key ID, Team ID, Private Key (.p8)
6. AI Service Configuration — URL và API key (nếu cần)

### LOW PRIORITY:
7. S3 Storage Credentials — Access Key, Secret Key, Bucket name (MinIO cho dev hoặc AWS S3 cho prod)

Mỗi phần có:
- Mô tả và ví dụ
- Hướng dẫn từng bước để lấy thông tin
- Nơi lưu trữ và cách sử dụng
- Lưu ý bảo mật

Bạn có muốn tôi tạo thêm script validation để kiểm tra các credentials này không?
