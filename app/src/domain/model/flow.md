```mermeid
graph TD

%% Entities
U["👤 ユーザー（購入者・クリエイター）"]
C["🎨 コンテンツ（販売データ）"]
O["🧾 注文（Order）"]
P["💰 決済（Payment）"]
W["🏦 ウォレット（Wallet）"]
D["📦 ダウンロードリンク（Delivery）"]
S["☁️ プラットフォーム基盤（Firebase / Blockchain）"]

%% Relationships
U -->|投稿・管理| C
U -->|購入| O
O -->|支払い情報| P
P -->|送金・着金| W
O -->|配信権限発行| D
D -->|ダウンロード提供| U
C -->|配信対象| D
P -->|取引記録・検証| S
S -->|認証・保存| U
S -->|ストレージ管理| C

%% Styling
classDef core fill:#F2F2F2,stroke:#555,stroke-width:1px;
classDef actor fill:#E5F6FF,stroke:#007ACC,stroke-width:1px;
classDef process fill:#FFF3E0,stroke:#FF9800,stroke-width:1px;
classDef data fill:#E8F5E9,stroke:#388E3C,stroke-width:1px;

class U,W actor;
class C,O,P,D data;
class S process;


```
