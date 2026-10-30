---
name: git-push-github
description: 将当前项目使用 git commit 并 push 到 GitHub 仓库。当用户要求提交项目、推送代码到 GitHub、或同步到远程仓库时使用。不适用于 Gitee 或其他 Git 托管平台。
---

# Git Push GitHub

将当前工作区的变更提交并推送到 GitHub 远程仓库。优先使用 SSH 公钥认证，若 SSH 不可用则回退到 HTTPS + 个人访问令牌。

## 仓库信息

- **仓库地址**: `https://github.com/XXNOXX919706/wanghuanhuan413`
- **SSH 推送地址**: `git@github.com:XXNOXX919706/wanghuanhuan413.git`
- **HTTPS 推送地址**: `https://github.com/XXNOXX919706/wanghuanhuan413.git`
- **SSH 公钥**: `~/.ssh/id_ed25519`（已生成）
- **GitHub 个人访问令牌**: 待用户提供

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

### 4. 配置远程仓库

```powershell
git remote -v
```

- 若远程未配置，添加 GitHub 远程（优先 SSH）：
  ```powershell
  git remote add github git@github.com:XXNOXX919706/wanghuanhuan413.git
  ```

- 若远程已存在但地址非 GitHub，更新为 GitHub：
  ```powershell
  git remote set-url github git@github.com:XXNOXX919706/wanghuanhuan413.git
  ```

### 5. 测试 SSH 连接并推送

先测试 SSH 是否可用（中国大陆网络通常需使用 443 端口）：

```powershell
ssh -T -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new git@github.com 2>&1
```

#### 情况 A：SSH 连接成功

直接推送：

```powershell
git push github master
```
（如主分支为 `main`，则 `git push github main`）

#### 情况 B：SSH 连接失败（端口 22 被封或超时）

配置 SSH 使用 443 端口，写入 `~/.ssh/config`：

```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519
```

然后再次测试连接并推送。若 443 端口也超时，则进入情况 C。

#### 情况 C：SSH 完全不可用，使用 HTTPS + 令牌

将远程地址改为 HTTPS，使用个人访问令牌认证：

```powershell
git remote set-url github https://<用户名>:<令牌>@github.com/XXNOXX919706/wanghuanhuan413.git
git push github master
```

> 令牌获取：GitHub → Settings → Developer settings → Personal access tokens → Generate new token，勾选 `repo` 权限。

### 6. 处理推送冲突

- 若推送被拒绝（远程有本地没有的提交），先拉取合并：
  ```powershell
  git pull github master --allow-unrelated-histories --no-edit
  git push github master
  ```

- 若推送时提示需要设置上游分支：
  ```powershell
  git push -u github master
  ```

## 注意事项

- 优先使用 SSH 公钥认证，无需输入密码。
- 中国大陆网络环境下 SSH 22 端口常被封锁，需配置 443 端口。
- 若 SSH 完全不可用，需用户提供 GitHub 个人访问令牌，使用 HTTPS 方式推送。
- 推送前确保已暂存并提交所有需要同步的文件。
- 若遇到冲突，先拉取远程变更并解决冲突后再推送。
- 提交信息应简洁清晰，描述本次变更的内容。
- 令牌具有仓库读写权限，切勿在公开场合泄露。
