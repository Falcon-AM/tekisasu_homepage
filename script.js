// script.js

// ヒーロー通過で .past-hero を付与。
(function () {
    // bodyにJSが有効であることを示すクラスを付与
    document.body.classList.add('js-anim');
  
    const hero = document.querySelector('.hero');
    if (hero) {
      const sentry = document.createElement('div');
      Object.assign(sentry.style, { position:'absolute', left:0, right:0, bottom:0, height:'1px' });
      hero.appendChild(sentry);
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) document.body.classList.remove('past-hero');
        else document.body.classList.add('past-hero');
      }, { threshold:0 });
      io.observe(sentry);
    }
  
    // スクロール出現アニメーション用のObserver
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview'); // 画面に入ったら is-inview クラスを付与
          io2.unobserve(entry.target); // 一度表示したら監視を停止
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
  
    // #conceptセクションの画像コンテナとテキストブロックを監視対象にする
    document.querySelectorAll('#concept .img, #concept .concept-center').forEach(el => {
      io2.observe(el);
    });
  
    // menuセクションのアニメーション
    document.querySelectorAll('.menu-item').forEach((card, i) => {
      card.style.transitionDelay = (i * 60) + 'ms';
      const io3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io3.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      io3.observe(card);
    });
  
  })();