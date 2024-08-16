#!/usr/bin/env python3
import cgi

# Definindo os custos por página e custo de encadernação
custo_por_pagina_preto_branco = 0.25  # em reais
custo_por_pagina_colorida = 0.50  # em reais
custo_encadernacao = 8  # em reais

# Função para calcular o custo total de impressão
def calcular_custo_impressao(qtd_paginas_preto_branco, qtd_paginas_coloridas):
    custo_total_preto_branco = qtd_paginas_preto_branco * custo_por_pagina_preto_branco
    custo_total_colorido = qtd_paginas_coloridas * custo_por_pagina_colorida
    custo_total = custo_total_preto_branco + custo_total_colorido + custo_encadernacao
    return custo_total, custo_total_preto_branco + custo_encadernacao, custo_total_colorido + custo_encadernacao

# Obtendo dados do formulário
form = cgi.FieldStorage()
qtd_paginas_preto_branco = int(form.getvalue('qtd_paginas_pb'))
qtd_paginas_coloridas = int(form.getvalue('qtd_paginas_color'))

# Calculando o custo total
custo_total, custo_p_b_encadernacao, custo_c_encadernacao = calcular_custo_impressao(qtd_paginas_preto_branco, qtd_paginas_coloridas)

# Imprimindo cabeçalho HTTP e resultados
print("Content-type:text/html\r\n\r\n")
print("<html>")
print("<head>")
print("<title>Resultado do Cálculo</title>")
print("</head>")
print("<body>")
print(f"<h2>O custo total da impressão em preto e branco é de R$ {custo_p_b_encadernacao:.2f}</h2>")
print(f"<h2>O custo total da impressão colorida é de R$ {custo_c_encadernacao:.2f}</h2>")
print("</body>")
print("</html>")
