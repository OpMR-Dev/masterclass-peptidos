/* =====================================================================
 * CENTRAL DE CURSOS: datos compartidos por todas las páginas
 * - index.html (la central) muestra los cursos de CURSOS
 * - Cada página de curso usa PAGOS para mostrar las cuentas
 * Para agregar un curso: copia un bloque de CURSOS y cambia los datos.
 * ===================================================================== */
window.ACADEMIA = {
  // Web App de Apps Script (termina en /exec)
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyqX1-TAREARN2dAc7PfeynJGfSAlWVOKI1kJUGug26Z5DlP_uihVJWESS1imKMuwMGVg/exec',

  EXPOSITORAS: [
    { nombre: 'Dra. Katheryn Escorcia', area: 'Medicina estética y bioestimulación', foto: 'img/katheryn-escorcia.jpg' },
    { nombre: 'Dra. Greicy Castillo', area: 'Armonización facial y manejo de péptidos', foto: 'img/greicy-castillo.jpg' },
    { nombre: 'Dra. Ana Sánchez', area: 'Nutrición clínica y metabolismo', foto: 'img/ana-sanchez.jpg' }
  ],

  /* ----------------------- CURSOS -----------------------
   * id:      corto y sin espacios; se guarda en la hoja "Pagos"
   * pagina:  archivo de la página del curso
   * fecha:   con zona horaria (-04:00 = República Dominicana)
   * duracionMin: al terminar, el curso sale de "Próximos"
   * precioUSD: número sin símbolo
   * montoLocal: opcional, por país (DO, CR, CO)
   */
  CURSOS: [
    {
      id: 'estetica-2026-10',
      tipo: 'Masterclass online',
      titulo: 'Péptidos y sus usos en estética',
      resumen: 'Fundamentos, aplicaciones, protocolos y combinaciones de los péptidos en medicina estética y regenerativa.',
      fecha: '2026-10-13T19:00:00-04:00',
      fechaTexto: 'Martes 13 de octubre, 7:00 p. m.',
      duracionMin: 120,
      lugar: 'Google Meet',
      precioUSD: '30.00',
      montoLocal: { DO: 'RD$1,500' },
      imagen: 'img/masterclass-estetica.jpg',
      pagina: 'estetica.html',
      incluye: ['Certificado digital de participación'],
      // Lo que usa la página del curso (estetica.html)
      titular: 'Péptidos', titularColor: 'y sus usos en estética',
      subtitulo: 'Una actualización diseñada para llevar la ciencia de los péptidos a la práctica clínica, de la mano de tres especialistas.',
      temario: [
        { titulo: 'Qué son los péptidos', texto: 'Tipos y mecanismos de acción.' },
        { titulo: 'Aplicaciones en estética', texto: 'Rostro, cuerpo y regeneración celular.' },
        { titulo: 'Protocolos y combinaciones', texto: 'Cómo integrarlos en tus tratamientos.' }
      ],
      // Texto que ve la persona después de enviar el comprobante
      accesoTexto: 'el enlace de Google Meet de la masterclass'
    },
    {
      id: 'taller',
      tipo: 'Taller',
      titulo: 'Biomoduladores del apetito y activos avanzados',
      resumen: 'Péptidos en la práctica clínica: metabolismo, longevidad y regeneración. Mecanismo, protocolo y criterio de seguridad.',
      fecha: '2026-10-08T18:00:00-04:00',
      fechaTexto: 'Jueves 8 de octubre, 6:00 p. m.',
      duracionMin: 240,
      lugar: 'En línea',
      precioUSD: '600.00',
      imagen: 'img/taller-hero.jpg',
      pagina: 'taller.html',
      incluye: ['Certificación avalada', 'Grabación por 10 días', 'Grupo médico de WhatsApp']
    }
  ],

  /* ----------------------- MÉTODOS DE PAGO ----------------------- */
  PAGOS: {
    PAYPAL: {
      correo: 'aleidamaldonadosalas17@gmail.com',
      titular: 'Aleida Maldonado',
      enlace: '',   // opcional: enlace paypal.me
      qr: ''        // opcional: imagen del código QR
    },
    // Cada entrada aparece como una opción de pago.
    // usd: true = se paga en dólares (no se muestra "equivalente en moneda local")
    CUENTAS: {
      US: { titulo: 'Zelle', corto: 'Estados Unidos', metodo: 'Zelle', usd: true, cuentas: [
        { banco: 'Zelle', titular: 'Vladimir Cruz', datos: [['Número', '9292635452']] }
      ]},
      DO: { titulo: 'Transferencia', corto: 'Rep. Dominicana', metodo: 'Transferencia República Dominicana', cuentas: [
        { banco: 'BHD', titular: 'Katheryn Escorcia Maldonado', datos: [['Cuenta de ahorros', '37347730011']] },
        { banco: 'Banreservas', titular: 'Katheryn Escorcia Maldonado', datos: [['Cuenta de ahorros', '96085058536']] },
        { banco: 'AFAP', titular: 'Greicy Castillo', datos: [['Cuenta', '1022133284']] },
        { banco: 'Promerica', titular: 'Greicy Castillo', datos: [['Cuenta', '12110000459-459']] },
        { banco: 'Banco Popular', titular: 'Ana María Sánchez', datos: [['Cuenta de ahorros', '781120712']] }
      ]},
      CR: { titulo: 'Transferencia', corto: 'Costa Rica', metodo: 'Transferencia Costa Rica', cuentas: [
        { banco: 'SINPE Móvil', titular: 'Jerson Mora Hernández', datos: [['Número', '72990240']] },
        { banco: 'Banco Nacional de Costa Rica', titular: 'Jerson Mora Hernández', datos: [['Cuenta', '701091225'], ['Cédula', '304640218']] },
        { banco: 'Banco BAC', titular: 'Jerson Mora Hernández', datos: [['Cuenta BAC', '701091225'], ['IBAN', 'CR13010200007010912259']] }
      ]},
      CO: { titulo: 'Transferencia', corto: 'Colombia', metodo: 'Transferencia Colombia', cuentas: [
        { banco: 'Nequi', titular: 'Aleida Maldonado', datos: [['Número', '3146352423']] },
        { banco: 'Bancolombia', titular: 'Aleida Maldonado', datos: [['Cuenta de ahorros', '486 622 394-48']] }
      ]}
    }
  }
};
