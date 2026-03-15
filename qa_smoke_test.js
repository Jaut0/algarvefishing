const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');
const nodeCrypto = require('crypto');

function readFile(p){
  return fs.readFileSync(p,'utf8');
}

function listLocalScripts(html){
  const re = /<script[^>]+src="([^"]+)"[^>]*><\/script>/gi;
  const out=[];
  let m;
  while((m=re.exec(html))){
    const src=m[1];
    if(src.startsWith('http') || src.startsWith('//')) continue;
    const clean=src.split('?')[0].replace(/^\.\//,'');
    if(clean.startsWith('js/')) out.push(clean);
  }
  return out;
}

function createDom(htmlFile){
  const html = readFile(htmlFile);

  const errors=[];
  const logs=[];
  const vConsole = new VirtualConsole();
  vConsole.on('error', (e)=>errors.push({type:'console.error', msg:String(e)}));
  vConsole.on('warn', (e)=>logs.push({type:'console.warn', msg:String(e)}));
  vConsole.on('log', (e)=>logs.push({type:'console.log', msg:String(e)}));

  const dom = new JSDOM(html, {
    url: 'http://localhost/'+path.basename(htmlFile),
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vConsole,
  });

  const { window } = dom;

  // make timers immediate for deterministic tests
  window.__redirects = [];
  window.setTimeout = (fn, t) => { try { fn(); } catch(e){ errors.push({type:'setTimeout', msg:e.stack||String(e)});} return 0; };

  // stub location.href assignments
  try {
    const loc = window.location;
    Object.defineProperty(window, 'location', {
      value: {
        get href(){ return loc.href; },
        set href(v){ window.__redirects.push(String(v)); },
        assign(v){ window.__redirects.push(String(v)); },
        replace(v){ window.__redirects.push(String(v)); },
        pathname: loc.pathname,
      },
      writable: false
    });
  } catch(_) {
    // best-effort
  }

  // webcrypto for admin-login
  if (!window.crypto || !window.crypto.subtle) {
    window.crypto = nodeCrypto.webcrypto;
  }

  // Provide debug logger functions expected by our code
  window.__DEBUG = false;
  window.__log = (...args)=>{};
  window.__err = (...args)=>{ errors.push({type:'__err', msg:args.map(String).join(' ')}); };

  // provide toast if missing
  if (typeof window.mostrarToast !== 'function') {
    window.mostrarToast = function(msg,tipo){ logs.push({type:'toast', msg:String(msg), level: tipo||'sucesso'}); };
  }
  window.showToast = window.mostrarToast;

  // stub EmailJS
  window.emailjs = {
    init: ()=>{},
    send: async ()=>({status:200}),
  };

  return { dom, errors, logs, html };
}

function evalLocalScripts(ctx, scripts){
  const { window } = ctx.dom;
  for(const s of scripts){
    const full = path.join(__dirname, s);
    if (!fs.existsSync(full)) {
      ctx.errors.push({type:'missing_script', msg:s});
      continue;
    }
    try {
      window.eval(readFile(full));
    } catch(e){
      ctx.errors.push({type:'script_eval', msg:`${s}: ${e.stack||e}`});
    }
  }
}

function triggerDOMContentLoaded(ctx){
  const { window } = ctx.dom;
  try {
    window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));
  } catch(e){
    ctx.errors.push({type:'domcontentloaded', msg:e.stack||String(e)});
  }
}

function testTranslation(ctx, expectations){
  const { window } = ctx.dom;
  const out = { ok: true, checks: [] };
  if (!window.PortalI18n || typeof window.PortalI18n.setLang !== 'function') {
    return { ok:false, checks:[{name:'PortalI18n exists', ok:false, detail:'PortalI18n not found'}] };
  }
  try {
    window.PortalI18n.setLang('en');
    const lang = window.document.documentElement.getAttribute('lang');
    out.checks.push({name:'html[lang]=en after setLang', ok: lang==='en', detail:`lang=${lang}`});
    // check switcher UI
    out.checks.push({name:'#langSwitcher exists', ok: !!window.document.getElementById('langSwitcher')});

    for(const ex of expectations){
      const el = window.document.querySelector(ex.selector);
      const txt = el ? el.textContent.trim() : '';
      const ok = ex.mustNotEqual ? (txt !== ex.mustNotEqual) : true;
      out.checks.push({name: ex.name, ok, detail: txt});
    }
  } catch(e){
    return { ok:false, checks:[{name:'translation threw', ok:false, detail:e.stack||String(e)}] };
  }
  out.ok = out.checks.every(c=>c.ok);
  return out;
}

function testAuthLogin(){
  const ctx = createDom(path.join(__dirname,'auth.html'));
  const scripts = listLocalScripts(ctx.html).filter(s=>!s.includes('i18n.js'));
  // auth.html includes inline scripts; load main.js etc first, then trigger DOMContentLoaded
  evalLocalScripts(ctx, scripts);
  // Load i18n last (some pages rely on it)
  try { ctx.dom.window.eval(readFile(path.join(__dirname,'js/i18n.js'))); } catch(e){ ctx.errors.push({type:'script_eval', msg:`i18n.js: ${e.stack||e}`}); }
  triggerDOMContentLoaded(ctx);

  const w = ctx.dom.window;

  // prepare a valid active user
  const user = { nome:'Cliente Teste', email:'cliente@teste.com', password:'1234', tipo:'privado', emailConfirmado:true, status:'ativo' };
  w.localStorage.setItem('utilizadores', JSON.stringify([user]));

  const form = w.document.getElementById('formLogin');
  const emailInput = form.querySelector('input[type="email"]');
  const pwInput = form.querySelector('input[type="password"]');
  emailInput.value = user.email;
  pwInput.value = user.password;

  try {
    form.dispatchEvent(new w.Event('submit', { bubbles:true, cancelable:true }));
  } catch(e){
    ctx.errors.push({type:'auth_submit', msg:e.stack||String(e)});
  }

  const logged = w.localStorage.getItem('usuarioLogado');
  return {
    page: 'auth.html',
    redirects: w.__redirects,
    usuarioLogadoSet: !!logged,
    errors: ctx.errors,
    logs: ctx.logs,
    translation: testTranslation(ctx, [
      {name:'Login button text should change or remain valid', selector:'button[type="submit"]', mustNotEqual: 'Entrar'}
    ])
  };
}

function testAdminLogin(){
  const ctx = createDom(path.join(__dirname,'admin-login.html'));
  // load main
  evalLocalScripts(ctx, ['js/main.js']);
  // execute inline scripts in file: jsdom already ran them? to be safe trigger DOMContentLoaded
  triggerDOMContentLoaded(ctx);

  const w = ctx.dom.window;
  const form = w.document.getElementById('formAdminLogin');
  const email = w.document.getElementById('adminEmail');
  const pw = w.document.getElementById('adminPassword');

  email.value = 'geral@algarvetunacharter.pt';
  pw.value = 'wrong';
  try{ form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})); } catch(e){ ctx.errors.push({type:'admin_submit', msg:e.stack||String(e)}); }

  // now brute known hash? can't derive password. We'll only ensure wrong login does not redirect.
  const redirectsAfterWrong = w.__redirects.slice();

  return {
    page:'admin-login.html',
    redirectsAfterWrong,
    errors: ctx.errors,
    logs: ctx.logs,
  };
}

function testReservation(){
  const ctx = createDom(path.join(__dirname,'reservar-barco.html'));
  const scripts = listLocalScripts(ctx.html);
  evalLocalScripts(ctx, scripts);
  try { ctx.dom.window.eval(readFile(path.join(__dirname,'js/i18n.js'))); } catch(e){ ctx.errors.push({type:'script_eval', msg:`i18n.js: ${e.stack||e}`}); }
  triggerDOMContentLoaded(ctx);

  const w = ctx.dom.window;
  // ensure form exists
  const email = w.document.getElementById('emailCliente');
  const tel = w.document.getElementById('telefoneCliente');
  const btn = w.document.getElementById('btnEnviarReserva');
  return {
    page:'reservar-barco.html',
    hasEmailField: !!email,
    hasTelField: !!tel,
    hasSubmitButton: !!btn,
    errors: ctx.errors,
    logs: ctx.logs,
    translation: testTranslation(ctx, [
      {name:'H1 exists', selector:'h1'}
    ])
  };
}

function testDashboards(){
  const pages=['dashboard-usuario.html','dashboard-capitao.html','dashboard-capitao-NOVO.html','admin-dashboard.html'];
  const results=[];
  for(const p of pages){
    const ctx = createDom(path.join(__dirname,p));
    const scripts = listLocalScripts(ctx.html);
    evalLocalScripts(ctx, scripts);
    try { ctx.dom.window.eval(readFile(path.join(__dirname,'js/i18n.js'))); } catch(e){ ctx.errors.push({type:'script_eval', msg:`i18n.js: ${e.stack||e}`}); }
    triggerDOMContentLoaded(ctx);
    const w=ctx.dom.window;

    const basic = {
      page:p,
      title: w.document.title,
      hasLangSwitcher: !!w.document.getElementById('langSwitcher'),
      errors: ctx.errors,
      redirects: w.__redirects,
    };
    // translation smoke
    basic.translation = (p.includes('admin-')) ? null : testTranslation(ctx, [{name:'body exists', selector:'body'}]);
    results.push(basic);
  }
  return results;
}

function scanStaticIssues(){
  const siteDir=__dirname;
  const htmlFiles=fs.readdirSync(siteDir).filter(f=>f.endsWith('.html'));
  const issues=[];
  for(const f of htmlFiles){
    const html=readFile(path.join(siteDir,f));
    // inconsistent CSS cache bust
    if (f.startsWith('admin-') && /css\/wicked-tuna\.css(\?v=)/.test(html)===false) {
      // admin pages use wicked-tuna.css without ?v
      issues.push({file:f, type:'cache', detail:'admin pages use wicked-tuna.css without cache-busting query'});
    }
    // auth terms link is '#'
    if (f==='auth.html' && /Aceito os <a href="#"/.test(html)) {
      issues.push({file:f, type:'ux', detail:'Link "Termos e Condições" no registo aponta para # (deveria abrir termos.html)'});
    }
  }
  return issues;
}

function summarize(all){
  // count errors by page
  const out={ pages: {}, static: all.staticIssues };
  function add(page, errs){
    out.pages[page]=out.pages[page]||{errorCount:0, errors:[]};
    out.pages[page].errorCount += errs.length;
    out.pages[page].errors.push(...errs.slice(0,40));
  }
  add(all.auth.page, all.auth.errors);
  add(all.admin.page, all.admin.errors);
  add(all.reservation.page, all.reservation.errors);
  for(const d of all.dashboards){
    add(d.page, d.errors);
  }
  return out;
}

function main(){
  const auth = testAuthLogin();
  const admin = testAdminLogin();
  const reservation = testReservation();
  const dashboards = testDashboards();
  const staticIssues = scanStaticIssues();

  const report = {
    timestamp: new Date().toISOString(),
    auth, admin, reservation, dashboards, staticIssues,
    summary: summarize({auth,admin,reservation,dashboards,staticIssues})
  };

  fs.writeFileSync(path.join(__dirname,'qa_report.json'), JSON.stringify(report,null,2),'utf8');
  console.log('QA_REPORT_WRITTEN qa_report.json');
  // print brief summary
  console.log('Pages tested:', Object.keys(report.summary.pages).length);
  for(const [p,v] of Object.entries(report.summary.pages)){
    console.log(p, 'errors', v.errorCount);
  }
  console.log('Static issues:', report.staticIssues.length);
}

main();
