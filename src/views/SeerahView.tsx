import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { chapterOnePairCount, chapterOneSections } from '../data/seerahChapterOne';

function DesertScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.3, 5);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(.28, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffd98a }));
    sun.position.set(1.8, 1.8, -1); scene.add(sun);
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), new THREE.MeshBasicMaterial({ color: 0xd7a56d }));
    sand.rotation.x = -Math.PI / 2; sand.position.y = -.35; scene.add(sand);
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.08, .14, 1.4, 10), new THREE.MeshStandardMaterial({ color: 0x6b3e25 }));
    trunk.position.y = .35; tree.add(trunk);
    for (let index = 0; index < 7; index++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(.28, 12, 12), new THREE.MeshStandardMaterial({ color: 0x3f7046 }));
      leaf.position.set((index % 3 - .9) * .35, .95 + Math.floor(index / 3) * .18, (index % 2 - .5) * .15);
      tree.add(leaf);
    }
    tree.position.set(-1.2, 0, 0); scene.add(tree);
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight);
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) tree.rotation.y = Math.sin(Date.now() / 2400) * .04;
      renderer.render(scene, camera);
    };
    animate();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.dispose(); host.removeChild(renderer.domElement); };
  }, []);

  return <div className="seerah-scene" ref={mount} aria-hidden="true" />;
}

export const SeerahView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const copyKashmiri = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); window.setTimeout(() => setCopied(null), 2000); }
    catch { setCopied(null); }
  };

  return <section className="seerah-page">
    <div className="seerah-hero">
      <div>
        <span className="seerah-eyebrow">کٲشُر سیرتھ</span>
        <h1>The Sealed<br /><em>Nectar.</em></h1>
        <p>Read the Seerah in English and Kashmiri, passage by passage. Your reviewed Chapter 1 translations are gathered here.</p>
        <div className="seerah-actions">
          <button className="primary-action" type="button" onClick={() => document.getElementById('seerah-chapter-one')?.scrollIntoView({ behavior: 'smooth' })}>Read Chapter 1 ↓</button>
          <span>{chapterOnePairCount} reviewed passages · Audio narration coming later</span>
        </div>
      </div>
      <DesertScene />
    </div>

    <div className="chapter-grid" id="seerah-chapter-one">
      <aside className="seerah-contents">
        <div className="chapter-label">Chapter 01 · The Arabian Peninsula</div>
        <h2>Location and nature of the Arab tribes</h2>
        <p>Choose a section to jump to its paired English and Kashmiri passages.</p>
        {chapterOneSections.map((section, index) => <button className="chapter-pill" type="button" key={section.id} onClick={() => document.getElementById(`seerah-${section.id}`)?.scrollIntoView({ behavior: 'smooth' })}>
          <span><small>{String(index + 1).padStart(2, '0')}</small> {section.title}</span><span>{section.pairs.length} ↗</span>
        </button>)}
      </aside>
      <div className="seerah-reading-list">
        {chapterOneSections.map((section, sectionIndex) => <section className="seerah-reading-section" id={`seerah-${section.id}`} key={section.id}>
          <div className="reading-section-heading"><span className="chapter-label">{String(sectionIndex + 1).padStart(2, '0')} / Chapter 1</span><h2>{section.title}</h2><span>Original book · page {section.page}</span></div>
          {section.pairs.map((pair, pairIndex) => {
            const pairId = `${section.id}-${pairIndex}`;
            return <article className="reading-card" key={pairId}>
              <div className="reading-meta"><span>Passage {String(pairIndex + 1).padStart(2, '0')}</span><span>Owner reviewed</span></div>
              <p className="english-text" lang="en">{pair.english}</p>
              <p className="kashmiri-text" lang="ks-Arab" dir="rtl">{pair.kashmiri}</p>
              <div className="reading-footer"><button className="small-button" type="button" onClick={() => copyKashmiri(pair.kashmiri, pairId)}>{copied === pairId ? '✓ Copied Kashmiri' : 'Copy Kashmiri'}</button></div>
            </article>;
          })}
        </section>)}
        <div className="seerah-next-batch">The next passage, beginning with Abraham’s return to Palestine, is awaiting your review.</div>
      </div>
    </div>
  </section>;
};
