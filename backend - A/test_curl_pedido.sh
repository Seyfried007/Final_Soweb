#!/bin/bash

# Reemplaza TOKEN_AQUI con tu token JWT válido
TOKEN="TOKEN_AQUI"

# URL base del backend
BASE_URL="http://localhost:8080"

# Prueba GET /pedido/listar
echo "Probando GET /pedido/listar"
curl -i -X GET "$BASE_URL/pedido/listar" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json"

# Prueba POST /pedido/crear con un ejemplo de pedido
echo -e "\nProbando POST /pedido/crear"
curl -i -X POST "$BASE_URL/pedido/crear" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "codTransaccion": "TX123456",
    "isos": ["ISO9001", "ISO14001"]
  }'
