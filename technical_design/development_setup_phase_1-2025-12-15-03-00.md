# DEVELOPMENT SETUP GUIDE – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer  
**Status:** Draft  
**Version:** 2025-12-15-03-00  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này hướng dẫn **thiết lập môi trường phát triển** cho dự án Tutor – Phase 1, bao gồm:
- Yêu cầu hệ thống và công cụ
- Cài đặt tech stack
- Setup local development environment
- Docker compose cho local development
- IDE recommendations
- Git workflow

Tài liệu này giúp developer mới có thể bắt đầu code ngay sau khi setup.

---


## 2. YÊU CẦU HỆ THỐNG

### 2.1. Hệ điều hành
- **Windows:** Windows 10/11 (64-bit)
- **macOS:** macOS 10.15+ (Catalina trở lên)
- **Linux:** Ubuntu 20.04+ hoặc tương đương

### 2.2. Phần cứng tối thiểu
- RAM: 8GB (khuyến nghị 16GB)
- Disk: 20GB trống
- CPU: 4 cores (khuyến nghị 8 cores)

---


## 3. TECH STACK VÀ VERSIONS

### 3.1. Backend – Core Service

| Technology | Version | Ghi chú |
|------------|---------|---------|
| Java | 17 LTS | OpenJDK hoặc Oracle JDK |
| Spring Boot | 3.2.0+ | Framework chính |
| Maven | 3.9+ | Build tool |
| PostgreSQL | 15+ | Database |

### 3.2. Backend – AI Service

| Technology | Version | Ghi chú |
|------------|---------|---------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.104+ | Web framework |
| Poetry | 1.6+ | Dependency management |
| OpenAI API | Latest | AI service (hoặc tương đương) |

### 3.3. Frontend – Student App

| Technology | Version | Ghi chú |
|------------|---------|---------|
| Flutter | 3.16+ | Framework |
| Dart | 3.2+ | Language |
| Android Studio | Latest | IDE (optional) |
| Xcode | 15+ | iOS development (macOS only) |

### 3.4. Frontend – Parent Dashboard

| Technology | Version | Ghi chú |
|------------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Next.js | 14+ | Framework |
| TypeScript | 5.3+ | Language |
| npm/yarn | Latest | Package manager |

### 3.5. Infrastructure & Tools

| Technology | Version | Ghi chú |
|------------|---------|---------|
| Docker | 24+ | Containerization |
| Docker Compose | 2.23+ | Local orchestration |
| Git | 2.40+ | Version control |
| PostgreSQL | 15+ | Database (local) |

---

## 4. CÀI ĐẶT CÔNG CỤ CƠ BẢN

### 4.1. Git

**Windows:**
```bash
# Download từ https://git-scm.com/download/win
# Hoặc dùng winget
winget install Git.Git
```

**macOS:**
```bash
# Dùng Homebrew
brew install git
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install git
```

**Verify:**
```bash
git --version
```

### 4.2. Docker & Docker Compose

**Windows:**
- Download Docker Desktop từ https://www.docker.com/products/docker-desktop
- Cài đặt và khởi động Docker Desktop

**macOS:**
```bash
brew install --cask docker
```

**Linux:**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Verify:**
```bash
docker --version
docker-compose --version
```

---

## 5. SETUP BACKEND – CORE SERVICE (JAVA SPRING BOOT)

### 5.1. Cài đặt Java 17

**Windows:**
```bash
# Dùng Chocolatey
choco install openjdk17

# Hoặc download từ https://adoptium.net/
```

**macOS:**
```bash
brew install openjdk@17
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk
```

**Verify:**
```bash
java -version
# Should show: openjdk version "17.x.x"
```

### 5.2. Cài đặt Maven

**Windows:**
```bash
choco install maven
```

**macOS:**
```bash
brew install maven
```

**Linux:**
```bash
sudo apt-get install maven
```

**Verify:**
```bash
mvn --version
```

### 5.3. Setup Project

```bash
# Clone repository (khi có)
git clone <repository-url>
cd tutor/core-service

# Build project
mvn clean install

# Run tests
mvn test

# Start application
mvn spring-boot:run
```

---

## 6. SETUP BACKEND – AI SERVICE (PYTHON)

### 6.1. Cài đặt Python 3.11+

**Windows:**
```bash
# Download từ https://www.python.org/downloads/
# Hoặc dùng winget
winget install Python.Python.3.11
```

**macOS:**
```bash
brew install python@3.11
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install python3.11 python3.11-venv python3-pip
```

**Verify:**
```bash
python3 --version
# Should show: Python 3.11.x
```

### 6.2. Cài đặt Poetry

```bash
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Add to PATH (Linux/macOS)
export PATH="$HOME/.local/bin:$PATH"

# Verify
poetry --version
```

### 6.3. Setup Project

```bash
cd tutor/ai-service

# Install dependencies
poetry install

# Activate virtual environment
poetry shell

# Run application
poetry run uvicorn main:app --reload --port 8001
```

---

## 7. SETUP FRONTEND – STUDENT APP (FLUTTER)

### 7.1. Cài đặt Flutter

**Windows:**
```bash
# Download Flutter SDK từ https://flutter.dev/docs/get-started/install/windows
# Extract và add to PATH
```

**macOS:**
```bash
# Dùng Homebrew
brew install --cask flutter
```

**Linux:**
```bash
# Download và extract Flutter SDK
# Add to PATH
```

**Verify:**
```bash
flutter --version
flutter doctor
```

### 7.2. Setup Android Studio (cho Android)

1. Download từ https://developer.android.com/studio
2. Cài đặt Android SDK
3. Cấu hình Android emulator (optional)

### 7.3. Setup Xcode (cho iOS - macOS only)

1. Download từ App Store
2. Cài đặt Command Line Tools:
```bash
xcode-select --install
```

### 7.4. Setup Project

```bash
cd tutor/student-app

# Get dependencies
flutter pub get

# Run on connected device/emulator
flutter run

# Run on specific device
flutter devices
flutter run -d <device-id>
```

---

## 8. SETUP FRONTEND – PARENT DASHBOARD (NEXT.JS)

### 8.1. Cài đặt Node.js 20 LTS

**Windows/macOS:**
- Download từ https://nodejs.org/
- Hoặc dùng nvm (Node Version Manager)

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify:**
```bash
node --version
npm --version
```

### 8.2. Setup Project

```bash
cd tutor/parent-dashboard

# Install dependencies
npm install
# hoặc
yarn install

# Run development server
npm run dev
# hoặc
yarn dev

# Build for production
npm run build
```

---

## 9. DOCKER COMPOSE CHO LOCAL DEVELOPMENT

### 9.1. Tạo docker-compose.yml

Tạo file `docker-compose.yml` ở root project:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: tutor-postgres
    environment:
      POSTGRES_USER: tutor
      POSTGRES_PASSWORD: tutor123
      POSTGRES_DB: tutor_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tutor"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: Redis for caching (Phase 2)
  # redis:
  #   image: redis:7-alpine
  #   container_name: tutor-redis
  #   ports:
  #     - "6379:6379"

volumes:
  postgres_data:
```

### 9.2. Chạy Docker Compose

```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f postgres

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### 9.3. Kết nối Database

Sau khi chạy Docker Compose, database sẽ available tại:
- Host: `localhost`
- Port: `5432`
- Database: `tutor_db`
- User: `tutor`
- Password: `tutor123`

---

## 10. IDE RECOMMENDATIONS

### 10.1. Backend Development

**IntelliJ IDEA (Recommended)**
- Version: Ultimate hoặc Community Edition
- Plugins:
  - Spring Boot
  - Lombok
  - Database Navigator
  - Docker

**VS Code (Alternative)**
- Extensions:
  - Java Extension Pack
  - Spring Boot Extension Pack
  - Docker

### 10.2. Frontend Development

**VS Code (Recommended)**
- Extensions:
  - Flutter
  - Dart
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

**Android Studio** (cho Flutter Android development)

### 10.3. Python Development

**PyCharm** hoặc **VS Code**
- Extensions:
  - Python
  - Pylance
  - Poetry

---

## 11. GIT WORKFLOW

### 11.1. Branching Strategy

```
main (production-ready code)
  └── develop (integration branch)
      ├── feature/feature-name
      ├── bugfix/bug-name
      └── hotfix/hotfix-name
```

### 11.2. Commit Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat(student): add onboarding flow

- Implement grade selection
- Add learning goal selection
- Save student profile

Closes #123
```

### 11.3. Pull Request Process

1. Create feature branch từ `develop`
2. Commit changes với convention
3. Push branch và tạo Pull Request
4. Code review
5. Merge vào `develop` sau khi approved

---

## 12. CODE STYLE GUIDELINES

### 12.1. Java (Spring Boot)

- Follow Google Java Style Guide
- Use Lombok để giảm boilerplate
- Format code với IntelliJ formatter
- Maximum line length: 120 characters

### 12.2. Python (AI Service)

- Follow PEP 8
- Use Black formatter
- Maximum line length: 100 characters
- Type hints cho function parameters

### 12.3. TypeScript/JavaScript (Next.js)

- Use ESLint và Prettier
- Follow Airbnb Style Guide
- Use TypeScript strict mode
- Maximum line length: 100 characters

### 12.4. Dart (Flutter)

- Follow Effective Dart guidelines
- Use `dart format` command
- Maximum line length: 80 characters

---

## 13. ENVIRONMENT VARIABLES

Tạo file `.env.example` cho mỗi service:

**Core Service (.env.example):**
```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tutor_db
SPRING_DATASOURCE_USERNAME=tutor
SPRING_DATASOURCE_PASSWORD=tutor123
AI_SERVICE_URL=http://localhost:8001
JWT_SECRET=your-secret-key-here
```

**AI Service (.env.example):**
```properties
OPENAI_API_KEY=your-api-key-here
CORE_SERVICE_URL=http://localhost:8080
```

**Parent Dashboard (.env.example):**
```properties
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Copy `.env.example` thành `.env` và điền giá trị thực tế.

---

## 14. VERIFICATION CHECKLIST

Sau khi setup, verify các bước sau:

- [ ] Git installed và configured
- [ ] Docker và Docker Compose running
- [ ] PostgreSQL container running
- [ ] Java 17 installed
- [ ] Maven installed
- [ ] Python 3.11+ installed
- [ ] Poetry installed
- [ ] Node.js 20 LTS installed
- [ ] Flutter installed và `flutter doctor` passes
- [ ] IDE configured với plugins/extensions
- [ ] Có thể build và run từng service
- [ ] Database connection successful

---

## 15. TROUBLESHOOTING

### 15.1. Docker Issues

**Problem:** Docker không start
**Solution:** 
- Kiểm tra Docker Desktop đang chạy
- Restart Docker Desktop
- Kiểm tra port conflicts

### 15.2. Database Connection Issues

**Problem:** Không kết nối được PostgreSQL
**Solution:**
- Verify container đang chạy: `docker-compose ps`
- Kiểm tra port 5432 không bị chiếm
- Verify credentials trong `.env`

### 15.3. Port Conflicts

**Problem:** Port đã được sử dụng
**Solution:**
- Thay đổi port trong `docker-compose.yml` hoặc application config
- Kill process đang dùng port:
  - Windows: `netstat -ano | findstr :PORT` → `taskkill /PID <PID> /F`
  - Linux/macOS: `lsof -ti:PORT | xargs kill`

---

## 16. TÀI LIỆU LIÊN QUAN

- [System Architecture](./system_architecture_phase_1-2025-12-15-00-21.md)
- [Environment Configuration](./environment_config_phase_1-YYYY-MM-DD-HH-mm.md)
- [Project Structure](./project_structure_phase_1-YYYY-MM-DD-HH-mm.md)
- [Database Migration Guide](../database_design/migration_seeding_guide_phase_1-YYYY-MM-DD-HH-mm.md)

---

## 17. GHI CHÚ / TODO

- [ ] Tạo script setup tự động (setup.sh / setup.ps1)
- [ ] Thêm CI/CD configuration
- [ ] Document local debugging procedures
- [ ] Add performance profiling setup

---

## 18. LỊCH SỬ THAY ĐỔI

- 2025-12-15-03-00: Tạo mới Development Setup Guide



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)