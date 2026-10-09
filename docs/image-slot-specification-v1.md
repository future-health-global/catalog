# FUTURE HEALTH 图片规格审计：第二轮
日期：2026-10-10
分支：develop/admin-foundation
依据：main @ 2e3260dc12761a5f701527862daa8a80d40065d2
说明：以下为真实文件的抽样像素测量与 CSS 静态分析；不是全部图片像素扫描，也不是最终推荐规格。

## 已实测原始图片像素
| 文件 | 宽×高(px) |
| --- | --- |
| assets/thumb-v15/hits-1-0.jpg | 640×480 |
| assets/product-v15/hits-1-0.jpg | 1493×990 |
| assets/pages/catalog-p001.jpg | 900×1188 |
| assets/brand_p2_0.jpeg | 2518×1661 |
| assets/future-health-logo.png | 2048×789 |
| assets/innovation.jpg | 1280×400 |
| assets/company-culture-source.jpg | 720×350 |

## 主要 CSS 显示规则（并非固定上传要求）
- .catPic：高度124px，图片width/height 100%，object-fit:cover。需要单独配置品类封面，不能继续只能用第一款产品图片。
- .gridPic：高度142px，object-fit:contain。产品缩略图不应被裁断包装。
- .productHero：高度310px，object-fit:contain。产品详情主图应保持完整，实际 source 为 p.v14img 优先。
- .aboutV7 > img：高度170px，object-fit:cover。公司建筑图在这里可能裁剪。
- .v29Company .sourceVisual：width:100%，height:auto。公司资料图保持原始比例。
- .splashBuilding：assets/innovation.jpg 居中 cover 作为开场背景。
- .headerLogoMark：27px 方盒，object-fit:contain；品牌完整logo 2048x789 不可强行压成方图。

## 后台第一版规格实现方案
1. 图片用途类型=image_role，分别为 category_cover、product_thumbnail、product_detail、company_banner、company_content、splash_background、brand_logo、source_page、share_asset。
2. image_slot 保存 slot_id、role、owner_type、owner_id、current_asset_id、fit_mode、aspect_ratio、min_width、min_height、recommended_width、recommended_height、max_bytes、allow_crop、position、crop_params。建议数值后续依据设备实际页面截图核定。
3. media_assets 保存 asset_id、mime、width、height、bytes、storage_path、checksum、created_at，并关联历史版本。明确尺寸与比例提示由角色/槽位的配置控制。
4. 上传前自动测量并显示「实际宽×高、宽高比、文件大小」，如果比例或像素不符，给出警告和人工处理选项，不默认拉伸变形。
5. 批量替换流程：文件列表 -> 按 slot ID/产品ID 建议匹配 -> 人工检查 -> 草稿存储 -> 整页预览 -> 确认发布 -> 可回滚。未匹配文件不自动覆盖，且多位置共享同一源图时需明确提示。
6. 不要用样本图片尺寸充当每个图片位置的推荐像素。发布前需逐类真实渲染和最低清晰度检查。

## 仍未完成
- 全部资源的真实尺寸扫描及所有 CSS 覆盖规则确认。
- 每个图片位置对照页面/产品的完整 slot 清单。
- 实际 iPhone 视口和宣传图生成的图源细查。
- 代码实现、运行测试与正式上线。

操作边界：不得修改 main 或稳定备份分支。
