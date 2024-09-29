# Next-Todo-List

## interview requirement

建立一個Next.js專案寫一個To-Do List作品，要能修改刪除，其他規格如下：

- 必須使用zod, next-safe-action, react-query。
- 需注重type safety。
- 不需要權限系統。
- 任意資料儲存形式都行，但如果使用DB需以prisma為中介。
- 需要分頁。
- 可以用任意AI，但不能請他人協助。
- 程式品質優先於是否達成。
- 使用以下package.json不能修改。
- 寫簡易的專案開啟教學。
- 必須用commit保留過程。

## Start
參考make file
```bash
make up
```

詳細可看
```bash
make help
```

## Develop Concept Road Map
- 建置基本Code Base框架
- 建置開發環境
  - docker
  - db with prisma
- 建置部署準備
  - production dockerfile
- 建置資料夾結構
- 開發畫面 -> 開發資料流 -> 串接資料流 -> 優化
  - TODO
- 程式碼檢查、優化
