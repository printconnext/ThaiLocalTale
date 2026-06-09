import './globals.css';

export const metadata = {
  title: 'Thai Local Tale | เรื่องเล่าจากท้องถิ่นไทยที่คุณอาจไม่เคยรู้',
  description: 'ไทยโลคอลเทล (Thai Local Tale) - เรื่องเล่าจากคนท้องถิ่น วัฒนธรรม สถานที่ท่องเที่ยว อาหาร และวิถีชีวิตไทยที่คุณอาจไม่เคยรู้',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <meta charSet="UTF-8" />
        
        {/* Google Fonts: Playfair Display, Caveat, Outfit, Oswald, Sarabun */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300;400;500;600;700&family=Oswald:wght@500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* FontAwesome Icons for Socials and UI */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
