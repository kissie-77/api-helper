# wenhuichen-api-helper

> 跨工具的 AI 编程助手配置管家：一条命令在 Claude Code / OpenCode 之间统一管理 API Key、模型预设和多 Profile 配置。

[![npm version](https://img.shields.io/npm/v/wenhuichen-api-helper.svg)](https://www.npmjs.com/package/wenhuichen-api-helper)
[![Node](https://img.shields.io/node/v/wenhuichen-api-helper.svg)](https://nodejs.org)

CLI 名：`chelper`（也可用 `api-helper`）。

---

## 特性

- **多 Profile**：work / personal / staging 各自独立的 api_key / base_url / 模型组合
- **加密密钥存储**：`~/.chelper/secrets.enc`（AES-256-GCM + scrypt，绑定 username:hostname，权限 `0o600`）
- **预设（Preset）**：保存任意模型组合，一键切换
- **配置备份**：手动 + 自动滚动备份，附带加密快照，支持还原
- **多工具集成**：一键把当前 profile 的配置注入 Claude Code / OpenCode
- **CI 友好**：所有命令支持 `--json` / `--non-interactive` / `--yes` / `--dry-run` / `--no-color`
- **可观测**：每日轮转日志、`bench` 端点延时基准、`update` npm 版本检查、`doctor` 健康巡检
- **i18n**：中英双语（`zh_CN` / `en_US`），随系统 locale 自动选择

---

## 安装

```bash
npm install -g wenhuichen-api-helper
# 或
pnpm add -g wenhuichen-api-helper
```

需要 **Node.js >= 20**。

验证：

```bash
chelper --version
```

---

## 快速开始

```bash
# 交互式初始化（语言、API Key、模型预设、目标工具）
chelper init

# 或非交互直接写入
chelper auth sk-xxx --non-interactive
chelper config claude-code --non-interactive
```

查看当前状态：

```bash
chelper status
chelper status --json   # 机器可读
```

---

## 命令一览

### 认证 / 状态

| 命令 | 说明 |
|---|---|
| `chelper init` | 首次设置向导（语言、API Key、模型、工具） |
| `chelper auth <token>` | 设置 API Key 并落到加密存储 |
| `chelper auth revoke` | 撤销当前 profile 的 key（会同步清理 yaml 与 secrets.enc） |
| `chelper auth reload <claude\|claude-code\|opencode>` | 把当前 profile 配置重灌进目标工具 |
| `chelper status` | 显示当前 profile / models / tools / 指纹 |
| `chelper doctor` | 健康巡检（API Key 有效性、工具安装、配置加载） |

### Profile / Preset / Backup

```bash
# Profile
chelper config profile list
chelper config profile create work
chelper config profile use work
chelper config profile delete work          # 支持 --dry-run / --yes

# Preset（保存当前模型组合，跨 profile 复用）
chelper config preset list
chelper config preset save fast
chelper config preset use fast
chelper config preset delete fast

# Backup（含加密 secrets 快照）
chelper config backup create initial
chelper config backup list
chelper config backup restore <name>        # 支持 --dry-run / --yes
```

### 工具集成

```bash
chelper config claude-code
chelper config opencode
chelper config claude-code --non-interactive   # CI 模式：直接注入当前配置
```

### 运维

| 命令 | 说明 |
|---|---|
| `chelper logs path` | 打印日志目录 |
| `chelper logs list` | 列出所有日志文件 |
| `chelper logs tail [file]` | 输出最近内容（默认最新一天，UTF-8 安全截断） |
| `chelper bench [--samples N]` | API 端点延时基准（命中 `/v1/models`） |
| `chelper update` | 检查 npm 上是否有新版（语义化比对，支持预发布版本） |

### 开发者

```bash
chelper completion bash    # 输出补全脚本（zsh / fish 同理）
chelper enter              # 交互式主菜单
```

---

## 全局旗标

| 旗标 | 作用 |
|---|---|
| `--base <url>` 或 `--base=<url>` | 临时覆盖 API base URL（不持久化） |
| `--non-interactive` | 关闭交互提示（CI 模式） |
| `--json` | 命令输出机器可读 JSON |
| `--yes` / `-y` | 自动确认带默认动作的提示 |
| `--dry-run` | 仅预演变更，不写入；输出 `dry_run` 事件 |
| `--no-color` | 禁用彩色输出（也尊重 `NO_COLOR` / `FORCE_COLOR=0`） |

`--dry-run` 已接入：`config profile delete`、`config backup restore`。

---

## 配置位置

- **配置文件**：`~/.chelper/config.yaml`
- **加密密钥**：`~/.chelper/secrets.enc`（AES-256-GCM）
- **备份**：`~/.chelper/backups/*.yaml` + `*.secrets.enc` 伴随文件
- **日志**：`~/.chelper/<YYYY-MM-DD>.log`（按天滚动，14 天清理）

可通过环境变量重定向：

- `CHELPER_CONFIG_DIR`：完全自定义配置目录
- `CHELPER_TEST_HOME`：将 `~/.chelper` 视作 `<TEST_HOME>/.chelper`（多用于测试）
- `NO_COLOR` / `FORCE_COLOR=0`：关闭彩色输出

---

## 配置文件结构

```yaml
lang: zh_CN
active_profile: default
profiles:
  default:
    base_url: https://api.wenhuichen.cn
    models:
      haiku: claude-haiku-4-5-20251001
      sonnet: claude-sonnet-4-6
      opus: claude-opus-4-6
      reasoning: claude-opus-4-6
  work:
    base_url: https://api.example.com
    models: { ... }
presets:
  fast:
    models: { ... }
    updated_at: 2026-04-27T03:00:00.000Z
```

**API Key 不会以明文落入 yaml**，只通过 `secrets.enc` 加密存储；首次读取到含内联 `api_key` 的旧 yaml 时会自动迁出。

---

## 自动化 / CI

所有命令支持 `--json --non-interactive`，输出便于解析：

```bash
chelper status --json
# {
#   "api_key_set": true,
#   "api_key_fingerprint": "a3b1...e4",
#   "base_url": "https://api.wenhuichen.cn",
#   "language": "zh_CN",
#   "models": { ... },
#   "tools": [ ... ],
#   "active_profile": "default",
#   "profiles": ["default"],
#   "custom_presets": []
# }

chelper update --json
# { "current": "0.0.20", "latest": "0.0.21", "up_to_date": false, "error": null }

chelper bench --json --samples 5
# { "ok": true, "samples": 5, "median_ms": 142, "average_ms": 156, ... }
```

`--dry-run` 与 `--json` 联合使用：

```bash
chelper config profile delete work --dry-run --json
# { "dry_run": true, "description": "Would delete profile work",
#   "payload": { "action": "profile_delete", "name": "work" } }
```

---

## 安全与密钥管理

- API Key 只通过 `secrets.enc`（AES-256-GCM）持久化，绑定 username:hostname seed
- 主机或用户身份变化（如换机）会触发 `SecretStoreDecryptError`，envelope 不会被悄默丢弃
- 写路径加锁：检测到不可解密的 envelope 时，`setApiKey` 拒绝覆盖；恢复需通过 `chelper auth revoke`（自动 `deleteAll`）或手动 `rm ~/.chelper/secrets.enc`
- 备份还原拒绝路径遍历名（`..`、`/`、`\`）
- `status` 仅显示 12 字符 sha256 指纹，不显示 key 任何部分

---

## 常见问题

**Q：换了机器后 `chelper status` 报 `SecretStore decrypt failed - identity drift suspected`？**
A：旧 envelope 用旧机器的 `username:hostname` 派生密钥，新机器解不出。原 envelope 会被保留以防误删；想从干净状态重新开始：

```bash
chelper auth revoke    # 自动清理失败的 envelope
chelper auth <token>
```

或手动 `rm ~/.chelper/secrets.enc` 后再 `chelper auth`。

**Q：CI 里跑 `chelper config claude-code` 卡在交互？**
A：加 `--non-interactive`：

```bash
chelper auth $TOKEN --non-interactive
chelper config claude-code --non-interactive
```

**Q：怎么备份再换 profile 试错？**
A：

```bash
chelper config backup create before-experiment
# 折腾...
chelper config backup restore before-experiment-... --yes
```

---

## 链接

- [CHANGELOG](./CHANGELOG.md) — 版本变更记录
- [PUBLISH.md](./PUBLISH.md) — 发布流程
- 主页：<https://api.wenhuichen.cn/>
- 反馈：<https://api.wenhuichen.cn/support>

---

## License

UNLICENSED — 仅供 VibeAPI 用户使用，详见 [LICENSE](./LICENSE)。
