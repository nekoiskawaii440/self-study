import os
import requests
from bs4 import BeautifulSoup

# 保存先のディレクトリ
save_dir = "cat_images"
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 画像をスクレイピングするサイトのURL
url = "https://www.google.com/search?q=cat&sca_esv=708ca891a389fdf3&udm=2&biw=1920&bih=911&sxsrf=ADLYWIJ9Py9AnRC6ymksroYu_KJcQTRgwA%3A1726105628729&ei=HEjiZsCRLP7d2roPpd2y-Q8&ved=0ahUKEwjAj-HGpLyIAxX-rlYBHaWuLP8Q4dUDCBA&uact=5&oq=cat&gs_lp=Egxnd3Mtd2l6LXNlcnAiA2NhdDIKEAAYgAQYsQMYBDIHEAAYgAQYBDIKEAAYgAQYsQMYBDIQEAAYgAQYsQMYgwEYBBiKBTIHEAAYgAQYBDIKEAAYgAQYsQMYBDIHEAAYgAQYBDIKEAAYgAQYsQMYBDIKEAAYgAQYsQMYBDIKEAAYgAQYsQMYBEiXBVAAWLQBcAB4AJABAJgBYqABlAKqAQEzuAEDyAEA-AEBmAIDoAKfAsICDRAAGIAEGLEDGIMBGATCAgYQABgDGASYAwCSBwMyLjGgB4EJ&sclient=gws-wiz-serp"  # 猫の画像が載っているサイトに変更する

# Webページの内容を取得
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# 画像のリンクをすべて取得
limit = 5
images = soup.find_all('img', limit=limit)

# 画像をダウンロード
for idx, img in enumerate(images):
    img_url = img.get('src')
    if not img_url.startswith('http'):
        img_url = url + img_url  # 相対URLの場合に絶対URLに変換

    img_data = requests.get(img_url).content
    img_name = os.path.join(save_dir, f"cat_{idx+1}.jpg")
    
    with open(img_name, 'wb') as f:
        f.write(img_data)
        print(f"Downloaded: {img_name}")