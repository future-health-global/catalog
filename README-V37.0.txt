FUTURE HEALTH V37.0 — production stabilization build

Changes:
- Removed runtime loading chain of versioned override files; the application now loads one production runtime bundle plus the share renderer.
- Removed V36.21 View Transition wrapper that caused drawer/page flashes and unstable menu state.
- Share center now closes Search, left drawer and series drawer before navigation, so Search and Share are independent.
- Native date input now directly overlays the calendar icon, improving iPhone Safari date-picker reliability.
- Sender status is rendered once; removed hard-coded extra “ВАШ КОНСУЛЬТАНТ”.
- Status and sender name are kept on one line with controlled font fitting.
- Address fields wrap by measured pixel width and use different available width with/without avatar.
- Promotion and period fields wrap inside their fixed commercial column.
- Avatar crop metadata is persisted with the profile; clicking avatar reopens adjustment.
- Bottom navigation is explicitly five equal columns.
- QR remains enlarged in the upper-right card area.

Validation performed:
- JavaScript syntax checks passed for app.production.js, share-preview-core.js, products-data.js and qr-lib.js.
- Shipping index references only existing runtime files.
