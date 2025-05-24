# python excelToObj.py
import pandas as pd

cols = [
    {"id": "ID", "key": "id", "addId": False, "group": False, "isNum": True},
    {
        "id": "Categoria",
        "key": "categoria",
        "addId": True,
        "group": False,
        "isNum": False,
    },
    {
        "id": "Nombre",
        "key": "label",
        "addId": True,
        "group": False,
        "isNum": False,
    },
    {
        "id": "Cantidad",
        "key": "cantidad",
        "addId": False,
        "group": True,
        "isNum": True,
    },
    {
        "id": "Precio xU",
        "key": "precios_u",
        "addId": False,
        "group": True,
        "isNum": True,
    },
    {
        "id": "Subtotal",
        "key": "subtotal",
        "addId": False,
        "group": True,
        "isNum": True,
    },
    {
        "id": "Etiqueta",
        "key": "etiqueta",
        "addId": False,
        "group": True,
        "isNum": False,
    },
    {"id": "Valor", "key": "valor", "addId": False, "group": True, "isNum": False},
    {
        "id": 'Caracteristicas(separadas por ",")',
        "key": "caracteristicas",
        "addId": False,
        "group": False,
        "isNum": False,
    },
    {
        "id": "Descripcion",
        "key": "descripcion",
        "addId": False,
        "group": False,
        "isNum": False,
    },
]


def isIntNum(num):
    num_int = int(num) if num == int(num) else num
    return num_int


# Cargar Excel
df = pd.read_excel("../files/Plantilla CataLog.xlsx", skiprows=1)

# Relacion filas por ID
grupo_actual = -1
grupos = []
for i, nombre in enumerate(df["ID"]):
    if pd.notna(nombre):
        grupo_actual += 1
    grupos.append(grupo_actual)

# Añadir la columna de Relacion
df["grupo"] = grupos

# Agrupar y convertir en una lista de dicts personalizados
resultado = []
for _, grupo_df in df.groupby("grupo"):
    id = grupo_df.iloc[0]["ID"]
    id = int(id)
    fila = {}
    for col in cols:
        if col["group"]:
            replace = ""
            if col["isNum"]:
                replace = 0
            val = grupo_df[col["id"]].fillna(replace).tolist()
            if col["isNum"]:
                val = [isIntNum(x) for x in val]

        else:
            val = grupo_df.iloc[0][col["id"]]
            if col["addId"]:
                val = val + str(id)
            if col["isNum"]:
                val = isIntNum(val)
            if col["key"] == "caracteristicas":
                val = val.split(",")

        fila[col["key"]] = val
    resultado.append(fila)

for item in resultado:
    prices = {}
    for i, q in enumerate(item["cantidad"]):
        if q != 0:
            val = 0
            if item["precios_u"][i] != 0:
                val = item["precios_u"][i]
            else:
                if item["subtotal"][i] != 0:
                    val = item["subtotal"][i] / q
            prices[q] = val
    item["prices"] = prices
    del item["cantidad"]
    del item["precios_u"]
    del item["subtotal"]

    info = {}
    for i, e in enumerate(item["etiqueta"]):
        if e != "":
            val = item["valor"][i]
            if val != "":
                info[e] = val
    item["info"] = info
    del item["etiqueta"]
    del item["valor"]

    if len(item["caracteristicas"]) == 1:
        if item["caracteristicas"][0] == "Caracteristicas":
            item["caracteristicas"] = []
    if item["descripcion"] == "Descripcion":
        item["descripcion"] = ""

print(resultado)
# python excelToObj.py
