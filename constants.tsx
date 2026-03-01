
import { Smartphone, Headphones, Speaker, Laptop, Monitor, Computer, Zap, Mouse, Keyboard, Gamepad2 } from 'lucide-react';
import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Mobile', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop', icon: 'Smartphone' },
  { id: '2', name: 'Earphone', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop', icon: 'Headphones' },
  { id: '3', name: 'Speaker', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop', icon: 'Speaker' },
  { id: '4', name: 'Laptop', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop', icon: 'Laptop' },
  { id: '5', name: 'Monitor', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', icon: 'Monitor' },
  { id: '6', name: 'PC', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=600&auto=format&fit=crop', icon: 'Computer' },
  { id: '10', name: 'Gaming Console', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=600&auto=format&fit=crop', icon: 'Gamepad2' },
  { id: '8', name: 'Keyboard', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop', icon: 'Keyboard' },
  { id: '9', name: 'Mouse', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', icon: 'Mouse' },
  { id: '7', name: 'Charger', productCount: 25, imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3bf9ff16a1?q=80&w=600&auto=format&fit=crop', icon: 'Zap' }
];

const imgPools: Record<string, string[]> = {
  Mobile: [
    'photo-1616348436168-de43ad0db179', 'photo-1610945265064-0e34e5519bbf', 'photo-1598327622309-c79b1dd1ca1c', 
    'photo-1511707171634-5f897ff02aa9', 'photo-1523206489230-c012c64b2b48', 'photo-1555774698-0b77e0d5fac6'
  ],
  Earphone: [
    'photo-1590658268037-6bf12165a8df', 'photo-1588423770574-91993ca0a85a', 'photo-1505740420928-5e560c06d30e', 'photo-1613040809024-b4ef7ba99bc3'
  ],
  Speaker: [
    'photo-1545454675-3531b543be5d', 'photo-1614613535308-eb5fbd3d2c17', 'photo-1608156639585-34a0a56ee6c9'
  ],
  Laptop: [
    'photo-1517336714731-489689fd1ca8', 'photo-1496181133206-80ce9b88a853', 'photo-1525547719571-a2d4ac8945e2'
  ],
  Monitor: [
    'photo-1527443224154-c4a3942d3acf', 'photo-1551645120-d70bfe84c826'
  ],
  PC: [
    'photo-1587831990711-23ca6441447b', 'photo-1595034335984-74898f0e03e0'
  ],
  Charger: [
    'photo-1625842268584-8f3bf9ff16a1', 'photo-1616440347437-b17f35b4976c', 'photo-1583863788434-e58a36330cf0'
  ],
  'Gaming Console': [
    'photo-1486401899868-0e435ed85128', 'photo-1605906302484-3c59f054bd02', 'photo-1606144042614-b2417e99c4e3', 'photo-1592155153842-c94054a914ce'
  ],
  Keyboard: [
    'photo-1511467687858-23d96c32e4ae', 'photo-1595225476474-87563907a212', 'photo-1618384881397-3c6d98210a8b', 'photo-1587829741301-dc798b83add3', 'photo-1541140134513-85a161dc4a00'
  ],
  Mouse: [
    'photo-1527864550417-7fd91fc51a46', 'photo-1615663248861-2446a85548d6', 'photo-1527814050087-37a4c7b99ed4', 'photo-1613141411244-0e4ac259d24d', 'photo-1612444530582-fc66183b16f7'
  ]
};

const generateProducts = (category: string, startId: string, basePrice: number, names: string[]): Product[] => {
  const pool = imgPools[category] || imgPools['Mobile'];
  
  return names.slice(0, 25).map((name, i) => {
    const rawPrice = Math.floor(basePrice * (0.8 + (Math.random() * 0.4)));
    const hasDiscount = Math.random() > 0.7; // 30% chance of discount
    const discountAmount = hasDiscount ? Math.floor(rawPrice * 0.15) : 0;
    const finalPrice = rawPrice - discountAmount;
    
    let primaryImgId = pool[i % pool.length];
    
    const otherImgs = pool
      .filter(id => id !== primaryImgId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(id => `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`);

    return {
      id: `${startId}-${i}`,
      name,
      price: `৳ ${finalPrice.toLocaleString()}`,
      discountPrice: hasDiscount ? `৳ ${rawPrice.toLocaleString()}` : undefined,
      category,
      description: `Premium ${name} exclusively at Tanvir Electronics. Designed for performance and elegance. Comes with official warranty and lifetime tech support.`,
      imageUrl: `https://images.unsplash.com/${primaryImgId}?q=80&w=800&auto=format&fit=crop`,
      images: [
        `https://images.unsplash.com/${primaryImgId}?q=80&w=800&auto=format&fit=crop`,
        ...otherImgs
      ],
      features: [
        'Advanced Next-Gen Technology',
        'Official 12-Month Warranty',
        'Tanvir Quality Certified',
        'High-End Performance'
      ],
      specs: {
        'Manufacturer': name.split(' ')[0],
        'Year': '2025 Edition',
        'Availability': 'In Stock',
        'Store': 'Tanvir Electronics'
      },
      reviews: []
    };
  });
};

const mobileNames = [
  'iPhone 16 Pro Max', 'Samsung Galaxy S25 Ultra', 'Google Pixel 9 Pro', 'OnePlus 13 Pro', 'Xiaomi 15 Ultra', 
  'Vivo X200 Pro', 'Oppo Find X8 Ultra', 'Nothing Phone 3', 'iPhone 16 Plus', 'Samsung Galaxy S25+',
  'Google Pixel 9', 'iPhone 15 Pro', 'OnePlus 12R', 'Xiaomi 14 Pro', 'Realme GT 6',
  'iPhone 15', 'Samsung Galaxy A55', 'Nothing Phone 2a', 'Poco F6 Pro', 'Motorola Edge 50 Ultra',
  'Samsung Galaxy Z Fold 6', 'Samsung Galaxy Z Flip 6', 'Sony Xperia 1 VI', 'Asus ROG Phone 9', 'Honor Magic 6 Pro'
];

const earphoneNames = [
  'Apple AirPods Pro 3', 'Sony WF-1000XM6', 'Bose QuietComfort Ultra', 'Sennheiser Momentum 5', 'Nothing Ear (3)',
  'Jabra Elite 11', 'Beats Fit Pro Gen 2', 'Sony WH-1000XM6', 'Apple AirPods Max 2', 'Bose 750 Wireless',
  'Galaxy Buds 3 Pro', 'Pixel Buds Pro 2', 'Marshall Major V', 'Sennheiser Accentum Plus', 'Soundcore Liberty 5',
  'Technics EAH-AZ85', 'Bang & Olufsen Beoplay EX', 'Bowers & Wilkins PI8', 'Master & Dynamic MW09', 'Nothing Ear (stick) 2',
  'Huawei FreeBuds Pro 4', 'Audio-Technica ATH-TWX10', 'Final Audio ZE9000', 'Status Between 4ANC', 'Hifiman Svanar Wireless'
];

const speakerNames = [
  'Sonos Era 300', 'Marshall Stanmore IV', 'JBL Boombox 4', 'Bose SoundLink Max', 'Harman Kardon Aura 5',
  'Sonos Move 3', 'Marshall Emberton III', 'JBL Pulse 6', 'Bose Portable Smart Speaker 2', 'Sony SRS-XV900',
  'Bang & Olufsen Beosound A2', 'Edifier S3000MKII', 'Marshall Woburn III', 'Klipsch The Sixes II', 'Devialet Phantom II',
  'Sonos Roam 2', 'JBL Flip 7', 'Apple HomePod Pro', 'Amazon Echo Show 10', 'Google Nest Audio Pro',
  'Naim Mu-so Qb 2nd Gen', 'Kef LSX II', 'Audioengine A5+ Wireless', 'Razer Leviathan V3 Pro', 'Logitech Z906'
];

const laptopNames = [
  'MacBook Pro 16 M4 Max', 'MacBook Air 15 M4', 'Dell XPS 14 Plus', 'HP Spectre x360 2025', 'Lenovo ThinkPad X1 Carbon G13',
  'Razer Blade 16 2025', 'ASUS ROG Zephyrus G16', 'Microsoft Surface Laptop 7', 'LG Gram Pro 16', 'Samsung Galaxy Book 4 Ultra',
  'ASUS Zenbook Duo 2025', 'Alienware m18 R2', 'MSI Titan GT77', 'HP Omen 17', 'Acer Predator Helios 18',
  'Framework Laptop 16', 'MacBook Pro 14 M4 Pro', 'Dell Latitude 9450', 'Lenovo Yoga 9i Gen 9', 'Gigabyte Aero 17',
  'Huawei MateBook X Pro 2025', 'Xiaomi Book Pro 16', 'Microsoft Surface Pro 10', 'ASUS Vivobook S 15 OLED', 'Sony Vaio Z Limited'
];

const monitorNames = [
  'Samsung Odyssey OLED G9', 'LG UltraGear 45" Curved', 'ASUS ROG Swift PG32UCDM', 'Alienware AW3225QF', 'Dell UltraSharp U3224K',
  'Apple Studio Display 2', 'Samsung ViewFinity S9 5K', 'LG UltraFine 27" 5K', 'BenQ SW321C Pro', 'MSI MPG 321URX OLED',
  'Gigabyte AORUS FO32U2', 'ASUS ProArt PA32UCXR', 'Sony Inzone M9 II', 'ViewSonic Elite XG321UG', 'Acer Predator X32 FP',
  'Corsair Xeneon Flex 45WQHD', 'Eizo ColorEdge CG319X', 'HP Z32k G3 4K', 'Philips Evnia 42M2N8900', 'Samsung Odyssey Ark Gen 2',
  'AOC Agon Pro AG274QXM', 'Dell Alienware AW3423DWF', 'LG DualUp 28MQ780', 'Samsung Smart Monitor M8', 'Lenovo Legion Y32p-30'
];

const pcNames = [
  'Tanvir Custom RTX 5090 Beast', 'Mac Studio M4 Ultra', 'HP Envy Desktop 2025', 'Lenovo Legion Tower 7i Gen 9', 'Dell XPS Desktop 8960',
  'Alienware Aurora R16', 'Apple iMac 24" M4', 'MSI Aegis RS 14th', 'Origin PC Millennium', 'Digital Storm Velox',
  'Maingear Vybe', 'Falcon Northwest Mach V', 'NZXT Player Three Prime', 'Corsair One i500', 'CyberPowerPC Gamer Supreme',
  'Skytech Azure 2', 'CLX Ra', 'Starforge Systems Voyager Creator', 'Intel NUC 14 Pro', 'Beelink SER8 Ryzen 7',
  'Mac Mini M4 Pro', 'Microsoft Surface Studio 3', 'ASUS ROG Strix G16CH', 'HP Omen 45L', 'Thermaltake LCGS Apollo'
];

const mouseNames = [
  'Logitech G502 Hero', 'Razer DeathAdder V3 Pro', 'Corsair Dark Core RGB Pro', 'SteelSeries Aerox 3', 'Glorious Model O Wireless',
  'Logitech G Pro X Superlight', 'Razer Basilisk V3', 'ASUS ROG Gladius III', 'Zowie EC2-C', 'Finalmouse Starlight-12',
  'Mad Catz R.A.T. 8+', 'Cooler Master MM711', 'MSI Clutch GM41', 'Roccat Kone Pro', 'EVGA X17 Gaming',
  'Redragon M908 Impact', 'HyperX Pulsefire Haste', 'Corsair Harpoon Wireless', 'Razer Viper V2 Pro', 'Logitech G305 Lightspeed',
  'Microsoft Bluetooth Ergonomic', 'Apple Magic Mouse 3', 'HP 930 Creator Wireless', 'Dell MS3220', 'Lenovo Legion M300'
];

const keyboardNames = [
  'Keychron K2 Wireless', 'Corsair K100 RGB', 'Razer BlackWidow V4 Pro', 'Logitech G915 TKL', 'SteelSeries Apex Pro',
  'ASUS ROG Strix Flare II', 'Ducky One 3 Mechanical', 'Anne Pro 2 Wireless', 'Wooting 60HE', 'Epomaker TH80 Pro',
  'HyperX Alloy Origins', 'EVGA Z20 Optical', 'Cooler Master CK550 V2', 'Roccat Vulcan II Max', 'Das Keyboard 6 Professional',
  'Varmilo VA87M', 'Leopold FC750R', 'Vortex Poker 3', 'Redragon K552 KUMARA', 'HHKB Professional Hybrid',
  'Logitech MX Keys S', 'Microsoft Sculpt Ergonomic', 'Apple Magic Keyboard', 'Dell KB216 Wired', 'HP Pavilion 600'
];

const chargerNames = [
  'Anker Prime 240W GaN Desktop', 'Apple 140W USB-C Adapter', 'Belkin BoostCharge Pro 4-Port', 'Satechi 165W USB-C GaN', 'Baseus 100W GaN5 Pro',
  'Ugreen Nexode 300W', 'Anker 737 Power Bank (PowerCore 24K)', 'Shargeek Storm 2', 'Samsung 65W Trio Charger', 'Spigen ArcDock 120W',
  'OnePlus SuperVOOC 100W', 'Xiaomi 120W HyperCharge Adapter', 'Native Union 67W Dual Port', 'Nomad Base One Max', 'Twelve South HiRise 3 Deluxe',
  'Mophie 3-in-1 Travel Charger', 'Belkin MagSafe 3-in-1 Stand', 'Anker MagGo Magnetic Charging', 'Peak Design Wireless Charging Stand', 'OtterBox 3-in-1 Charging Station',
  'Zagg Mophie Speedport 120', 'Satechi Duo Wireless Power Bank', 'Scosche BaseLynx 2.0', 'Pitaka MagEZ Slider 2', 'Razer USB-C 130W GaN'
];

const gamingNames = [
  'PlayStation 5 Pro', 'Xbox Series X Elite', 'Nintendo Switch OLED 2', 'Steam Deck OLED 1TB', 'ASUS ROG Ally X',
  'PlayStation 5 Slim', 'Xbox Series S 1TB Black', 'Nintendo Switch Lite', 'Lenovo Legion Go', 'MSI Claw A1M',
  'Ayaneo Kun', 'GPD Win 4', 'Analogue Pocket', 'Evercade EXP', 'Ayn Odin 2',
  'PlayStation VR2', 'Meta Quest 3S', 'Xbox Series X Halo Edition', 'Nintendo Switch Mario Red', 'PlayStation 5 Digital',
  'Valve Index VR Kit', 'Pico 4 Ultra', 'Razer Edge', 'Logitech G Cloud', 'NVIDIA Shield TV Pro'
];

export const PRODUCTS: Product[] = [
  ...generateProducts('Mobile', 'm', 95000, mobileNames),
  ...generateProducts('Earphone', 'e', 18000, earphoneNames),
  ...generateProducts('Speaker', 's', 28000, speakerNames),
  ...generateProducts('Laptop', 'l', 145000, laptopNames),
  ...generateProducts('Monitor', 'mn', 55000, monitorNames),
  ...generateProducts('PC', 'p', 185000, pcNames),
  ...generateProducts('Mouse', 'ms', 6500, mouseNames),
  ...generateProducts('Keyboard', 'kb', 12500, keyboardNames),
  ...generateProducts('Charger', 'c', 4500, chargerNames),
  ...generateProducts('Gaming Console', 'gc', 65000, gamingNames)
];

export const ICON_MAP: Record<string, any> = {
  Smartphone: Smartphone,
  Headphones: Headphones,
  Speaker: Speaker,
  Laptop: Laptop,
  Monitor: Monitor,
  Computer: Computer,
  Zap: Zap,
  Mouse: Mouse,
  Keyboard: Keyboard,
  Gamepad2: Gamepad2
};
