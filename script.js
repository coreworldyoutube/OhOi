<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>検索機能付きサイト</title>
</head>
<body>
  <h1>検索機能付きサイト</h1>

  <!-- 検索ボックス -->
  <input type="text" id="search-box" placeholder="検索クエリを入力">
  <button id="search-button">検索</button>

  <!-- 検索結果の表示部分 -->
  <div id="results"></div>

  <script>
    // 検索機能の統合
    document.getElementById('search-button').addEventListener('click', () => {
      const query = document.getElementById('search-box').value.trim().toLowerCase(); // 入力クエリを取得
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // 検索結果をリセット

      if (query === '') {
        resultsDiv.innerHTML = '<p>検索クエリを入力してください。</p>'; // クエリが空の場合の処理
        return;
      }

      // JSONデータをフェッチ
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          // クエリに一致する結果をフィルタリング
          const results = data.filter(item =>
            (item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)) && 
            item.url !== '#NONE' && item.url !== 'NONE' // NONE や # の場合は結果に含めない
          );

          if (results.length === 0) {
            resultsDiv.innerHTML = '<p>該当する結果はありません。</p>'; // ヒットがない場合の処理
          } else {
            results.forEach(result => {
              const link = document.createElement('a');
              link.href = result.url;
              link.target = '_blank';
              link.textContent = result.title;

              const description = document.createElement('p');
              description.textContent = result.description;

              const div = document.createElement('div');
              div.appendChild(link);
              div.appendChild(description);

              resultsDiv.appendChild(div);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error); // エラー時の処理
          resultsDiv.innerHTML = '<p>検索データの読み込み中にエラーが発生しました。</p>';
        });
    });
  </script>
</body>
</html>
