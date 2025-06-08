# Data Visualization Platform

A full-stack web application for managing and visualizing statistical data including population, interest rates, and housing market data.

## 🚀 Features

### Data Management
- **Population Data**: Manage city population statistics by year
- **Interest Rates**: Track various types of interest rates over time
- **Housing Market Data**: Monitor flat prices per square meter by city and quarter
- **CRUD Operations**: Create, read, update, and delete records with form validation
- **Data Export**: Export datasets to XML and JSON formats
- **Advanced Filtering**: Filter data by various criteria (city, year, quarter, etc.)

### Data Visualization
- **Multiple Chart Types**: Line charts, bar charts, pie charts, scatter plots
- **Time Series Charts**: Specialized charts for interest rates over time
- **Multi-Axis Charts**: Compare different data types on the same chart
- **Scatter Plot Analysis**: Analyze correlations between different datasets
- **Interactive Charts**: Powered by Chart.js with responsive design
- **Logarithmic Scaling**: Optional logarithmic scale for better data comparison

### User Management
- **Authentication System**: Secure login and registration
- **Role-Based Access**: Admin and regular user roles
- **Protected Routes**: Secure access to admin functionalities
- **Session Management**: Persistent login sessions with cookies

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Chart.js** with react-chartjs-2 for data visualization
- **React Router** for navigation
- **Axios** for HTTP requests
- **CSS3** for styling

### Backend
- **.NET 8** Web API
- **Entity Framework Core** for database operations
- **PostgreSQL** database
- **Cookie Authentication** for session management
- **AutoMapper** for DTO mapping
- **CORS** enabled for frontend integration

### Infrastructure
- **Docker & Docker Compose** for containerization
- **PostgreSQL** database with persistent volumes
- **pgAdmin** for database administration
- **Hot reload** enabled for development

## 📋 Prerequisites

- **Docker** and **Docker Compose** installed
- **Git** for version control
- At least **4GB RAM** available for containers

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd projektIntegracja
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=dataintegration

# pgAdmin Configuration
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123

# Frontend Development
CHOKIDAR_USEPOLLING=true
WDS_SOCKET_PORT=24678
VITE_HMR_PORT=24678
```

### 3. Start the Application
```bash
# Start all services
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **pgAdmin**: http://localhost:5050
- **Database**: localhost:5432

### 5. Default Admin Account
The system creates a default admin account:
- **Email**: `admin@admin.com`
- **Password**: `admin`

## 📊 Using the Application

### 1. Authentication
- Register a new account or use the default admin credentials
- Login to access the dashboard and data management features

### 2. Data Management
- Navigate to **Datasets** to view and manage data
- Use the dataset selector to switch between:
  - Population data
  - Interest rates
  - Housing market data
- **Admins** can add, edit, and delete records
- **Regular users** can view and export data

### 3. Data Visualization
- Go to **Charts** to create visualizations
- Select datasets and chart types:
  - **Line Chart**: Trends over time
  - **Bar Chart**: Comparative analysis
  - **Pie Chart**: Proportional data
  - **Scatter Plot**: Correlation analysis
  - **Multi-Axis**: Compare different data types
  - **Time Series**: Interest rates with full date precision
- Configure chart options (logarithmic scale, etc.)
- Generate and interact with charts

### 4. Data Export
- In the Datasets section, specify a filename
- Choose export format (XML or JSON)
- Download the exported file

## 🔧 Development

### Running in Development Mode
```bash
# Start with development configuration
docker-compose up

# Frontend will be available with hot reload at localhost:5173
# Backend will restart on code changes
```

### Database Management
```bash
# Access pgAdmin at localhost:5050
# Default credentials: admin@example.com / admin123

# Connect to database with:
# Host: postgres
# Port: 5432
# Database: dataintegration
# Username: admin
# Password: admin123
```

### Project Structure
```
projektIntegracja/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── data/           # Data management pages
│   │   ├── charts/         # Chart visualization
│   │   └── user/           # Authentication pages
├── backend/                 # .NET Web API backend
│   ├── Controllers/        # API endpoints
│   ├── Models/            # Database entities
│   ├── Services/          # Business logic
│   ├── Data/              # Database context
│   └── DataFiles/         # Sample CSV data
├── compose.yaml            # Docker Compose configuration
└── README.md              # This file
```

## 🗃 Database Schema

### Tables
- **Users**: User accounts and roles
- **Cities**: City master data
- **Population**: Population statistics by city and year
- **InterestRates**: Interest rate data with types and dates
- **MeterData**: Housing price data by city, year, and quarter
- **TypeOfInterestRate**: Interest rate type definitions
- **Roles**: User role definitions

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user info

### Data Management
- `GET /api/population` - Get population data
- `POST /api/population` - Create population record
- `PUT /api/population/{id}` - Update population record
- `DELETE /api/population/{id}` - Delete population record

- `GET /api/interest-rates` - Get interest rates
- `POST /api/interest-rates` - Create interest rate record
- `PUT /api/interest-rates/{id}` - Update interest rate record
- `DELETE /api/interest-rates/{id}` - Delete interest rate record

- `GET /api/flat-prices` - Get housing data
- `POST /api/flat-prices` - Create housing record
- `PUT /api/flat-prices/{id}` - Update housing record
- `DELETE /api/flat-prices/{id}` - Delete housing record

### Export
- `GET /api/export/file` - Export to XML
- `GET /api/exportjson/file` - Export to JSON

## 🔍 Filtering Options

### Population Data
- City name
- Year range
- Population size range

### Interest Rates
- Date range
- Interest rate type (REF, LOM, RED)
- Rate value range

### Housing Data
- City name
- Year range
- Quarter (1-4)
- Price range
- Secondary market filter
- Realistic data filter

## 📈 Chart Configuration

### Supported Chart Types
1. **Line Chart**: Best for showing trends over time
2. **Bar Chart**: Ideal for comparing values across categories
3. **Pie Chart**: Perfect for showing proportional data
4. **Scatter Plot**: Excellent for correlation analysis
5. **Multi-Axis Chart**: Compare different data types with different scales
6. **Time Series**: Specialized for interest rates with precise dates

### Chart Features
- Responsive design for all screen sizes
- Dark theme with customizable colors
- Interactive tooltips and legends
- Logarithmic scale option for better data comparison
- Export chart as image (via browser)

## 🛡 Security Features

- Password hashing with secure algorithms
- Cookie-based authentication with HTTP-only cookies
- CORS configuration for frontend-backend communication
- Role-based access control
- SQL injection protection via Entity Framework
- Input validation on both frontend and backend

## 🚨 Troubleshooting

### Common Issues

#### Containers won't start
```bash
# Check Docker status
docker-compose ps

# View logs
doCheck if PostgreSQL is running
docker-compose exec postgres pg_isready

# Reset database
docker-compose down -v
docker-compose up -d
```

#### Frontend not loading
```bash
# Check if port 5173 is available
lsof -i :5173

# Rebuild frontend container
docker-compose build frontend
docker-compose up -d frontend
```

#### Backend API errors
```bash
# Check backend logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend dotnet ef database update
```cker-compose logs

# Restart services
docker-compose restart
```

#### Database connection issues
```bash
# Check if PostgreSQL is running
docker-compose exec postgres pg_isready

# Reset database
docker-compose down -v
docker-compose up -d
```

#### Frontend not loading
```bash
# Check if port 5173 is available
lsof -i :5173

# Rebuild frontend container
docker-compose build frontend
docker-compose up -d frontend
```

#### Backend API errors
```bash
# Check backend logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend dotnet ef database update
```


## 👥 Authors

- **Maria** - https://github.com/MariaBrodowska
- **Mateusz** - https://github.com/MateuszBrankiewicz
- **Adam** - https://github.com/ThePowerOf76

