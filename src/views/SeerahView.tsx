import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const passage = {
  title: 'The Sealed Nectar',
  chapter: 'The First Revelation',
  english: 'Abraham returned to Palestine, where Hagar gave birth to Ishmael. Sarah became jealous of Hagar and forced Abraham to send Hagar and her baby away to a barren valley in the Hijaz. He chose a place for them near Zamzam, under a tall tree above the Sacred House in Makkah.',
  kashmiri: 'اِبراہیٖم وٲپس فَلَسْطیٖنَس گٔیو، یَتھ ہَاجَرَن اِسمٲعیٖل پَیدٕ کوٚر۔ سَارَہِ گٔی ہَاجَرِس سٕتۍ حَسَد، تہٕ تٔمۍ اِبراہیٖمَس مَجبوٗر کوٚر زِ ہَاجَر تہٕ تٔمِس ہٕنٛد بَچَہٕ حِجازَس اَکس بَنٛجَر دَرٕہَس مَنٛز دۄر نِوِو۔',
};

export const SeerahView: React.FC = () => {
  const mount = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!mount.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.3, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(520, 300); mount.current.appendChild(renderer.domElement);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(.28, 32, 32), new THREE.MeshBasicMaterial({color: 0xffd98a})); sun.position.set(1.8,1.8,-1); scene.add(sun);
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(12,8), new THREE.MeshBasicMaterial({color:0xd7a56d})); sand.rotation.x=-Math.PI/2; sand.position.y=-.35; scene.add(sand);
    const tree = new THREE.Group(); const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.08,.14,1.4,10),new THREE.MeshStandardMaterial({color:0x6b3e25})); trunk.position.y=.35; tree.add(trunk);
    for(let i=0;i<7;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.28,12,12),new THREE.MeshStandardMaterial({color:0x3f7046})); leaf.position.set((i%3-.9)*.35,.95+Math.floor(i/3)*.18,(i%2-.5)*.15); tree.add(leaf);} tree.position.set(-1.2,0,0); scene.add(tree);
    scene.add(new THREE.AmbientLight(0xffffff,1.5));
    let frame=0; const animate=()=>{frame=requestAnimationFrame(animate); tree.rotation.y=Math.sin(Date.now()/2400)*.04; renderer.render(scene,camera)}; animate();
    return ()=>{cancelAnimationFrame(frame); renderer.dispose(); mount.current?.removeChild(renderer.domElement)};
  }, []);
  return <section className="seerah-page"><div className="seerah-hero"><div><span className="seerah-eyebrow">کٲشُر آڈیو بُک</span><h1>Stories carried<br/><em>through time.</em></h1><p>Read, listen, and explore the Seerah in Kashmiri—chapter by chapter.</p><div className="seerah-actions"><button className="primary-action" onClick={()=>setPlaying(!playing)}>{playing?'❚❚ Pause':'▶ Listen to chapter'}</button><span>{playing?'Audio preview active':'Kashmiri narration coming next'}</span></div></div><div className="seerah-scene" ref={mount}/></div><div className="chapter-grid"><aside><div className="chapter-label">01 / 24 chapters</div><h2>Journey to the source</h2><p>Select a chapter to open its reading, translation, and word notes.</p><button className="chapter-pill active">The First Revelation <span>↗</span></button><button className="chapter-pill">Arabian Tribes <span>→</span></button><button className="chapter-pill">Makkah before Islam <span>→</span></button></aside><article className="reading-card"><div className="reading-meta"><span>{passage.chapter}</span><span>Batch 01 · review draft</span></div><h2>{passage.title}</h2><p className="english-text">{passage.english}</p><div className="kashmiri-text" dir="rtl">{passage.kashmiri}</div><div className="reading-footer"><button className="small-button">🔊 Play line</button><button className="small-button">⌘ Word notes</button><span>Native review required</span></div></article></div></section>;
};
