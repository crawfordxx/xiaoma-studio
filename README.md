# motion-studio

> 用代码做「Opus 5.5 爆款级」动效视频和 HTML 幻灯片，任何能写代码的模型 / agent 都能用。
> Code-driven motion videos & HTML slides at the standard of the most-liked Opus 5.5 videos — for any coding model or agent.

规则来自抖音、X、YouTube 上 30 条高赞 Opus 5.5 视频（最高 60 万赞 / 64 万播放）的逐帧拆解：抽帧、剪辑频率、色板、音轨转写、原帖 prompt。拆解明细见 [references/research.md](references/research.md)。

## 包含什么

| | |
|---|---|
| `SKILL.md` | 入口：7 步工作流、7 条硬规矩、渲染合约、参考文档路由 |
| `engine/runtime.js` | 时间轴运行时：每一帧都是 t 的纯函数，内置缓动、闭式弹簧、种子随机、节拍、逐字动画、预览器 |
| `engine/render.mjs` | 无头 Chromium 逐帧渲染 → H.264；每拍一帧的拼图、静帧、子帧运动模糊、幻灯片 PNG / PDF |
| `engine/audio.py` | NumPy 合成配乐和卡点音效（−14 LUFS）；给现成音乐测 BPM、拍点、段落 |
| `engine/qa.py` | 成片体检：规格、响度、单帧跳变、静止段 |
| `engine/themes.css` | 10 个风格原型的 token（博物馆纪录片 / 编辑部数据 / 宇宙电影 / 瑞士 reel / 产品发布 / 纸艺绘本 / 霓虹歌词 / 新粗野主义 / 工程爆炸图 / 游戏 HUD） |
| `engine/deck.js` | HTML 幻灯片：同一个文件能演讲、导出视频、导出 PDF |
| `references/` | 审美、分镜节奏、动效语法、代码规则、声音与 TTS、GPT Image / Seedance 素材、幻灯片、prompt 库、研究底稿 |
| `examples/` | 三个复刻样例：纪录片《复利的形状》、瑞士风 motion reel、研究结论幻灯片 |

## 快速开始

```bash
cd engine && npm install && cd ..            # 需要 node 18+、ffmpeg、python3 + numpy
node engine/init.mjs ~/my-video video        # 或 slides
open ~/my-video/index.html                   # 预览：空格播放，←→ 逐帧
node engine/render.mjs ~/my-video/index.html --sheet ~/my-video/out/sheet.jpg     # 先看拼图
node engine/render.mjs ~/my-video/index.html --out ~/my-video/out/video.mp4 --audio ~/my-video/out/audio.wav
python3 engine/qa.py ~/my-video/out/video.mp4
```

## 装进 agent

- **Claude Code**：`ln -s $(pwd) ~/.claude/skills/motion-studio`
- **Codex / 其他读 `~/.agents/skills` 的 agent**：`ln -s $(pwd) ~/.agents/skills/motion-studio`
- **pi**：`pi --skill /path/to/motion-studio "…"`
- 其他 agent：把 `SKILL.md` 作为系统提示的一部分，并让它能读 `references/`。

## 推荐搭配

纯代码就能出片。需要写实画面或人声时：**GPT Image 2 / 2.5**（角色、背景板、纹理）+ **Seedance 2.x**（真人 / 写实镜头）；配音用 **豆包 TTS**（中文 + 逐字时间戳）、Fish Audio、ElevenLabs、Gemini TTS、MiniMax。详见 `references/ai-assets.md`、`references/audio.md`。

## License

MIT。样本视频的版权归原作者所有：本仓库不含任何样本画面，只给出处链接。
