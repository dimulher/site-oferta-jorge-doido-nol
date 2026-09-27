(function(){
  // nav solid on scroll
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('solid', window.scrollY > 40);
  });

  // hero headline: word by word blur + slide reveal
  (function(){
    var h1 = document.querySelector('.hero h1');
    if (!h1) return;
    var delay = 0.15;
    function walk(node, gold){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if (n.nodeType === 3){
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(part){
            if (!part) return;
            if (/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span');
            s.className = 'word' + (gold ? ' gold' : '');
            s.textContent = part;
            s.style.animationDelay = delay.toFixed(2) + 's';
            delay += 0.1;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1){
          walk(n, gold || n.tagName === 'EM');
        }
      });
    }
    walk(h1, false);
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

  // popup after 20s on page, once per session
  var popup = document.getElementById('popup');
  var popupClose = document.getElementById('popup-close');

  function showPopup(){
    if (sessionStorage.getItem('nol_popup_shown')) return;
    popup.classList.add('show');
    sessionStorage.setItem('nol_popup_shown', '1');
  }
  function hidePopup(){
    popup.classList.remove('show');
  }

  try {
    if (!sessionStorage.getItem('nol_popup_shown')){
      setTimeout(showPopup, 20000);
    }
  } catch(e){
    setTimeout(showPopup, 20000);
  }

  popupClose.addEventListener('click', hidePopup);
  popup.addEventListener('click', function(e){
    if (e.target === popup) hidePopup();
  });
  document.getElementById('popup-cta').addEventListener('click', hidePopup);

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
