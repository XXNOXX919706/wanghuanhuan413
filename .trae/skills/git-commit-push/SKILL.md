---
name: git-commit-push
description: 将当前项目提交 commit 并 push 到 GitHub 仓库 XXNOXX919706/wanghuanhuan413。当用户要求提交代码、推送到 GitHub、git push、同步代码到远程时使用。不用于拉取代码或分支管理。
---

# Git Commit & Push to GitHub

将本项目的改动提交并推送到 GitHub 仓库，使用已配置的 SSH 公钥认证。

## 目标仓库

- 仓库地址（SSH）：`git@github.com:XXNOXX919706/wanghuanhuan413.git`
- 仓库地址（HTTPS 备用）：`https://github.com/XXNOXX919706/wanghuanhuan413.git`

## 执行步骤

1. **检查 Git 仓库状态**
   ```powershell
   git --no-pager status
   ```
   - 如果提示 `not a git repository`，执行初始化：
     ```powershell
     git init
     git branch -M main
     ```

2. **配置远程仓库**
   - 检查现有远程：`git remote -v`
   - 若未设置 origin，添加 SSH 远程（使用公钥认证）：
     ```powershell
     git remote add origin git@github.com:XXNOXX919706/wanghuanhuan413.git
     ```
   - 若已设置但地址不符，更新：
     ```powershell
     git remote set-url origin git@github.com:XXNOXX919706/wanghuanhuan413.git
     ```

3. **配置用户信息**（首次提交时）
   ```powershell
   git config user.name "XXNOXX919706"
   git config user.email "你的GitHub邮箱"
   ```
   若已有配置则跳过。

4. **添加文件到暂存区**
   ```powershell
   git add .
   ```
   如需排除 `node_modules` 等，确保 `.gitignore` 已配置。

5. **创建提交**
   - 使用用户提供的 commit message；若用户未指定，使用：
     ```powershell
     git commit -m "update: 同步项目更改"
     ```
   - 如果没有改动可提交，跳过后续步骤并告知用户。

6. **推送到远程仓库**
   - 首次推送（设置上游分支）：
     ```powershell
     git push -u origin main
     ```
   - 后续推送：
     ```powershell
     git push origin main
     ```

## 注意事项

- 推送使用 SSH 协议，依赖本机已配置并添加到 GitHub 的 SSH 公钥。
- 若 push 失败提示权限问题，提示用户检查 SSH key 是否已添加到 GitHub 账户。
- 若提示 `src refspec main does not match`，先执行 `git add .` 和 `git commit` 创建至少一个提交。
- 若遇到 `node_modules` 过大，建议先创建 `.gitignore` 排除 `node_modules/`。
