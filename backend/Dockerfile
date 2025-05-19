FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base 
WORKDIR /app/backend

COPY ./backend/backend.csproj ./
RUN dotnet restore

COPY ./backend/. ./
EXPOSE 5000
CMD ["dotnet", "watch", "run", "--no-hot-reload", "--urls", "http://0.0.0.0:5000"]
