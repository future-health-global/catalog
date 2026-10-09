# FUTURE HEALTH 图片管理：第一轮审计与后台需求
日期：2026-10-10。参考基线：main @ 2e3260dc12761a5f701527862daa8a80d40065d2。
状态：静态代码清点；尚未逐张量测像素或执行浏览器实测。

## 已确认
- 当前有 144 个产品，分布在 8 个品类：hits 10、health 26、daily 43、skin 18、cosmetics 21、baby 13、travel 10、other 3。
- products-data.js 内每个产品均有 img（assets/thumb-v15/...）与 v14img（assets/product-v15/...）；36 条含 spread 字段。
- 图片资源存储：assets 根目录 24 文件；assets/pages 109；assets/product-clean 109；assets/product-v14 139；assets/product-v15 144；assets/thumb-v15 144。历史目录不能直接当作正在使用的图片。
- 品类图片目前由 catImg() 从所属品类第一款产品缩略图获得；没有独立封面字段。后台必须增加独立品类封面设置。
- 公司介绍和官方信息页面直接引用 assets/brand_p2_0.jpeg、assets/company-* 等图片；同一文件可能多处复用。
- index.html 目前加载 products-data.js、qr-lib.js、app.production.js、share-preview-core.js。
- style.css 还有背景图引用，例如 assets/innovation.jpg（开场动画）。
- app.production.js 的价格与 PV 是演示算法，不是正式价格与 PV 数据。

## 后台必须支持
1. 每个图片位置显示：实际用途、当前文件、实际像素、推荐尺寸(px)、宽高比、最小像素、文件格式/大小、裁剪模式。
2. 区分产品列表缩略图、产品详情图、独立品类封面、公司介绍照片、首页背景、开场图、品牌 Logo、宣传图片素材。不要假定所有位置采用相同像素。
3. 图片源(media asset)与页面使用位置(media placement)分别记录。一个源文件可供多个位置引用，替换一个位置不应误替换其余位置。
4. 单张替换、多个文件人工匹配、按产品ID/位置ID的批量自动建议匹配；禁止没有预览确认就覆盖。
5. 上传时验证尺寸、比例、格式、文件大小，提供适配/人工裁剪；不得扭曲商品包装、Logo 或文字。
6. 草稿保存、前后对比、iPhone预览、正式发布、版本回退；新文件使用版本化路径，不覆盖旧图。
7. 后台可批量查看未匹配、低分辨率、过大文件、错误比例与共享资源风险。

## 待核实
- 每种位置的真实 CSS 显示规则与最合适的上传像素，不能先随意填写推荐尺寸。
- 对完整图片源进行逐一分辨率扫描，得到每一位置的建议。
- 宣传图片生成代码实际使用何种图源，以及 QR 区域与广告布局约束。
- 批量替换后的缓存刷新、图片加载失败回退与手机回归测试。

## 操作限制
仅在 develop/admin-foundation 编写新代码和文档；main 不修改；backup/iphone-tested-2026-10-10 为稳定技术基线。
