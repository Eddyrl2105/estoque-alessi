#!/bin/bash

# Script para subir o projeto estoque-alessi no GitHub (branch master)

# Cria README (caso não exista)
echo "# estoque-alessi" > README.md

# Inicia repositório Git
git init

# Adiciona todos os arquivos do projeto
git add .

# Commit inicial
git commit -m "first commit"

# Define a branch como master
git branch -M master

# Adiciona repositório remoto
git remote add origin https://github.com/Eddyrl2105/estoque-alessi.git

# Faz push para a branch master
git push -u origin master

echo "✅ Projeto enviado com sucesso para: https://github.com/Eddyrl2105/estoque-alessi (branch master)"
