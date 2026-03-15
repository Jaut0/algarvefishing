@echo off
echo ============================================
echo  DEPLOY AUTOMATICO - ALGARVEFISHING
echo ============================================
echo.

cd /d C:\Users\servi\Desktop\algarvefishing

echo [1/3] Adicionando ficheiros...
git add .

echo.
echo [2/3] Criando commit...
git commit -m "FIX DEFINITIVO: Registo funcional"

echo.
echo [3/3] Enviando para GitHub...
git push

echo.
echo ============================================
echo  DEPLOY CONCLUIDO!
echo  Aguarde 2-3 minutos e teste:
echo  https://algarvefishing.vercel.app/auth.html
echo ============================================
echo.
pause
