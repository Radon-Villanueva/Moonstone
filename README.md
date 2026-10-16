# Moonstone standalone app

Open `index.html` directly in a modern desktop browser. No server, installation,
build step, network connection, or Base44 account is required.

Project data is stored in the browser's local storage. Use **Export JSON**
regularly; local files opened in different browsers or browser profiles do not
share storage.

## Included

- Multiple locally saved projects
- Project creation and JSON import/export
- Translation request, translation, QA, consensus, finalisation, and final
  report stages
- Dynamic and segmented translation modes with preserved snapshots
- Segment reordering and audit history
- Interactive timeline/simple review history
- ZIP export for all projects
- Styled, browser-generated PDF reports
- Offline workflow reference guide
- Responsive desktop/mobile layout

## Differences from the Base44/React project

- Base44 authentication and hosted collaboration are intentionally absent.
- Segment reordering uses explicit up/down controls rather than pointer-based
  dragging, which keeps it reliable when opened through `file://`.
- The downloadable PDF is styled and paginated, but uses the standard PDF
  Helvetica/Times fonts. Some scripts outside the built-in PDF character set
  may not render correctly; all text remains intact in the application and
  JSON exports.
- Browser security and download behavior for `file://` pages varies. Chrome,
  Edge, Firefox, and Safari may ask permission for multiple downloads.
