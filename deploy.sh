#!/bin/bash

# 🎣 FishingHub - Script de Deploy para Vercel
# Execute este script para fazer deploy automático

echo "🎣 FishingHub Algarve - Deploy Script"
echo "======================================"
echo ""

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado!"
    echo "   Instale em: https://git-scm.com"
    exit 1
fi

echo "✅ Git instalado"

# Verificar se está num repositório Git
if [ ! -d .git ]; then
    echo ""
    echo "📦 Inicializando repositório Git..."
    git init
    echo "✅ Git inicializado"
fi

# Adicionar todos os ficheiros
echo ""
echo "📁 Adicionando ficheiros..."
git add .

# Verificar se há alterações
if git diff --staged --quiet; then
    echo "ℹ️  Nenhuma alteração para fazer commit"
else
    # Fazer commit
    echo ""
    echo "💾 Fazendo commit..."
    read -p "Mensagem do commit (Enter para usar padrão): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_msg"
    echo "✅ Commit realizado: $commit_msg"
fi

# Verificar se remote origin existe
if ! git remote | grep -q origin; then
    echo ""
    echo "🔗 Adicionar remote do GitHub..."
    read -p "Cole a URL do repositório GitHub: " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote adicionado"
fi

# Verificar branch
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
    echo ""
    echo "🌿 Criando branch main..."
    git branch -M main
    current_branch="main"
fi

# Push para GitHub
echo ""
echo "🚀 Enviando para GitHub..."
git push -u origin $current_branch

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy concluído com sucesso!"
    echo ""
    echo "📋 Próximos passos:"
    echo "   1. Ir para: https://vercel.com"
    echo "   2. Clicar 'Import Project'"
    echo "   3. Selecionar repositório: fishinghub-algarve"
    echo "   4. Deploy automático!"
    echo ""
else
    echo ""
    echo "❌ Erro ao enviar para GitHub"
    echo "   Verifique suas credenciais"
fi
