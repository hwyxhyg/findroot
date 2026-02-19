# 寻根 · 归处 - 部署说明

## 文件结构
```
xungen-vercel/
├── api/
│   └── chat.js          # 后端，转发请求到扣子API
├── public/
│   └── index.html       # 前端界面
└── vercel.json          # Vercel配置
```

## 部署步骤

### 第一步：推送到GitHub
把整个 xungen-vercel 文件夹推送到你的GitHub仓库

### 第二步：在Vercel部署
1. 去 vercel.com，用GitHub登录
2. 点 "New Project"
3. 选择你的仓库
4. 点 "Deploy"

### 第三步：设置环境变量（重要！）
部署完成后：
1. 进入项目设置 → Environment Variables
2. 添加一个变量：
   - Name: `COZE_TOKEN`
   - Value: 你的扣子个人访问令牌
3. 保存后点 "Redeploy"

完成！Vercel会给你一个 https://xxx.vercel.app 的链接
