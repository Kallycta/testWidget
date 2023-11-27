const em = document.createElement('script');
em.type = 'text/javascript';
em.async = true;
em.src = 'icallback.js';
const s = document.getElementsByTagName('script')[0];
// noinspection JSCheckFunctionSignatures
s.parentNode.insertBefore(em, s);
