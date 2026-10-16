import puppeteer from '/tmp/moonstone-capture/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'wireframe-screenshots');
const url = pathToFileURL(path.join(root, 'index.html')).href;
await fs.mkdir(output, { recursive: true });

const at = new Date('2026-10-16T09:30:00+11:00').toISOString();
const segments = [
  {
    id: 'seg-001', source: 'Welcome to the community health service.', target: 'Bienvenido al servicio de salud comunitario.',
    backTranslation: 'Welcome to the community health service.', romanisedTranslation: '', romanisedVisible: false,
    qaTranslationStatus: 'approved', qaBackTranslationStatus: 'approved', qaStatus: 'approved',
    qaRevisedTranslation: '', qaRevisedBackTranslation: '', qaRevisedRomanisedTranslation: '', qaRomanisedVisible: false,
    finalisationChoice: null, finalisationStatus: 'pending', finalisationTranslation: '', finalisationBackTranslation: '',
    finalisationRomanisedTranslation: '', finalisationRomanisedVisible: false, finalisationComment: '',
    qaConsensusStatus: 'pending', qaConsensusComment: '',
    reviewLog: [
      { stage: 'qa', round: 1, column: 'translation', decision: 'approved', by: 'Maya Chen', at },
      { stage: 'qa', round: 1, column: 'back_translation', decision: 'approved', by: 'Maya Chen', at }
    ], history: []
  },
  {
    id: 'seg-002', source: 'Call us if you need an interpreter.', target: 'Llámanos si necesitas un intérprete.',
    backTranslation: 'Call us if you need an interpreter.', romanisedTranslation: '', romanisedVisible: false,
    qaTranslationStatus: 'flagged', qaBackTranslationStatus: 'approved', qaStatus: 'flagged',
    qaRevisedTranslation: 'Llámenos si necesita un intérprete.', qaRevisedBackTranslation: 'Call us if you require an interpreter.',
    qaRevisedRomanisedTranslation: '', qaRomanisedVisible: false,
    finalisationChoice: 'qa', finalisationStatus: 'flagged', finalisationTranslation: 'Comuníquese con nosotros si necesita un intérprete.',
    finalisationBackTranslation: 'Contact us if you need an interpreter.', finalisationRomanisedTranslation: '',
    finalisationRomanisedVisible: false, finalisationComment: 'Adjusted register to match the formal style guide.',
    qaConsensusStatus: 'pending', qaConsensusComment: '',
    reviewLog: [
      { stage: 'qa', round: 1, column: 'translation', decision: 'flagged', translation: 'Llámenos si necesita un intérprete.', by: 'Maya Chen', at },
      { stage: 'qa', round: 1, column: 'back_translation', decision: 'approved', by: 'Maya Chen', at },
      { stage: 'finalisation', round: 1, pair: 'qa', decision: 'flagged', translation: 'Comuníquese con nosotros si necesita un intérprete.', backTranslation: 'Contact us if you need an interpreter.', by: 'Sofia Ruiz', at }
    ], history: []
  },
  {
    id: 'seg-003', source: 'Appointments are free and confidential.', target: 'Las citas son gratuitas y confidenciales.',
    backTranslation: 'Appointments are free and confidential.', romanisedTranslation: '', romanisedVisible: false,
    qaTranslationStatus: 'pending', qaBackTranslationStatus: 'pending', qaStatus: 'pending',
    qaRevisedTranslation: '', qaRevisedBackTranslation: '', qaRevisedRomanisedTranslation: '', qaRomanisedVisible: false,
    finalisationChoice: null, finalisationStatus: 'pending', finalisationTranslation: '', finalisationBackTranslation: '',
    finalisationRomanisedTranslation: '', finalisationRomanisedVisible: false, finalisationComment: '',
    qaConsensusStatus: 'pending', qaConsensusComment: '', reviewLog: [], history: []
  }
];

function project(overrides = {}) {
  return {
    id: 'wireframe-project', name: 'Community Health Information', sourceLanguage: 'English', targetLanguage: 'Spanish',
    context: 'Public-facing information for patients accessing community health services.',
    styleGuide: 'Use plain language, a respectful formal register, and terminology from the approved glossary.',
    glossary: [{ source: 'community health service', target: 'servicio de salud comunitario', note: 'Approved department term' }],
    preparationDone: true,
    translatorInfo: { linguistAssigned: 'Sofia Ruiz', qualification: 'NAATI Certified Translator', date: '2026-10-15', translationInfo: '' },
    translationType: 'linguist', customTranslationType: '', linguistComments: 'Terminology checked against the supplied glossary.',
    translationDone: true,
    qaInfo: { linguistName: 'Maya Chen', qualification: 'Senior QA Linguist', date: '2026-10-16', comments: 'Formal register reviewed.' },
    qaDone: true,
    finalisationInfo: { linguistName: 'Sofia Ruiz', comments: 'QA suggestions reviewed.' },
    finalisationDone: false, pendingQARereview: false, qaSkipped: false, qaSkipReason: null, reviewRound: 1,
    dynamicMode: false, segmentedSnapshot: null, dynamicSnapshot: null, reorderLog: [], segments: structuredClone(segments),
    completed: false, completedAt: null, completedBy: '', lastModifiedBy: 'Maya Chen', lastModifiedDate: at, schemaVersion: 1,
    ...overrides
  };
}

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--allow-file-access-from-files', '--disable-web-security', '--no-first-run']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

async function setState(data, stepId = 'preparation', active = true) {
  const state = { sessions: data ? [{ id: data.id, data, stepId }] : [], activeId: active && data ? data.id : null, user: 'Maya Chen' };
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(s => localStorage.setItem('moonstone_standalone_v1', JSON.stringify(s)), state);
  await page.reload({ waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
}

async function capture(name, { full = true } = {}) {
  if (full) await page.addStyleTag({ content: '.workspace{height:auto!important;min-height:calc(100vh - 72px)}.main{overflow:visible!important}.sidebar{overflow:visible!important}' });
  if (full) {
    await page.evaluate(() => {
      const workspace = document.querySelector('.workspace');
      const main = document.querySelector('.main');
      const sidebar = document.querySelector('.sidebar');
      if (main) {
        main.style.setProperty('height', `${main.scrollHeight}px`, 'important');
        main.style.setProperty('overflow', 'visible', 'important');
      }
      if (workspace) {
        const requiredHeight = Math.max(main?.scrollHeight ?? 0, sidebar?.scrollHeight ?? 0, window.innerHeight - 72);
        workspace.style.setProperty('height', `${requiredHeight}px`, 'important');
        workspace.style.setProperty('min-height', '0', 'important');
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const viewport = page.viewport();
  const imagePath = path.join(output, `${name}.png`);
  if (full && viewport.width < 600) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: imagePath, clip: { x: 0, y: 0, width: viewport.width, height }, captureBeyondViewport: true });
  } else {
    await page.screenshot({ path: imagePath, fullPage: full });
  }
  console.log(`${name}.png`);
}

await setState(null, 'preparation', false);
await capture('01-project-workspace-empty');
await page.click('[data-act="new"]');
await capture('02-create-project-dialog', { full: false });

await setState(project(), 'preparation', false);
await capture('03-project-workspace-loaded');
await page.click('[data-act="guide"]');
await capture('04-workflow-guide');

await setState(project({ preparationDone: false, translationDone: false, qaDone: false }), 'preparation');
await capture('05-translation-request');
await page.click('[data-act="complete-prep"]');
await capture('06-translation-request-preview');

await setState(project({ translationDone: false, qaDone: false }), 'translation');
await capture('07-translation-workspace');
await page.click('[data-act="skip-qa"]');
await capture('08-skip-qa-dialog', { full: false });

const dynamicSeg = [{ ...segments[0], id: 'dynamic-001', source: segments.map(s => s.source).join('\n'), target: segments.map(s => s.target).join(' '), backTranslation: segments.map(s => s.backTranslation).join(' '), qaStatus: 'pending', qaTranslationStatus: 'pending', qaBackTranslationStatus: 'pending', reviewLog: [] }];
await setState(project({ dynamicMode: true, segments: dynamicSeg, translationDone: false, qaDone: false }), 'translation');
await capture('09-dynamic-translation');

await setState(project({ qaDone: false, segments: structuredClone(segments) }), 'review');
await capture('10-qa-workspace');
await setState(project({ dynamicMode: true, segments: dynamicSeg, qaDone: false }), 'review');
await capture('11-dynamic-qa');

const finalSegments = structuredClone(segments);
finalSegments[2].qaStatus = finalSegments[2].qaTranslationStatus = finalSegments[2].qaBackTranslationStatus = 'approved';
await setState(project({ segments: finalSegments }), 'finalisation');
await capture('12-finalisation');
await setState(project({ dynamicMode: true, segments: [{ ...dynamicSeg[0], qaStatus: 'flagged', qaTranslationStatus: 'flagged', qaBackTranslationStatus: 'approved', qaRevisedTranslation: dynamicSeg[0].target }] }), 'finalisation');
await capture('13-dynamic-finalisation');

const consensusSegments = structuredClone(finalSegments);
consensusSegments[1].qaConsensusStatus = 'pending';
await setState(project({ segments: consensusSegments, pendingQARereview: true, consensusSegmentIds: ['seg-002'], reviewRound: 2 }), 'consensus');
await capture('14-consensus-review');

const reportSegments = structuredClone(finalSegments);
reportSegments[1].qaConsensusStatus = 'approved'; reportSegments[1].finalisationStatus = 'approved';
await setState(project({ segments: reportSegments, finalisationDone: true }), 'final_report');
await capture('15-final-product-report-timeline');
await page.click('[data-view="simple"]');
await capture('16-final-report-simple-inline-diff');
await page.click('[data-diff="side"]');
await capture('17-final-report-side-by-side-diff');
await page.click('[data-act="complete-project"]');
await capture('18-complete-project-dialog', { full: false });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await setState(project({ segments: reportSegments, finalisationDone: true }), 'final_report');
await capture('19-mobile-final-report');
await setState(project({ translationDone: false, qaDone: false }), 'translation');
await capture('20-mobile-translation');

await browser.close();
console.log(`Saved screenshots to ${output}`);
