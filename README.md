# Stark-Frontend-Coding-Challenge

### 台灣大學 資管系 三年級 李昀宸

---

### 介紹

- 這個服務在做什麼？ <br>
  可以使用這個網頁瀏覽 SpaceX launch information。
- 使用、參考之第三方套件、框架、程式碼：<br>
  前端：React.js, Material UI, React Router, Styled-components, Lodash, Axios <br>
  其他：SpaceX api

### 操作說明

1. 在 frontend 下 `yarn` 安裝所需 package<br>

```
# under frontend
yarn
```

2. 確保已連接上網路

3. 啟動前端：在 frontend 下 `yarn start`，接著就能在 localhost:3000 使用服務。

```
# under frontend
yarn start
```

### 功能說明

About main list:

1. Load Launch：頁面一開始會先向 SpaceX api 索取 12 項 launch information（發射時間由最近到遠）。<br>
2. 獲取 Launch: 將滾輪下滑到底部，會自動索取 12 筆 launch 並在下方提醒正在索取，若已沒有更多 launch 則不會發生。<br>
3. 搜尋 Launch: 電腦頁面下最上方會有 filter bar，分別輸入想搜尋的名字（可為空，空為搜尋所有 launch）、開始與結束發射日期（可為空，空為搜尋所有 launch）、發射狀態（若沒有誤會資料庫設計，填「是」則索取 success === true；「否」則是 success === null）及排序（發射時間由近／遠到遠／近），按下確認後系統會重新索取 12 筆資料並滾到頁面最上方，往後滾到頁面底部都會以相同篩選情況進行獲取 launch；手機頁面下將左手邊的選單點開也可篩選，邏輯與電腦頁面一樣，若點擊選單以外而取消選單則不會篩選。<br>
4. 有些 launch 會沒有封面照片，會以 "No Picture 呈現"。<br>
5. Scroll to top button。<br>
6. 按下 title "SpaceX" 會重新刷新頁面。
7. 點選 "LEARN MORE" 跳轉到詳情頁面。

About detail page:

1. Launch Detail: 頁面呈現 launch 基本資訊及詳細敘述，若無詳細敘述則呈現 "None"，上方會有影片連結，若無連結則有封面照片，若無封面照片則會以 "No Picture 呈現"。
2. Back to main page: 點選上方 button 會返回初始化的主頁（沒有 filter、12 筆資料）。

### Other Information

1. 以公司提供的 endpoint v4/v5 launch 撈取到最新的 launch information 是 2022/12/05，而範例顯示了 2023 年的資料，上網查了一下：SpaceX 團隊有新提供一支一小時可以敲 15 次的 api (2.2.0)，可以撈到最新的資料，不知公司是不是以該支 api 作為 endpoint？
2. 封面照片是抓取 launch information 裡 .links.flickr.original 的第一個 element、發射日期是 .date_utc、名稱是 .name、影片是抓取 .links.youtube_id 再去向 youtube embed video。
3. 最新資料為 2022/12/05，而最新「有封面照片的」資料為 2022/04/17。
4. 面試時有提到要寫後端 Node.js，不知我是否需要開自己的後端，並由後端向 SpaceX api 索取資料再傳回前端？現行之下的作法是由 axios 直接敲 SpaceX endpoint。

### Enhancement

1. Error handling: 若無連上網路則跳出錯誤頁面請使用者連上網路。
2. Back to main page 時保留 filter 及以過去索取的資料並停留在剛剛點選 detail 的 launch。
