import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import json


dados = pd.read_excel('Sensores2 - atualizado.xlsx')


restaurante_nomes = dados.iloc[:, 0].values  
datas = dados.iloc[:, 1].values  
X = dados.iloc[:, 4:-2].values  
y = dados.iloc[:, -1].values    


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = LinearRegression()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)


porcentagem = y_pred.mean()

if porcentagem >= 60:
    print("Nível de lixo está acima de 60%") 
else:
    print("Nível de lixo está abaixo de 60%")

data_previsao = "2024-04-03"

dados_filtrados = dados[dados["Data"] == data_previsao]
X = dados_filtrados.iloc[:, 4:-2].values  

porcentagens_por_data = model.predict(X)


restaurante_nomes = dados_filtrados.iloc[:, 0].values  


resultados = []


for i in range(len(restaurante_nomes)):
    resultado = {
        "restaurante": restaurante_nomes[i],
        "data_previsao": data_previsao,
        "porcentagem_consumo": porcentagens_por_data[i]
    }
    
    if porcentagens_por_data[i] - 100 <= 0:
        resultado["lixeiras_adicionais"] = 0
        print(f"Não são necessárias lixeiras adicionais para o {restaurante_nomes[i]} no dia {data_previsao}")
    else:
        lixeiras_adicionais = 0
        while porcentagens_por_data[i] > 100:
            lixeiras_adicionais += 1
            porcentagens_por_data[i] -= 100
        resultado["lixeiras_adicionais"] = lixeiras_adicionais
        print(f'Para o {restaurante_nomes[i]} no dia {data_previsao}, são necessárias {lixeiras_adicionais} lixeira(s) extra(s) para o lixo em excesso')
    
    
    resultados.append(resultado)


with open('resultados.json', 'w') as json_file:
    json.dump(resultados, json_file, ensure_ascii=False, indent=4)