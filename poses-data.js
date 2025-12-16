(() => {
  const LIMIT = 260;
  const archetypes = [
    { k: 'standing', ko: '서있기', en: 'Standing' },
    { k: 'walking', ko: '걷기', en: 'Walking' },
    { k: 'running', ko: '달리기', en: 'Running' },
    { k: 'jumping', ko: '점프', en: 'Jumping' },
    { k: 'sitting', ko: '앉기', en: 'Sitting' },
    { k: 'crouching', ko: '웅크리기', en: 'Crouching' },
    { k: 'kneeling', ko: '무릎꿇기', en: 'Kneeling' },
    { k: 'lying', ko: '눕기', en: 'Lying' },
    { k: 'climbing', ko: '오르기', en: 'Climbing' },
    { k: 'dancing', ko: '춤', en: 'Dancing' },
    { k: 'fighting', ko: '격투', en: 'Fighting' },
    { k: 'kicking', ko: '발차기', en: 'Kicking' },
    { k: 'punching', ko: '주먹질', en: 'Punching' },
    { k: 'aiming', ko: '조준', en: 'Aiming' },
    { k: 'holding', ko: '잡기', en: 'Holding' },
    { k: 'carrying', ko: '들기', en: 'Carrying' },
    { k: 'throwing', ko: '던지기', en: 'Throwing' },
    { k: 'landing', ko: '착지', en: 'Landing' },
    { k: 'stretching', ko: '스트레칭', en: 'Stretching' },
    { k: 'gesture', ko: '제스처', en: 'Gesture' },
    { k: 'turning', ko: '돌아보기', en: 'Turning' },
    { k: 'reaching', ko: '뻗기', en: 'Reaching' },
    { k: 'pushing', ko: '밀기', en: 'Pushing' },
    { k: 'pulling', ko: '당기기', en: 'Pulling' },
    { k: 'pointing', ko: '가리키기', en: 'Pointing' },
    { k: 'falling', ko: '넘어짐', en: 'Falling' }
  ];

  const variants = [
    { k: 'front', ko: '정면', en: 'Front' },
    { k: 'side', ko: '측면', en: 'Side' },
    { k: 'back', ko: '후면', en: 'Back' },
    { k: '3-4', ko: '3/4', en: 'Three-quarter' },
    { k: 'dynamic', ko: '역동', en: 'Dynamic' },
    { k: 'silhouette', ko: '실루엣', en: 'Silhouette' },
    { k: 'foreshortening', ko: '원근 과장', en: 'Foreshortening' },
    { k: 'low-angle', ko: '로우 앵글', en: 'Low Angle' },
    { k: 'high-angle', ko: '하이 앵글', en: 'High Angle' },
    { k: 'key-pose', ko: '키 포즈', en: 'Key Pose' }
  ];

  const out = [];
  const used = new Set();

  for (const a of archetypes) {
    for (const v of variants) {
      if (out.length >= LIMIT) break;
      const id = `${a.k}-${v.k}`;
      if (used.has(id)) continue;
      used.add(id);

      const variantToken = (() => {
        if (v.k === 'front') return 'front view';
        if (v.k === 'side') return 'side view';
        if (v.k === 'back') return 'back view';
        if (v.k === '3-4') return 'three quarter view';
        return v.k.replace(/-/g, ' ');
      })();
      const q = `${a.k} ${variantToken} pose reference`.replace(/\s+/g, ' ').trim();

      out.push({
        id,
        ko: `${a.ko} · ${v.ko}`,
        en: `${a.en} · ${v.en}`,
        q,
        poseType: a.k,
        tags: [a.k, v.k, 'pose', 'motion', 'reference', 'single']
      });
    }
    if (out.length >= LIMIT) break;
  }

  window.POSES_DATA = out;
})();
