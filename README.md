## 目录结构

```
micro-marketing-h5
├── build                     # webpack相关配置
│   ├── config.js
│   ├── dev.js
│   └── prod.js
├── dist                      # 生产环境资源目录
│   ├── assets
│   ├── css
│   ├── js
│   ├── manifest.json
│   └── pages
├── package-lock.json         # npm版本锁
├── package.json
├── readme.md
└── src                       # 开发目录
    ├── assets                # 图片等资源目录
    ├── commons               # 通用资源目录
    │   ├── utils             # 通用js
    │   └── styles            # 通用scss
    └── pages                 # 入口文件及相关资源
```