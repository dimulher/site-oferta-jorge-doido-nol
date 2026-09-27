(function(){
  // nav solid on scroll
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('solid', window.scrollY > 40);
  });

  // hero: headline no lettering da capa, camadas animadas, poeira dourada e paralaxe
  (function(){
    var scene = document.getElementById('scene');
    if (!scene) return;

    Array.prototype.slice.call(scene.querySelectorAll('.w')).forEach(function(w){
      var text = w.dataset.text.toUpperCase(), start = parseFloat(w.dataset.start);
      w.textContent = '';
      var base = document.createElement('span'); base.className = 'base';
      text.split('').forEach(function(c, i){
        var s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
        s.style.setProperty('--cd', (start + i * 0.07).toFixed(2) + 's'); base.appendChild(s);
      });
      var sh = document.createElement('span'); sh.className = 'sheen'; sh.setAttribute('aria-hidden', 'true');
      sh.textContent = text; sh.style.setProperty('--sd', w.dataset.sheen + 's');
      w.appendChild(base); w.appendChild(sh);
    });

    function play(){
      scene.classList.remove('play');
      void scene.offsetWidth;
      scene.classList.add('play');
    }
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(function(r){ setTimeout(r, 1600); })]).then(play);

    var cv = document.getElementById('dust'), cx = cv.getContext('2d'), P = [], W = 0, H = 0;
    function size(){ W = cv.width = scene.clientWidth; H = cv.height = scene.clientHeight; }
    size(); window.addEventListener('resize', size);
    var seed = 7; function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 0; i < 80; i++) P.push({x:rnd(), y:rnd(), r:.6 + rnd()*1.9, a:.16 + rnd()*.5, ph:rnd()*6.283, mx:1 + Math.floor(rnd()*2), my:1 + Math.floor(rnd()*3), ax:6 + rnd()*20, ay:24 + rnd()*70});
    var heroVisible = true;
    new IntersectionObserver(function(en){ heroVisible = en[0].isIntersecting; }, { threshold: 0 }).observe(scene);
    (function frame(ms){
      if (heroVisible){
        var T = ms / 1000, k = 6.283185 * T / 15;
        cx.clearRect(0, 0, W, H); cx.globalCompositeOperation = 'lighter';
        P.forEach(function(p){
          var x = p.x * W + p.ax * Math.sin(k * p.mx + p.ph), y = p.y * H + p.ay * Math.sin(k * p.my + p.ph * 1.3);
          var al = p.a * (.55 + .45 * Math.sin(k * 3 + p.ph));
          var g = cx.createRadialGradient(x, y, 0, x, y, p.r * 5);
          g.addColorStop(0, 'rgba(240,205,120,' + al + ')'); g.addColorStop(1, 'rgba(212,162,63,0)');
          cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, p.r * 5, 0, 6.283); cx.fill();
        });
      }
      requestAnimationFrame(frame);
    })(0);

    var layers = Array.prototype.slice.call(scene.querySelectorAll('.px')), tx = 0, ty = 0, cxp = 0, cyp = 0;
    window.addEventListener('mousemove', function(e){ tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2; });
    (function loop(){
      if (heroVisible){
        cxp += (tx - cxp) * .06; cyp += (ty - cyp) * .06;
        layers.forEach(function(l){
          var d = parseFloat(l.dataset.depth);
          l.style.transform = 'translate3d(' + (-cxp * d).toFixed(2) + 'px,' + (-cyp * d * .6).toFixed(2) + 'px,0)';
        });
      }
      requestAnimationFrame(loop);
    })();
  })();

  // flip countdown to 2026-10-02 09:00 (America/Sao_Paulo, UTC-03:00)
  var target = new Date('2026-10-02T09:00:00-03:00').getTime();

  function pad(n){ return String(n).padStart(2, '0'); }

  function parts(){
    var diff = Math.max(0, target - Date.now());
    return [
      pad(Math.floor(diff / 86400000)),
      pad(Math.floor((diff % 86400000) / 3600000)),
      pad(Math.floor((diff % 3600000) / 60000)),
      pad(Math.floor((diff % 60000) / 1000))
    ];
  }

  function half(cls, text){
    var h = document.createElement('span');
    h.className = 'half ' + cls;
    var t = document.createElement('span');
    t.textContent = text;
    h.appendChild(t);
    return h;
  }

  function Flip(el, value){
    this.el = el;
    this.val = value;
    el.classList.add('flip');
    el.setAttribute('aria-hidden', 'true');
    el.textContent = '';
    this.top = half('top', value);
    this.bottom = half('bottom', value);
    el.appendChild(this.top);
    el.appendChild(this.bottom);
  }

  Flip.prototype.set = function(value){
    if (value === this.val) return;
    var old = this.val;
    var self = this;
    this.val = value;

    Array.prototype.slice.call(this.el.querySelectorAll('.fold')).forEach(function(f){ f.remove(); });
    this.bottom.firstChild.textContent = old;
    this.top.firstChild.textContent = value;

    var foldTop = half('top fold fold-top', old);
    var foldBottom = half('bottom fold fold-bottom', value);
    this.el.appendChild(foldTop);
    this.el.appendChild(foldBottom);
    foldBottom.addEventListener('animationend', function(){
      self.bottom.firstChild.textContent = value;
      foldTop.remove();
      foldBottom.remove();
    });
  };

  var ids = ['cd-days', 'cd-hours', 'cd-min', 'cd-sec'];
  var start = parts();
  var flips = ids.map(function(id, i){
    return new Flip(document.getElementById(id), start[i]);
  });
  setInterval(function(){
    var p = parts();
    flips.forEach(function(f, i){ f.set(p[i]); });
  }, 1000);

  // agenda: progress line that fills with scroll
  var agenda = document.querySelector('.agenda');
  if (agenda){
    var fill = document.createElement('div');
    fill.className = 'agenda-fill';
    agenda.insertBefore(fill, agenda.firstChild);
    var rows = Array.prototype.slice.call(agenda.querySelectorAll('.agenda-row'));
    var queued = false;

    var updateAgenda = function(){
      queued = false;
      var r = agenda.getBoundingClientRect();
      var p = Math.max(0, Math.min(r.height, window.innerHeight * 0.62 - r.top));
      fill.style.height = p + 'px';
      rows.forEach(function(row){
        row.classList.toggle('lit', row.offsetTop + 36 <= p);
      });
    };

    window.addEventListener('scroll', function(){
      if (!queued){ queued = true; requestAnimationFrame(updateAgenda); }
    }, { passive: true });
    window.addEventListener('resize', updateAgenda);
    updateAgenda();
  }

  // gold that builds up with scroll: cards light up, closing line fills word by word
  var goldEls = Array.prototype.slice.call(document.querySelectorAll('.pain, .pillar'));
  var fillBox = document.querySelector('.pain-close');
  var fillWords = [];
  if (fillBox){
    var text = fillBox.textContent.trim();
    fillBox.textContent = '';
    fillBox.setAttribute('aria-label', text);
    text.split(/\s+/).forEach(function(word, i, all){
      var s = document.createElement('span');
      s.className = 'gw';
      s.textContent = word;
      fillBox.appendChild(s);
      if (i < all.length - 1) fillBox.appendChild(document.createTextNode(' '));
      fillWords.push(s);
    });
  }
  var goldQueued = false;
  var updateGold = function(){
    goldQueued = false;
    var vh = window.innerHeight;
    goldEls.forEach(function(el){
      var r = el.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (vh * 0.94 - (r.top + r.height / 2)) / (vh * 0.36)));
      el.style.setProperty('--p', p.toFixed(3));
      el.classList.toggle('lit', p >= 0.6);
    });
    if (fillBox){
      var fr = fillBox.getBoundingClientRect();
      var fp = Math.max(0, Math.min(1, (vh * 0.92 - fr.top) / (vh * 0.40)));
      fillWords.forEach(function(w, i){
        w.classList.toggle('on', i < fp * fillWords.length);
      });
    }
  };
  window.addEventListener('scroll', function(){
    if (!goldQueued){ goldQueued = true; requestAnimationFrame(updateGold); }
  }, { passive: true });
  window.addEventListener('resize', updateGold);
  updateGold();

  // testimonial videos: gold play button, native controls after play, one at a time
  var videoFrames = Array.prototype.slice.call(document.querySelectorAll('.video-frame'));
  videoFrames.forEach(function(frame){
    var video = frame.querySelector('video');
    var btn = frame.querySelector('.video-play');
    btn.addEventListener('click', function(){
      videoFrames.forEach(function(other){
        var v = other.querySelector('video');
        if (v !== video) v.pause();
      });
      video.setAttribute('controls', '');
      video.play();
    });
    video.addEventListener('play', function(){ frame.classList.add('playing'); });
    video.addEventListener('pause', function(){
      if (video.ended || video.currentTime === 0) frame.classList.remove('playing');
    });
    video.addEventListener('ended', function(){ frame.classList.remove('playing'); });
  });

  // plaque gallery: endless slow loop, drag with mouse, swipe with touch
  (function(){
    var track = document.querySelector('.plaque-gallery');
    if (!track) return;
    var originals = Array.prototype.slice.call(track.children);
    var SPEED = 32;
    var half = 0, pos = 0, lastSet = 0, lastUser = 0, last = 0;
    var dragging = false, hovering = false, running = false, rafId = 0;
    var startX = 0, startScroll = 0;

    function addSet(){
      originals.forEach(function(fig){
        var c = fig.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        var img = c.querySelector('img');
        if (img){ img.removeAttribute('loading'); img.alt = ''; }
        track.appendChild(c);
      });
    }

    function build(){
      while (track.children.length > originals.length) track.removeChild(track.lastChild);
      addSet();
      half = track.children[originals.length].offsetLeft - track.children[0].offsetLeft;
      var extra = 1 + Math.ceil(track.clientWidth / half);
      for (var i = 1; i < extra; i++) addSet();
      lastSet = pos = half;
      track.scrollLeft = half;
    }

    function normalize(){
      var sl = track.scrollLeft, d = 0;
      if (sl >= half * 2) d = -half;
      else if (sl < half) d = half;
      if (d){
        track.scrollLeft = sl + d;
        pos += d; startScroll += d; lastSet = track.scrollLeft;
      }
    }

    track.addEventListener('scroll', function(){
      if (Math.abs(track.scrollLeft - lastSet) > 1.5) lastUser = performance.now();
    }, { passive: true });

    track.addEventListener('pointerdown', function(e){
      if (e.pointerType !== 'mouse') return;
      dragging = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function(e){
      if (!dragging) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
      normalize();
    });
    function endDrag(){
      if (!dragging) return;
      dragging = false;
      track.classList.remove('dragging');
      lastUser = performance.now();
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('mouseenter', function(){ hovering = true; });
    track.addEventListener('mouseleave', function(){ hovering = false; lastUser = performance.now(); });

    function tick(t){
      if (!running) return;
      var dt = Math.min(50, t - (last || t));
      last = t;
      if (dragging || hovering || t - lastUser < 1400){
        pos = track.scrollLeft;
      } else {
        pos += SPEED * dt / 1000;
        lastSet = pos;
        track.scrollLeft = pos;
      }
      normalize();
      rafId = requestAnimationFrame(tick);
    }

    build();
    window.addEventListener('resize', function(){ build(); });

    new IntersectionObserver(function(entries){
      var visible = entries[0].isIntersecting;
      if (visible && !running){ running = true; last = 0; rafId = requestAnimationFrame(tick); }
      else if (!visible){ running = false; cancelAnimationFrame(rafId); }
    }, { threshold: 0.05 }).observe(track);
  })();

  // Meta Pixel: intenção real de compra (botões que vão virar o link do checkout)
  document.querySelectorAll('.js-checkout-cta').forEach(function(btn){
    btn.addEventListener('click', function(){
      if (typeof fbq === 'function') fbq('track', 'InitiateCheckout', { value: 97, currency: 'BRL' });
    });
  });

  // reveal on scroll
  var revealTargets = document.querySelectorAll('.pillar, .pain, .pull, .quote, .authority, .event-grid, .agenda-row, .testimonial, .offer-card');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.style.animation = 'fadeUp .7s ease forwards';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });
  revealTargets.forEach(function(el){
    el.style.opacity = '0';
    io.observe(el);
  });
})();

var styleSheet = document.createElement('style');
styleSheet.textContent = '@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(styleSheet);
