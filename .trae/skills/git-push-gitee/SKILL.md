---
name: git-push-gitee
description: 将当前项目使用 git commit 并 push 到 Gitee 仓库。当用户要求提交项目、推送代码到 Gitee、或同步到远程仓库时使用。不适用于 GitHub 或其他 Git 托管平台。
---

# Git Push Gitee

将当前工作区的变更提交并推送到 Gitee 远程仓库。

## 凭据

- **Gitee 私人令牌**: `5fd1d519f8fdf3a23356678dd23b555d`
- **仓库地址**: `https://gitee.com/neusoft_wangyao_jsj/xxnoxx.git`
- **带令牌的推送 URL**: `https://5fd1d519f8fdf3a23356678dd23b555d@gitee.com/neusoft_wangyao_jsj/xxnoxx.git`

## 执行步骤

### 1. 检查 Git 状态

```powershell
git status
```

确认有需要提交的变更。如果没有变更，告知用户工作区干净，无需提交。

### 2. 暂存变更

```powershell
git add .
```

### 3. 提交

询问用户提交信息（commit message），若用户未指定则使用默认信息：

```powershell
git commit -m "更新项目文件"
```

### 4. 推送到 Gitee

检查是否已配置远程仓库：

```powershell
git remote -v
```

- 若已存在 `origin` 且地址正确，直接推送：
  ```powershell
  git push origin master
  ```
  （如主分支为 `main`，则 `git push origin main`）

- 若远程未配置或地址错误，使用带令牌的 URL 设置远程并推送：
  ```powershell
  git remote set-url origin https://5fd1d519f8fdf3a23356678dd23b555d@gitee.com/neusoft_wangyao_jsj/xxnoxx.git
  git push origin master
  ```

- 若推送时提示需要设置上游分支：
  ```powershell
  git push -u origin master
  ```

## 注意事项

- 令牌具有仓库读写权限，切勿在公开场合泄露。
- 推送前确保已暂存并提交所有需要同步的文件。
- 若遇到冲突，先拉取远程变更并解决冲突后再推送。
- 提交信息应简洁清晰，描述本次变更的内容。
- Windows PowerShell 环境下，git 命令可直接执行，无需特殊前缀。
