---
name: git-push-github
description: 将当前项目使用 git commit 并 push 到 GitHub 仓库。当用户要求提交项目、推送代码到 GitHub、或同步到远程仓库时使用。不适用于 Gitee 或其他 Git 托管平台。
---

# Git Push GitHub

将当前工作区的变更提交并推送到 GitHub 远程仓库，使用已配置的 SSH 公钥认证。

## 仓库信息

- **仓库地址**: `https://github.com/XXNOXX919706/wanghuanhuan413`
- **SSH 推送地址**: `git@github.com:XXNOXX919706/wanghuanhuan413.git`
- **认证方式**: SSH 公钥（已配置于 `~/.ssh/id_ed25519`）

## 执行步骤

### 1. 检查 Git 状态

```powershell
git --no-pager status
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

### 4. 推送到 GitHub

检查是否已配置远程仓库：

```powershell
git remote -v
```

- 若远程未配置，添加 GitHub 远程：
  ```powershell
  git remote add origin git@github.com:XXNOXX919706/wanghuanhuan413.git
  ```

- 若远程已存在但地址非 GitHub，更新为 GitHub：
  ```powershell
  git remote set-url origin git@github.com:XXNOXX919706/wanghuanhuan413.git
  ```

- 推送：
  ```powershell
  git push origin master
  ```
  （如主分支为 `main`，则 `git push origin main`）

- 若推送被拒绝（远程有本地没有的提交），先拉取合并不相关历史再推送：
  ```powershell
  git pull origin master --allow-unrelated-histories --no-edit
  git push origin master
  ```

- 若推送时提示需要设置上游分支：
  ```powershell
  git push -u origin master
  ```

## 注意事项

- 使用 SSH 公钥认证，无需输入密码。
- 推送前确保已暂存并提交所有需要同步的文件。
- 若遇到冲突，先拉取远程变更并解决冲突后再推送。
- 提交信息应简洁清晰，描述本次变更的内容。
- Windows PowerShell 环境下，git 命令可直接执行。
