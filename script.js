document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-box').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // 検索結果をリセット

  if (query === '') {
    resultsDiv.innerHTML = '<p>Please enter a search query.</p>';
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
        resultsDiv.innerHTML = '<p>No results found.</p>';
      } else {
        const maxResults = 10; // 表示する最大件数
        const resultsToShow = results.slice(0, maxResults); // 最大件数までの結果を取得

        resultsToShow.forEach(result => {
          if (result.url === '#' || result.url === '' || !result.url) {
            return; // 無効なリンクをスキップ
          }

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

        // 検索結果が10件を超える場合に「もっと見る」ボタンを追加
        if (results.length > maxResults) {
          const seeMore = document.createElement('button');
          seeMore.textContent = 'See more results';
          seeMore.addEventListener('click', () => {
            resultsDiv.innerHTML = ''; // 結果をリセット
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
          });
          resultsDiv.appendChild(seeMore); // ボタンを表示
        }
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = '<p>Error loading search data.</p>';
    });
});
