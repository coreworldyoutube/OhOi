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
        (item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)) && 
        item.url !== '#NONE' && item.url !== 'NONE' // NONE や # の場合は結果に含めない
      );

      if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>'; // ヒットがない場合の処理
      } else {
        const maxResults = 10; // 表示する最大件数
        const resultsToShow = results.slice(0, maxResults); // 最大件数までの結果を取得

        resultsToShow.forEach(result => {
          const div = document.createElement('div');

          // スクラッチのプロジェクトURLを確認
          if (result.url.includes("scratch.mit.edu")) {
            const projectId = result.url.split('/').pop(); // URLからプロジェクトIDを抽出
            const iframe = document.createElement('iframe');
            iframe.src = `https://scratch.mit.edu/projects/${projectId}/embed`;
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            iframe.width = "485";
            iframe.height = "402";
            div.appendChild(iframe);
          } else {
            const link = document.createElement('a');
            link.href = result.url;
            link.target = '_blank';
            link.textContent = result.title;
            div.appendChild(link);
          }

          const description = document.createElement('p');
          description.textContent = result.description;
          div.appendChild(description);

          resultsDiv.appendChild(div);
        });

        // 検索結果が10件を超える場合に「もっと見る」ボタンを追加
        if (results.length > maxResults) {
          const seeMore = document.createElement('button');
          seeMore.textContent = 'See more results';
          seeMore.addEventListener('click', () => {
            // 「もっと見る」ボタンがクリックされた場合の処理
            resultsDiv.innerHTML = ''; // 結果をリセット
            results.forEach(result => {
              const div = document.createElement('div');
              if (result.url.includes("scratch.mit.edu")) {
                const projectId = result.url.split('/').pop();
                const iframe = document.createElement('iframe');
                iframe.src = `https://scratch.mit.edu/projects/${projectId}/embed`;
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                iframe.width = "485";
                iframe.height = "402";
                div.appendChild(iframe);
              } else {
                const link = document.createElement('a');
                link.href = result.url;
                link.target = '_blank';
                link.textContent = result.title;
                div.appendChild(link);
              }

              const description = document.createElement('p');
              description.textContent = result.description;
              div.appendChild(description);

              resultsDiv.appendChild(div);
            });
          });
          resultsDiv.appendChild(seeMore); // ボタンを表示
        }
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error); // エラー時の処理
      resultsDiv.innerHTML = '<p>Error loading search data.</p>';
    });
});
