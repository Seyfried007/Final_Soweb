@echo off
cd /d s:\Angular\soweb_frontend
start cmd /k "ng serve"
start cmd /k "cd src\app\Pages\Panel && npm run dev"
