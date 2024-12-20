// 検索機能のスクリプト
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-box').value.trim().toLowerCase(); // 入力クエリを取得
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // 検索結果をリセット

  if (query === '') {
    resultsDiv.innerHTML = '<p>Please enter a search query.</p>'; // クエリが空の場合の処理
    return;
  }

  // JSONデータをフェッチ
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // クエリに一致する結果をフィルタリング
      const results = data.filter(item =>
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>'; // ヒットがない場合の処理
      } else {
        results.forEach(result => {
          // URLが無効な場合はスキップする
          if (result.url === '#' || result.url === '' || !result.url) {
            return; // 無効なリンクを無視
          }

          // リンク要素を作成
          const link = document.createElement('a');
          link.href = result.url;
          link.target = '_blank';
          link.textContent = result.title;

          // 説明要素を作成
          const description = document.createElement('p');
          description.textContent = result.description;

          // 結果のコンテナ要素を作成
          const div = document.createElement('div');
          div.appendChild(link);
          div.appendChild(description);

          // 結果を表示エリアに追加
          resultsDiv.appendChild(div);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error); // エラー時の処理
      resultsDiv.innerHTML = '<p>Error loading search data.</p>';
    });
});
