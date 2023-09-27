import React, { useEffect } from 'react';
import QRious from 'qrious';

function QRCodeGenerator({ qrUrlpath }) { // Destructure qrUrlpath from props
  useEffect(() => {
    const qr = new QRious({
      background: 'white',
      backgroundAlpha: 0.8,
      foreground: 'blue',
      foregroundAlpha: 0.8,
      level: 'H',
      padding: 25,
      size: 300,
      value: qrUrlpath, // Use qrUrlpath directly as the value
    });

    // Display the QR code in a container div with the id "qrcode"
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';
    qrcodeContainer.appendChild(qr.image);
  }, [qrUrlpath]); // Add qrUrlpath to the dependency array

  return (
    <div>
      <h1>QR Code Generator</h1>
      
      <div id="qrcode"></div>
    </div>
  );
}




export default QRCodeGenerator;
