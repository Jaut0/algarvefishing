@echo off
REM FishingHub - Script de Deploy para Vercel (Windows)

echo.
echo ========================================
echo    FishingHub Algarve - Deploy Script
echo ========================================
echo.

REM Verificar se Git está instalado
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Git nao esta instalado!
    echo        Instale em: https://git-scm.com
    pause
    exit /b 1
)

echo [OK] Git instalado
echo.

REM Verificar se está num repositório Git
if not exist .git (
    echo [INFO] Inicializando repositorio Git...
    git init
    echo [OK] Git inicializado
    echo.
)

REM Adicionar todos os ficheiros
echo [INFO] Adicionando ficheiros...
git add .
echo [OK] Ficheiros adicionados
echo.

REM Fazer commit
echo [INFO] Fazendo commit...
set /p commit_msg="Mensagem do commit (Enter para padrao): "
if "%commit_msg%"=="" set commit_msg=Update %date% %time%
git commit -m "%commit_msg%"
echo [OK] Commit realizado
echo.

REM Verificar se remote origin existe
git remote | findstr origin >nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Adicionar remote do GitHub...
    set /p repo_url="Cole a URL do repositorio GitHub: "
    git remote add origin !repo_url!
    echo [OK] Remote adicionado
    echo.
)

REM Criar/verificar branch main
git branch -M main

REM Push para GitHub
echo [INFO] Enviando para GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCESSO] Deploy concluido!
    echo ========================================
    echo.
    echo Proximos passos:
    echo   1. Ir para: https://vercel.com
    echo   2. Clicar 'Import Project'
    echo   3. Selecionar: fishinghub-algarve
    echo   4. Deploy automatico!
    echo.
) else (
    echo.
    echo [ERRO] Falha ao enviar para GitHub
    echo        Verifique suas credenciais
    echo.
)

pause
