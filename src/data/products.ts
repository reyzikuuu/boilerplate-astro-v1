// =============================================================================
// PRODUCTS DATA — Pusat Data Katalog Produk
// =============================================================================
// Semua informasi produk dikumpulkan di sini.
// Untuk menambah produk baru, duplikasi salah satu objek di array `products`
// dan ganti datanya.
//
// Cara pakai: import { getAllProducts, getProductBySlug } from '@data/products';
// =============================================================================

// ---------------------------------------------------------------------------
// INTERFACES
// ---------------------------------------------------------------------------

/** Bahan kain yang tersedia untuk produk */
export interface Material {
  /** Path gambar bahan (rasio 1:1, kecil) */
  image: string;
  /** Nama bahan */
  name: string;
  /** Deskripsi singkat bahan */
  description: string;
}

/** Data ukuran untuk size chart */
export interface SizeData {
  /** Label ukuran (S, M, L, dst) */
  size: string;
  /** Lebar dada (cm) */
  chest: string;
  /** Panjang badan (cm) */
  length: string;
  /** Panjang lengan (cm) */
  sleeve: string;
}

/** Produk lengkap */
export interface Product {
  /** URL slug (tanpa spasi, lowercase, pakai dash) */
  slug: string;
  /** Nama produk */
  name: string;
  /** Deskripsi singkat (untuk card listing) */
  shortDescription: string;
  /** Deskripsi lengkap (untuk halaman detail) */
  description: string;
  /** Fitur unggulan produk (bullet points) */
  features: string[];
  /** Array path gambar produk (gambar pertama = utama) */
  images: string[];
  /** Pilihan bahan kain (6 item) */
  materials: Material[];
  /** Data size chart */
  sizes: SizeData[];
  /** Path gambar size chart */
  sizeChartImage: string;
  /** Pesan WhatsApp kustom saat klik CTA */
  whatsappMessage: string;
}

// ---------------------------------------------------------------------------
// DATA PRODUK
// ---------------------------------------------------------------------------
// INSTRUKSI MENGGANTI GAMBAR:
// 1. Taruh gambar di folder public/catalog/[nama-produk]/
// 2. Ganti path placeholder di bawah dengan path gambar Anda
//    Contoh: '/catalog/kemeja-pdh/foto-1.webp'
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // =========================================================================
  // PRODUK 1: Kemeja PDH Custom
  // =========================================================================
  {
    slug: 'kemeja-pdh-custom',
    name: 'Kemeja PDH Custom',
    shortDescription: 'Kemeja PDH custom bordir 3D untuk instansi & korporat. Material premium, jahitan presisi.',
    description: 'Kemeja PDH (Pakaian Dinas Harian) custom dengan bordir 3D berkualitas tinggi. Dirancang khusus untuk instansi pemerintah, BUMN, dan korporat yang mengutamakan citra profesional. Setiap kemeja melalui proses QC ketat untuk memastikan kualitas terbaik.',
    features: [
      'Bordir 3D timbul presisi tinggi',
      'Kancing tersembunyi (hidden placket) opsional',
      'Jahitan rantai pada bagian kritis',
      'Label custom dengan logo instansi',
      'Pilihan kantong 1 atau 2 sisi',
      'Tersedia ukuran S hingga 4XL',
    ],
    images: [
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
    ],
    materials: [
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Oxford Premium',
        description: 'Kain tebal dan bertekstur, cocok untuk tampilan formal. Breathable dan tahan lama.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Twill Cotton',
        description: 'Kombinasi katun dan polyester dengan pola diagonal. Halus dan nyaman seharian.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Poplin Stretch',
        description: 'Kain ringan dengan serat elastis. Fleksibel untuk mobilitas tinggi.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Dobby Jacquard',
        description: 'Motif tenunan halus yang elegan. Memberikan kesan mewah dan eksklusif.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Japanese Drill',
        description: 'Kain drill tebal asal Jepang. Sangat kokoh, ideal untuk seragam lapangan.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Cool Max',
        description: 'Teknologi pendingin aktif yang menyerap keringat. Sempurna untuk iklim tropis.',
      },
    ],
    sizes: [
      { size: 'S', chest: '104', length: '70', sleeve: '58' },
      { size: 'M', chest: '108', length: '72', sleeve: '59' },
      { size: 'L', chest: '112', length: '74', sleeve: '60' },
      { size: 'XL', chest: '116', length: '76', sleeve: '61' },
      { size: '2XL', chest: '120', length: '78', sleeve: '62' },
      { size: '3XL', chest: '124', length: '80', sleeve: '63' },
    ],
    sizeChartImage: '/catalog/placeholder-sizechart.svg',
    whatsappMessage: 'Halo Bradwear, saya tertarik dengan Kemeja PDH Custom. Bisa minta info lebih lanjut?',
  },

  // =========================================================================
  // PRODUK 2: Kemeja Tactical Premium
  // =========================================================================
  {
    slug: 'kemeja-tactical-premium',
    name: 'Kemeja Tactical Premium',
    shortDescription: 'Kemeja tactical serbaguna untuk kerja lapangan. Desain militer modern, material super kuat.',
    description: 'Kemeja Tactical Premium dengan desain terinspirasi militer modern. Cocok untuk petugas lapangan, outdoor, dan kegiatan operasional yang membutuhkan ketahanan dan kenyamanan ekstra. Dilengkapi fitur fungsional seperti kantong velcro dan ventilasi tersembunyi.',
    features: [
      'Desain tactical dengan aksen militer modern',
      'Kantong velcro removable di lengan',
      'Ventilasi tersembunyi di area punggung',
      'Reinforced stitching pada titik stres',
      'Loop epaulet untuk ID atau aksesori',
      'Tersedia ukuran S hingga 4XL',
    ],
    images: [
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
    ],
    materials: [
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Ripstop Canvas',
        description: 'Kain anti-robek dengan grid reinforcement. Sangat tangguh untuk kondisi berat.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Tactical Poly-Cotton',
        description: 'Campuran 65/35 polyester-katun. Tahan kusut dan cepat kering.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Cordura Lite',
        description: 'Material Cordura ringan dengan ketahanan abrasi tinggi. Standar militer.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Dry-Fit Pro',
        description: 'Teknologi moisture-wicking canggih. Menjaga tubuh tetap kering dan sejuk.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Japanese Drill',
        description: 'Kain drill tebal asal Jepang. Sangat kokoh, ideal untuk seragam lapangan.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Micro Taslan',
        description: 'Kain waterproof ringan. Tahan percikan air dan angin, ideal untuk outdoor.',
      },
    ],
    sizes: [
      { size: 'S', chest: '106', length: '71', sleeve: '59' },
      { size: 'M', chest: '110', length: '73', sleeve: '60' },
      { size: 'L', chest: '114', length: '75', sleeve: '61' },
      { size: 'XL', chest: '118', length: '77', sleeve: '62' },
      { size: '2XL', chest: '122', length: '79', sleeve: '63' },
      { size: '3XL', chest: '126', length: '81', sleeve: '64' },
    ],
    sizeChartImage: '/catalog/placeholder-sizechart.svg',
    whatsappMessage: 'Halo Bradwear, saya tertarik dengan Kemeja Tactical Premium. Bisa minta info lebih lanjut?',
  },

  // =========================================================================
  // PRODUK 3: Wearpack Lapangan Custom
  // =========================================================================
  {
    slug: 'wearpack-lapangan-custom',
    name: 'Wearpack Lapangan Custom',
    shortDescription: 'Wearpack custom untuk industri & lapangan. Desain ergonomis, tahan kondisi kerja berat.',
    description: 'Wearpack Lapangan Custom dirancang untuk kebutuhan industri, pertambangan, dan pekerjaan lapangan berat. Dengan desain ergonomis dan material heavy-duty, wearpack ini memberikan perlindungan maksimal tanpa mengorbankan kenyamanan dan mobilitas.',
    features: [
      'Desain ergonomis untuk mobilitas optimal',
      'Reflective strip 3M untuk keselamatan',
      'Multiple pockets untuk alat kerja',
      'Reinforced knee dan elbow patches',
      'Zipper YKK heavy-duty',
      'Tersedia ukuran S hingga 4XL',
    ],
    images: [
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
      '/catalog/placeholder-product.svg',
    ],
    materials: [
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Drill American',
        description: 'Kain drill tebal standar industri. Tahan aus dan cocok untuk kerja berat.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Japan Drill 280gsm',
        description: 'Drill Jepang premium dengan gramasi tinggi. Ekstra tebal dan tahan lama.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Twill Heavy Duty',
        description: 'Kain twill dengan ketebalan ekstra. Tahan gesekan dan kondisi lapangan.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Ripstop Industrial',
        description: 'Kain anti-robek kelas industri. Dilengkapi coating tahan minyak.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Cotton Canvas',
        description: 'Kanvas katun murni yang breathable. Nyaman untuk pemakaian jangka panjang.',
      },
      {
        image: '/catalog/placeholder-material.svg',
        name: 'Poly-Viscose',
        description: 'Campuran polyester-viscose yang lembut. Anti-kusut dan mudah perawatan.',
      },
    ],
    sizes: [
      { size: 'S', chest: '108', length: '72', sleeve: '60' },
      { size: 'M', chest: '112', length: '74', sleeve: '61' },
      { size: 'L', chest: '116', length: '76', sleeve: '62' },
      { size: 'XL', chest: '120', length: '78', sleeve: '63' },
      { size: '2XL', chest: '124', length: '80', sleeve: '64' },
      { size: '3XL', chest: '128', length: '82', sleeve: '65' },
    ],
    sizeChartImage: '/catalog/placeholder-sizechart.svg',
    whatsappMessage: 'Halo Bradwear, saya tertarik dengan Wearpack Lapangan Custom. Bisa minta info lebih lanjut?',
  },
];

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

/** Ambil semua produk */
export function getAllProducts(): Product[] {
  return products;
}

/** Ambil produk berdasarkan slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Ambil semua slug untuk static paths */
export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
