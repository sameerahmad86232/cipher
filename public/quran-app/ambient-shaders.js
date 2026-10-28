/* Koshur Quran visual atmosphere
 * Uses the MIT-licensed Shaders JavaScript WebGPU runtime by Shader Effects:
 * https://github.com/shader-effects-inc/shaders (version 4.0.4).
 * Only loaded in suitable browsers after the hero enters the viewport.
 * Static image and CSS gradients remain the default and full fallback.
 */
(() => {
  'use strict';
  const KEY = 'koshur-ambient-shader-enabled';
  const src = 'https://esm.sh/shaders@4.0.4/js?bundle';
  let instance = null, canvas = null, observer = null, loading = false, generation = 0;
  function enabled() { try { return localStorage.getItem(KEY) !== 'false'; } catch (_) { return true; } }
  function capable() {
    return enabled() && typeof navigator !== 'undefined' && !!navigator.gpu &&
      matchMedia('(min-width: 820px)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !(navigator.connection && navigator.connection.saveData) &&
      !(typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2);
  }
  function clean() {
    generation++;
    if (observer) { observer.disconnect(); observer = null; }
    if (instance && typeof instance.destroy === 'function') { try { instance.destroy(); } catch (_) {} }
    if (canvas) canvas.classList.remove('is-ready');
    instance = null; canvas = null; loading = false;
  }
  async function activate(target,token) {
    if (loading || instance || !target.isConnected || token !== generation || !capable()) return;
    loading = true;
    try {
      const mod = await import(src);
      if (!target.isConnected || token !== generation || !capable()) { loading = false; return; }
      const shader = await mod.createShader(target, {
        disableTelemetry: true,
        components: [
          {type: 'LinearGradient', props: {colorA: '#102e29', colorB: '#36775a', angle: 23}},
          {type: 'Aurora', props: {
            colorA: '#2a7958', colorB: '#d4b875', colorC: '#3c8d74',
            intensity: 29, balance: 47, curtainCount: 3,
            speed: 1.2, waviness: 32, rayDensity: 10, height: 95,
            center: {x: 0.72, y: 0.18}, seed: 8
          }}
        ]
      });
      if (!target.isConnected || token !== generation) {
        shader?.destroy?.();
        loading = false;
        return;
      }
      instance = shader;
      target.classList.add('is-ready');
    } catch (e) {
      // No errors need be shown to readers: the rich static illustration remains.
      target.classList.remove('is-ready');
    } finally { loading = false; }
  }
  function mount() {
    clean();
    if (!capable()) return;
    const el = document.querySelector('#koshur-shader-canvas');
    if (!el) return;
    canvas = el;
    const token = generation;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && !instance && !loading) activate(el,token);
      }
    }, {rootMargin:'160px',threshold:0.05});
    observer.observe(el);
  }
  function settingChanged() {
    if (enabled()) mount(); else clean();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-motion-toggle]');
    if (!b) return;
    const next = !enabled();
    try { localStorage.setItem(KEY,String(next)); } catch (_) {}
    b.setAttribute('aria-checked',String(next));
    const v = document.querySelector('[data-motion-label]');
    if (v) v.textContent = next?'On when supported':'Off';
    settingChanged();
  });
  window.addEventListener('pagehide',clean,{once:true});
  window.KoshurShaders = {mount,clean,enabled};
})();
