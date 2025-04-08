import os
import requests
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # .env ファイルを読み込む

app = FastAPI()

# CORS を許可するオリジンを設定
origins = [
    "http://localhost:3000",  # React アプリケーションの URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],  # 許可する HTTP メソッド
    allow_headers=["*"],  # 許可するヘッダー
)
@app.get("/weather")
def get_weather(city: str = "Tokyo"):
    api_key = os.getenv("API_KEY")  # 環境変数からAPIキーを取得
    if not api_key:
        return {"error": "API Key not found."}
    
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    return response.json()