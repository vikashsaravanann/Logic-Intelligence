const fs = require('fs');

let file1 = 'src/app/api/admin/send-trigger/route.ts';
let code1 = fs.readFileSync(file1, 'utf8');
code1 = code1.replace(/invoiceUrl:/g, 'paymentLink:');
fs.writeFileSync(file1, code1);

let file2 = 'src/app/admin/components/AdminTriggers.tsx';
let code2 = fs.readFileSync(file2, 'utf8');
code2 = code2.replace(/invoiceUrl:/g, 'paymentLink:');
code2 = code2.replace(/formData\.invoiceUrl/g, 'formData.paymentLink');
code2 = code2.replace(/name="invoiceUrl"/g, 'name="paymentLink"');
code2 = code2.replace(/Invoice URL/g, 'Payment Link');
fs.writeFileSync(file2, code2);
