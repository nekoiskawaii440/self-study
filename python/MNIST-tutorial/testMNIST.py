import torch
import torchvision
import torchvision.transforms as transforms
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# データの前処理（正規化など）
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])

# MNISTデータセットを取得
trainset = torchvision.datasets.MNIST(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True)

# 画像を表示（最初の1枚）
images, labels = next(iter(trainloader))
plt.imshow(images[0].squeeze(), cmap='gray')
plt.title(f"Label: {labels[0].item()}")
plt.show()

# シンプルなニューラルネットワーク
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(28 * 28, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        return self.fc(x)

# モデル・損失関数・最適化手法の設定
model = SimpleNN()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 学習ループ
epochs = 5
for epoch in range(epochs):
    for images, labels in trainloader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    
    print(f"Epoch {epoch+1}/{epochs}, Loss: {loss.item():.4f}")

print("学習完了！")

# テストデータの読み込み
testset = torchvision.datasets.MNIST(root='./data', train=False, download=True, transform=transform)
testloader = torch.utils.data.DataLoader(testset, batch_size=1000, shuffle=False)

# モデルの評価モード
model.eval()

# 正解数カウント
correct = 0
total = 0

with torch.no_grad():  # 勾配計算を無効化（評価時は不要）
    for images, labels in testloader:
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)  # 最も確率が高いクラスを取得
        total += labels.size(0)  # ラベルの数をカウント
        correct += (predicted == labels).sum().item()  # 正解数をカウント

# 精度を表示
accuracy = 100 * correct / total
print(f"テストデータの精度: {accuracy:.2f}%")
