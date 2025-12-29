# DEVELOPMENT SETUP

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này hướng dẫn thiết lập môi trường phát triển cho dự án Tutor, bao gồm yêu cầu hệ thống, cài đặt tech stack, và setup local development environment.

## Yêu cầu hệ thống

### Hệ điều hành
- **Windows:** Windows 10/11 (64-bit)
- **macOS:** macOS 10.15+ (Catalina trở lên)
- **Linux:** Ubuntu 20.04+ hoặc tương đương

### Phần cứng tối thiểu
- RAM: 8GB (khuyến nghị 16GB)
- Disk: 20GB trống
- CPU: 4 cores (khuyến nghị 8 cores)

## Tech Stack và Versions

### Backend – Core Service
| Technology | Version | Ghi chú |
|------------|---------|---------|
| Java | 17 LTS | OpenJDK hoặc Oracle JDK |
| Spring Boot | 3.2.0+ | Framework chính |
| Maven | 3.9+ | Build tool |
| PostgreSQL | 15+ | Database |

### Backend – AI Service
| Technology | Version | Ghi chú |
|------------|---------|---------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.104+ | Web framework |
| Poetry | 1.6+ | Dependency management |
| OpenAI API | Latest | AI service (hoặc tương đương) |

### Frontend – Student App
| Technology | Version | Ghi chú |
|------------|---------|---------|
| Flutter | 3.16+ | Framework |
| Dart | 3.2+ | Language |
| Android Studio | Latest | IDE (optional) |
| Xcode | 15+ | iOS development (macOS only) |

### Frontend – Parent Dashboard
| Technology | Version | Ghi chú |
|------------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Next.js | 14+ | Framework |
| TypeScript | 5.3+ | Language |
| npm/yarn | Latest | Package manager |

### Infrastructure & Tools
| Technology | Version | Ghi chú |
|------------|---------|---------|
| Docker | 24+ | Containerization |
| Docker Compose | 2.23+ | Local orchestration |
| Git | 2.40+ | Version control |
| PostgreSQL | 15+ | Database (local) |

## Cài đặt công cụ cơ bản

### Git
**Windows:**
```bash
winget install Git.Git
```

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install git
```

### Docker & Docker Compose
**Windows/macOS:**
- Download Docker Desktop từ https://www.docker.com/products/docker-desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Setup Backend – Core Service (Java Spring Boot)

### Cài đặt Java 17
**Windows:**
```bash
choco install openjdk17
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

### Cài đặt Maven
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

### Setup Project
```bash
cd tutor-core-service
mvn clean install
mvn test
mvn spring-boot:run
```

## Setup Backend – AI Service (Python)

### Cài đặt Python 3.11+
**Windows:**
```bash
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

### Cài đặt Poetry
```bash
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"
```

### Setup Project
```bash
cd tutor-ai-service
poetry install
poetry shell
poetry run uvicorn main:app --reload --port 8001
```

## Setup Frontend – Student App (Flutter)

### Cài đặt Flutter
**Windows/macOS:**
- Download Flutter SDK từ https://flutter.dev/docs/get-started/install
- Add to PATH

**Verify:**
```bash
flutter --version
flutter doctor
```

### Setup Project
```bash
cd tutor-student-app
flutter pub get
flutter run
```

## Setup Frontend – Parent Dashboard (Next.js)

### Cài đặt Node.js 20 LTS
- Download từ https://nodejs.org/
- Hoặc dùng nvm (Node Version Manager)

### Setup Project
```bash
cd tutor-parent-dashboard
npm install
npm run dev
```

## Docker Compose cho Local Development

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

volumes:
  postgres_data:
```

**Chạy Docker Compose:**
```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f postgres
```

## IDE Recommendations

### Backend Development
- **IntelliJ IDEA** (Recommended)
- **VS Code** (Alternative)

### Frontend Development
- **VS Code** (Recommended)
- **Android Studio** (cho Flutter Android development)

### Python Development
- **PyCharm** hoặc **VS Code**

## Git Workflow

### Branching Strategy
```
main (production-ready code)
  └── develop (integration branch)
      ├── feature/feature-name
      ├── bugfix/bug-name
      └── hotfix/hotfix-name
```

### Commit Convention
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

## Environment Variables

Tạo file `.env.example` cho mỗi service và copy thành `.env` với giá trị thực tế.

## Verification Checklist

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

## Tài liệu liên quan

- [System Architecture](../07-architecture-and-data/system-architecture.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)
- [Coding Standards](../09-coding-standards/)

---

← Quay lại: [README.md](../README.md)

