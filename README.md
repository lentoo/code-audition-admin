# 码上面试后台管理系统

![](https://img.shields.io/badge/license-MIT-0.svg)
![](https://img.shields.io/badge/download-2M-0.svg)
![](https://img.shields.io/badge/language-zh-0.svg)
![](https://img.shields.io/badge/platform-win/mac-0.svg)
![](https://img.shields.io/badge/node@latest->6.0.0-0.svg)

## 1. 代码提交规范
### 1. 提交新功能
1. 从 master 分支中创建一个新分支，分支名称跟功能名称相关
2. 开发完成后 `commit` 代码， `merge` 到 `develop` 分支
3. 使用 `develop` 分支代码编译发布体验版
4. 测试通过后，提交自己分支到远程仓库，发起 `pull request` 请求合并到 `master` 分支

### 2. 使用 npm run commit / yarn commit 命令 提交代码
``` bash
# 例如：
git add .
npm run commit
```

### 3. 提交信息规范
``` md
feat：新功能
fix：修补 bug
docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
style： 不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
refactor：重构（既不修复错误也不添加功能）
perf: 优化相关，比如提升性能、体验
test：增加测试，包括单元测试、集成测试等
build: 构建系统或外部依赖项的更改
ci：自动化流程配置或脚本修改
chore: 非 src 和 test 的修改
revert: 恢复先前的提交
```

## 登陆
后台系统登陆需要到小程序端扫一扫进行登陆


## [更新日志](https://github.com/lentoo/code-audition-admin/blob/master/CHANGELOG.md)
