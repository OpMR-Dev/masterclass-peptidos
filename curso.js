/* Página de un curso: lee el curso de cursos.js según <body data-curso="..."> y arma
 * la información y el recuadro de pago (PayPal, Zelle y transferencias con comprobante). */
(function () {
  const A = window.ACADEMIA;
  const C = A.CURSOS.find(c => c.id === document.body.dataset.curso);
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const usd = v => 'US$' + Number(v).toFixed(0);
  if (!C) { document.body.innerHTML = '<p style="padding:40px">Curso no encontrado. <a href="index.html">Ver todos los cursos</a></p>'; return; }

  const inicio = new Date(C.fecha);
  const terminado = Date.now() > inicio.getTime() + (C.duracionMin || 120) * 6e4;
  const ICO = {
    cal: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C95A5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="15" height="15" rx="2"/><path d="M3 9h15M7.5 2.5v4M13.5 2.5v4"/><circle cx="17.5" cy="17.5" r="4.2" fill="#E3F4F8"/><path d="M17.5 15.6v2l1.3 1"/></svg>',
    mod: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C1A5B" stroke-width="1.6"><circle cx="6" cy="7" r="2.6"/><circle cx="17" cy="6" r="2.6"/><circle cx="11" cy="17.5" r="2.6"/><path d="M8.5 6.8 14.4 6.2M7.3 9.3l2.4 5.8M15.8 8.4l-3.6 6.8"/></svg>',
    ok: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C1A5B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 19.5 6v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.3-4.4"/></svg>'
  };

  document.title = C.tipo + ': ' + C.titulo;
  const nombresPago = Object.values(A.PAGOS.CUENTAS).map(c => c.titulo === 'Transferencia' ? c.corto : c.titulo);

  document.body.innerHTML = `
<header class="top"><div class="wrap">
  <a class="brand" href="index.html" style="text-decoration:none">Academia <span>Péptidos</span></a>
  <div class="pill">${esc(C.tipo)}</div>
</div></header>

<div class="hero">
  <img class="art flyer" src="${esc(C.imagen)}" alt="${esc(C.tipo + ': ' + C.titulo)}">
  <div class="wrap"><div class="hero-copy">
    <div class="bar"></div>
    <h1>${esc(C.titular || C.titulo)} ${C.titularColor ? '<span class="t2">' + esc(C.titularColor) + '</span>' : ''}</h1>
    <p class="kicker">${esc(C.tipo)}</p>
    <p class="sub">${esc(C.subtitulo || C.resumen)}</p>
    <div class="when">
      <div class="ico" aria-hidden="true">${ICO.cal}</div>
      <div class="txt"><b>${esc(C.fechaTexto)}</b><small>Hora de República Dominicana · ${esc(C.lugar)}</small><span id="local"></span></div>
    </div>
    <a class="cta" href="#pago">${terminado ? 'Ver otros cursos' : 'Inscribirme por ' + usd(C.precioUSD)}</a>
  </div></div>
</div>

<main class="wrap"><div class="grid">
  <div>
    ${C.temario ? `<section><div class="bar"></div><h2>Lo que <span class="t2">vas a aprender</span></h2>
      <div class="mods">${C.temario.map(t => `<div class="mod"><div class="circle">${ICO.mod}</div>
        <div class="body"><h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></div></div>`).join('')}</div></section>` : ''}

    ${C.incluye && C.incluye.length ? `<section><div class="bar"></div><h2>Incluye</h2>
      <div class="mods">${C.incluye.map(t => `<div class="mod"><div class="circle">${ICO.ok}</div>
        <div class="body"><h3>${esc(t)}</h3></div></div>`).join('')}</div></section>` : ''}

    <section><div class="bar"></div><h2>Imparten</h2>
      <div class="people">${A.EXPOSITORAS.map(p => `<div class="p"><img src="${esc(p.foto)}" alt=""><div><b>${esc(p.nombre)}</b><span>${esc(p.area)}</span></div></div>`).join('')}</div>
    </section>

    <section><div class="bar"></div><h2>Preguntas <span class="t2">frecuentes</span></h2>
      <details><summary>¿Cómo pago?</summary><p>Con PayPal, Zelle o transferencia bancaria en ${esc(nombresPago.filter(n => n !== 'Zelle').join(', '))}. Elige tu opción en el recuadro de inscripción.</p></details>
      <details><summary>¿Cómo recibo el acceso?</summary><p>Sube la foto o el PDF de tu comprobante en el mismo recuadro. Cuando verificamos el pago, te enviamos por correo ${esc(C.accesoTexto || 'el acceso')}.</p></details>
      <details><summary>¿En qué moneda pago?</summary><p>El precio es ${usd(C.precioUSD)}${C.montoLocal && C.montoLocal.DO ? ' (' + esc(C.montoLocal.DO) + ' en República Dominicana)' : ''}. Si transfieres en otra moneda local, envía el equivalente al cambio del día.</p></details>
    </section>
  </div>

  <aside><div class="card" id="pago">
    <div id="checkout">
      <div class="offer">
        <div class="lbl">Inversión <span>pago único</span></div>
        <div class="price"><b>${usd(C.precioUSD)}</b></div>
        ${C.montoLocal && C.montoLocal.DO ? `<div class="local-price">${esc(C.montoLocal.DO)} en República Dominicana</div>` : ''}
      </div>
      <div class="pay" id="pay-box"></div>
    </div>
    <div class="done" id="received" tabindex="-1">
      <div class="bar"></div>
      <h2>Comprobante recibido</h2>
      <p>Gracias. Verificamos tu pago y te enviamos ${esc(C.accesoTexto || 'el acceso')} a <b id="rec-email"></b>, normalmente en pocas horas.</p>
      <p>Si tienes una duda, escríbenos por WhatsApp e indica tu nombre.</p>
      <p><a href="index.html">Ver otros cursos</a></p>
    </div>
  </div></aside>
</div></main>

<footer><div class="wrap">${esc(C.tipo)} | ${esc(C.titulo)}. Contenido dirigido a profesionales de la salud. · <a href="index.html">Todos los cursos</a></div></footer>`;

  // Hora en la zona de quien visita
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && tz !== 'America/Santo_Domingo') {
      const f = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' });
      $('local').textContent = 'En tu hora: ' + f.format(inicio);
    }
  } catch (e) {}

  if (terminado) {
    $('pay-box').innerHTML = '<p>Este curso ya se realizó.</p><a class="cta send" href="index.html">Ver los próximos cursos</a>';
    document.querySelector('.hero .cta').href = 'index.html';
    return;
  }

  /* ---------- Recuadro de pago ---------- */
  $('pay-box').innerHTML = `
    <ol class="steps">
      <li><div class="legend">Tus datos</div>
        <div class="field"><label for="nombre">Nombre completo</label><input id="nombre" type="text" autocomplete="name"></div>
        <div class="field"><label for="email">Correo</label><input id="email" type="email" autocomplete="email"><div class="hint">Aquí te llega el acceso.</div></div>
        <div class="field"><label for="whatsapp">WhatsApp</label><input id="whatsapp" type="tel" autocomplete="tel" placeholder="+1 809 000 0000"></div>
      </li>
      <li><div class="legend">Elige cómo pagar</div>
        <div class="methods" id="methods" role="radiogroup" aria-label="Método de pago"></div>
        <div class="panel" id="panel" hidden><div class="info" id="cuentas"></div></div>
      </li>
      <li id="step-upload" hidden><div class="legend">Envía tu comprobante</div>
        <div class="field"><label for="archivo">Foto o PDF del comprobante</label><input id="archivo" type="file" accept="image/*,application/pdf"><div class="hint">Máximo 5 MB.</div></div>
        <div class="field"><label for="referencia">Número de referencia (opcional)</label><input id="referencia" type="text" autocomplete="off"></div>
        <button class="cta send" id="send" type="button">Enviar comprobante</button>
      </li>
    </ol>
    <div class="msg" id="msg" role="alert"></div>
    <p class="fine">Pago único. Recibirás la confirmación y el acceso en tu correo.</p>`;

  const P = A.PAGOS;
  let metodo = null;
  const show = (t, type) => { $('msg').textContent = t; $('msg').className = 'msg ' + type; };
  const clearMsg = () => { $('msg').className = 'msg'; };
  const buyer = () => ({ nombre: $('nombre').value.trim(), email: $('email').value.trim(), whatsapp: $('whatsapp').value.trim() });

  function kv(label, value) {
    return '<div class="kv"><span>' + esc(label) + '</span><span><code' + (value.length > 16 ? ' class="long"' : '') + '>' + esc(value) + '</code> ' +
      '<button type="button" class="copy" data-copy="' + esc(value.replace(/\s/g, '')) + '">Copiar</button></span></div>';
  }
  function montoTexto(k) {
    const local = (C.montoLocal || {})[k];
    if (P.CUENTAS[k] && P.CUENTAS[k].usd) return 'Monto: <b>' + usd(C.precioUSD) + '</b>.';
    return 'Monto: <b>' + usd(C.precioUSD) + '</b>' +
      (local ? ' (' + esc(local) + ')' : ' o su equivalente en moneda local al cambio del día') + '.';
  }

  const opciones = [{ id: 'paypal', titulo: 'PayPal', sub: 'envío a nuestro correo' }]
    .concat(Object.keys(P.CUENTAS).map(k => ({ id: k, titulo: P.CUENTAS[k].titulo || 'Transferencia', sub: P.CUENTAS[k].corto })));
  $('methods').innerHTML = opciones.map(o =>
    '<label class="method"><input type="radio" name="metodo" value="' + o.id + '"><span>' + esc(o.titulo) +
    '<small>' + esc(o.sub) + '</small></span></label>').join('');

  $('methods').addEventListener('change', e => {
    metodo = e.target.value; clearMsg();
    $('panel').hidden = false; $('step-upload').hidden = false;
    if (metodo === 'paypal') {
      const p = P.PAYPAL;
      $('cuentas').innerHTML = '<div class="acct"><div class="bank">PayPal</div><div class="who">Titular: ' + esc(p.titular) + '</div>' +
        kv('Correo', p.correo) +
        (p.enlace ? '<div class="kv"><span>Enlace</span><a href="' + esc(p.enlace) + '" target="_blank" rel="noopener">Pagar con PayPal</a></div>' : '') +
        (p.qr ? '<img class="qr" src="' + esc(p.qr) + '" alt="Código QR de PayPal">' : '') +
        '<p class="amount">Envía <b>' + usd(C.precioUSD) + '</b> como pago a este correo y luego sube tu comprobante.</p></div>';
    } else {
      const c = P.CUENTAS[metodo];
      $('cuentas').innerHTML = c.cuentas.map(a =>
        '<div class="acct"><div class="bank">' + esc(a.banco) + '</div><div class="who">Titular: ' + esc(a.titular) + '</div>' +
        a.datos.map(d => kv(d[0], d[1])).join('') + '</div>').join('') +
        '<p class="amount" style="padding-bottom:10px">' + montoTexto(metodo) +
        (c.cuentas.length > 1 ? ' Transfiere a cualquiera de estas cuentas' : ' Envía el pago') + ' y luego sube tu comprobante.</p>';
    }
  });

  document.addEventListener('click', async e => {
    const b = e.target.closest('.copy'); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copiado'; }
    catch (err) { b.textContent = 'Selecciona y copia'; }
    setTimeout(() => b.textContent = 'Copiar', 1800);
  });

  const leerArchivo = file => new Promise((ok, fail) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(',')[1]);
    r.onerror = fail;
    r.readAsDataURL(file);
  });

  $('send').addEventListener('click', async () => {
    clearMsg();
    const b = buyer(), file = $('archivo').files[0], missing = [];
    if (b.nombre.length < 3) missing.push('nombre completo');
    if (!/^\S+@\S+\.\S+$/.test(b.email)) missing.push('un correo válido');
    if (b.whatsapp.replace(/\D/g, '').length < 8) missing.push('WhatsApp con código de país');
    if (!metodo) missing.push('método de pago');
    if (!file) missing.push('foto o PDF del comprobante');
    if (missing.length) { show('Completa: ' + missing.join(', ') + '.', 'error'); return; }
    if (!/^image\/|application\/pdf/.test(file.type)) { show('El comprobante debe ser una imagen o un PDF.', 'error'); return; }
    if (file.size > 5 * 1024 * 1024) { show('El archivo pesa más de 5 MB. Envía una captura de pantalla o una foto más liviana.', 'error'); return; }

    const btn = $('send');
    btn.disabled = true; btn.textContent = 'Enviando…';
    try {
      const res = await fetch(A.SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // evita el bloqueo CORS de Apps Script
        body: JSON.stringify({
          action: 'comprobante', curso: C.id, ...b,
          metodo: metodo === 'paypal' ? 'PayPal (comprobante)' : P.CUENTAS[metodo].metodo,
          referencia: $('referencia').value.trim(),
          monto: C.precioUSD, moneda: 'USD',
          archivo: { nombre: file.name, tipo: file.type, base64: await leerArchivo(file) }
        })
      });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || 'Error');
      $('checkout').style.display = 'none';
      $('rec-email').textContent = b.email;
      $('received').style.display = 'block'; $('received').focus();
    } catch (err) {
      show('No pudimos enviar tu comprobante. Revisa tu conexión y vuelve a intentarlo.', 'error');
      btn.disabled = false; btn.textContent = 'Enviar comprobante';
    }
  });
})();
