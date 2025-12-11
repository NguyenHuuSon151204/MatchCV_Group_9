@echo off
echo Resolving merge conflicts...
echo.

git config core.pager ""

git checkout --ours matchCV_Project\matchCV_Project.csproj
git add matchCV_Project\matchCV_Project.csproj
echo Resolved: matchCV_Project.csproj

git checkout --ours matchCV_Project\Services\Scoring\ScoringEngine.cs
git add matchCV_Project\Services\Scoring\ScoringEngine.cs
echo Resolved: ScoringEngine.cs

git checkout --ours matchCV_Project\Services\JobService.cs
git add matchCV_Project\Services\JobService.cs

git checkout --ours matchCV_Project\Services\EmailService.cs
git add matchCV_Project\Services\EmailService.cs

git checkout --ours matchCV_Project\Services\DocumentService.cs
git add matchCV_Project\Services\DocumentService.cs

git checkout --ours matchCV_Project\Services\AnalyzerService.cs
git add matchCV_Project\Services\AnalyzerService.cs

git checkout --ours matchCV_Project\Repositories\JobRepository.cs
git add matchCV_Project\Repositories\JobRepository.cs

git checkout --ours matchCV_Project\MatchCV.sql
git add matchCV_Project\MatchCV.sql

git checkout --ours matchCV_Project\Interfaces\IAnalyzerService.cs
git add matchCV_Project\Interfaces\IAnalyzerService.cs

git checkout --ours matchCV_Project\Models\User.cs
git add matchCV_Project\Models\User.cs

git checkout --ours matchCV_Project\Data\MatchCvContext.cs
git add matchCV_Project\Data\MatchCvContext.cs

git checkout --ours matchCV_Project\Models\LicenseKey.cs
git add matchCV_Project\Models\LicenseKey.cs

git checkout --ours matchCV_Project\Models\Document.cs
git add matchCV_Project\Models\Document.cs

git checkout --ours matchCV_Project\Controllers\JobController.cs
git add matchCV_Project\Controllers\JobController.cs

git checkout --ours matchCV_Project\Controllers\AnalyzerController.cs
git add matchCV_Project\Controllers\AnalyzerController.cs

git checkout --ours matchCV_Project\Controllers\AccountController.cs
git add matchCV_Project\Controllers\AccountController.cs

git checkout --ours frontend\lib\services\job-service.ts
git add frontend\lib\services\job-service.ts

git checkout --ours frontend\lib\services\cv-service.ts
git add frontend\lib\services\cv-service.ts

git checkout --ours frontend\lib\services\api-client.ts
git add frontend\lib\services\api-client.ts

git checkout --ours frontend\lib\services\ai-service.ts
git add frontend\lib\services\ai-service.ts

git checkout --ours frontend\routes\app-router.tsx
git add frontend\routes\app-router.tsx

git checkout --ours frontend\next.config.js
git add frontend\next.config.js

git checkout --ours frontend\hooks\useCV.ts
git add frontend\hooks\useCV.ts

git checkout --ours frontend\hooks\useAnalyze.ts
git add frontend\hooks\useAnalyze.ts

git checkout --ours frontend\features\candidate\settings\settings-page.tsx
git add frontend\features\candidate\settings\settings-page.tsx

git checkout --ours frontend\features\candidate\my-cvs\my-cvs-page.tsx
git add frontend\features\candidate\my-cvs\my-cvs-page.tsx

git checkout --ours frontend\features\candidate\my-cvs\create-cv-dialog.tsx
git add frontend\features\candidate\my-cvs\create-cv-dialog.tsx

git checkout --ours frontend\features\candidate\jobs\job-search-page.tsx
git add frontend\features\candidate\jobs\job-search-page.tsx

git checkout --ours frontend\features\candidate\jobs\job-details-page.tsx
git add frontend\features\candidate\jobs\job-details-page.tsx

git checkout --ours frontend\components\layout\topbar.tsx
git add frontend\components\layout\topbar.tsx

git checkout --ours frontend\components\layout\sidebar.tsx
git add frontend\components\layout\sidebar.tsx

git checkout --ours frontend\components\common\cv-card.tsx
git add frontend\components\common\cv-card.tsx

git checkout --ours frontend\features\candidate\jd-analyzer\jd-analyzer-page.tsx
git add frontend\features\candidate\jd-analyzer\jd-analyzer-page.tsx

git checkout --ours frontend\features\candidate\dashboard\dashboard-page.tsx
git add frontend\features\candidate\dashboard\dashboard-page.tsx

git checkout --ours frontend\features\candidate\ai-rewrite\ai-rewrite-page.tsx
git add frontend\features\candidate\ai-rewrite\ai-rewrite-page.tsx

git checkout --ours frontend\components\common\apply-cv-dialog.tsx
git add frontend\components\common\apply-cv-dialog.tsx

git checkout --ours frontend\components\common\analyze-jd-dialog.tsx
git add frontend\components\common\analyze-jd-dialog.tsx

git checkout --ours frontend\components\common\activity-list.tsx
git add frontend\components\common\activity-list.tsx

git checkout --ours frontend\components\auth\ProtectedRoute.tsx
git add frontend\components\auth\ProtectedRoute.tsx

git checkout --ours frontend\components\auth\Profile.tsx
git add frontend\components\auth\Profile.tsx

git checkout --ours frontend\components\auth\Login.tsx
git add frontend\components\auth\Login.tsx

git checkout --ours frontend\components\auth\GoogleSuccess.tsx
git add frontend\components\auth\GoogleSuccess.tsx

git checkout --ours frontend\components\auth\ChooseRole.tsx
git add frontend\components\auth\ChooseRole.tsx

git checkout --ours frontend\app\app\[[...slug]]\page.tsx
git add frontend\app\app\[[...slug]]\page.tsx

git checkout --ours ..\README.md
git add ..\README.md

git checkout --ours matchCV_Project\.gitignore
git add matchCV_Project\.gitignore

echo.
echo All conflicts resolved!
echo Now run: git commit -m "Merge develop - resolved conflicts"

