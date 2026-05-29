import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppModule } from '../app.module';
import { Category } from '../modules/categories/schemas/category.schema';
import { Product } from '../modules/products/schemas/product.schema';
import { Blog } from '../modules/blogs/schemas/blog.schema';
import { Banner, BannerKind } from '../modules/banners/schemas/banner.schema';
import { Offer } from '../modules/offers/schemas/offer.schema';
import { Testimonial } from '../modules/testimonials/schemas/testimonial.schema';

const logger = new Logger('Seed');

const categories = [
  { name: 'Petticoats', slug: 'petticoats', description: 'Soft cotton petticoats, inskirts and underskirts crafted for daily comfort and lasting wear.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80', productCount: 3, order: 1 },
  { name: 'Lungis', slug: 'lungis', description: 'Traditional cotton and handloom lungis in solid colours, checks and authentic Erode weaves.', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80', productCount: 5, order: 2 },
  { name: 'Towels', slug: 'towels', description: 'Highly absorbent cotton bath towels — soft on skin, built to last wash after wash.', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&auto=format&fit=crop&q=80', productCount: 2, order: 3 },
  { name: 'Gamcha', slug: 'gamcha', description: 'Lightweight, quick-drying cotton gamcha and gumcha — a south Indian everyday essential.', image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80', productCount: 3, order: 4 },
  { name: 'Bed Sheets', slug: 'bed-sheets', description: 'Pure cotton bed sheets in single, double and king sizes — soft hand-feel, fast colours.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80', productCount: 2, order: 5 },
  { name: 'Handloom', slug: 'handloom', description: 'Heritage handloom range woven by skilled weavers across the Erode-Karur belt.', image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80', productCount: 2, order: 6 },
  { name: 'Dhoti', slug: 'dhoti', description: 'Classic white and bordered cotton dhotis for daily wear, weddings and temple visits.', image: 'https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=1200&auto=format&fit=crop&q=80', productCount: 2, order: 7 },
];

const products = [
  // Petticoats
  { name: 'Premium Cotton Petticoat', slug: 'premium-cotton-petticoat', category: 'petticoats', subcategory: 'Cotton Petticoat', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1200&auto=format&fit=crop&q=80'], description: 'Soft 100% cotton petticoat with an elasticated drawstring waist. Breathable, comfortable and ideal for daily wear under sarees.', clothType: 'Cotton', colors: ['White', 'Maroon', 'Black', 'Navy', 'Beige'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 320, offerPrice: 249, originalPrice: 349, material: '100% Pure Cotton', gsm: '150 GSM', pattern: 'Solid', washable: true, featured: true, newArrival: false, rating: 4.6, reviews: 142, tags: ['cotton', 'petticoat', 'daily-wear'] },
  { name: 'Saree Inskirt — Soft Cotton', slug: 'saree-inskirt-soft-cotton', category: 'petticoats', subcategory: 'Inskirt', images: ['https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1200&auto=format&fit=crop&q=80'], description: 'Lightweight saree inskirt with a smooth fall — designed to glide effortlessly under chiffon, georgette and silk sarees.', clothType: 'Cotton Blend', colors: ['White', 'Cream', 'Skin', 'Black', 'Maroon', 'Pink'], sizes: ['Free Size', 'L', 'XL', 'XXL'], stock: 180, offerPrice: 199, originalPrice: 299, material: 'Cotton-poly blend', gsm: '120 GSM', pattern: 'Solid', washable: true, featured: false, newArrival: true, rating: 4.4, reviews: 86, tags: ['inskirt', 'saree', 'lightweight'] },
  { name: 'Daily Wear Petticoat (Pack of 3)', slug: 'daily-wear-petticoat-pack', category: 'petticoats', subcategory: 'Petticoat', images: ['https://images.unsplash.com/photo-1583846556774-2dccf41e9f9b?w=1200&auto=format&fit=crop&q=80'], description: 'Value pack of three cotton petticoats in mixed colours. A staple wardrobe upgrade for everyday wear.', clothType: 'Cotton', colors: ['Assorted'], sizes: ['M', 'L', 'XL'], stock: 96, offerPrice: 649, originalPrice: 999, material: '100% Cotton', pattern: 'Solid', washable: true, featured: false, newArrival: false, rating: 4.5, reviews: 54, tags: ['petticoat', 'pack', 'value'] },

  // Lungis
  { name: 'Pure Cotton Lungi — Classic White', slug: 'pure-cotton-lungi-white', category: 'lungis', subcategory: 'Cotton Lungi', images: ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80'], description: 'Classic white 100% cotton lungi with a fine bordered finish. Breathable and ideal for Indian summers.', clothType: 'Cotton', colors: ['White'], sizes: ['2 Metre', '2.25 Metre'], stock: 240, offerPrice: 299, originalPrice: 399, material: '100% Cotton', gsm: '120 GSM', pattern: 'Solid with border', washable: true, featured: true, newArrival: false, rating: 4.7, reviews: 312, tags: ['lungi', 'white', 'cotton'] },
  { name: 'Colour Cotton Lungi — Check Pattern', slug: 'colour-cotton-lungi-check', category: 'lungis', subcategory: 'Color Cotton Lungis', images: ['https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80'], description: 'Bold check-patterned colour lungi for everyday wear. Vibrant fast colours and a sturdy weave.', clothType: 'Cotton', colors: ['Red Check', 'Blue Check', 'Green Check', 'Brown Check'], sizes: ['2 Metre'], stock: 410, offerPrice: 279, originalPrice: 379, material: '100% Cotton', pattern: 'Checks', washable: true, featured: true, newArrival: true, rating: 4.5, reviews: 198, tags: ['lungi', 'check', 'colour'] },
  { name: 'Colour Dhoti — Festive Range', slug: 'colour-dhoti-festive', category: 'lungis', subcategory: 'Colour Dhoti', images: ['https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=1200&auto=format&fit=crop&q=80'], description: 'Lightweight colour dhoti with a fine border — suitable for festivals and family functions.', clothType: 'Cotton', colors: ['Cream', 'Yellow', 'Light Blue', 'Light Green'], sizes: ['4 Metre'], stock: 120, offerPrice: 449, originalPrice: 599, material: 'Pure Cotton', pattern: 'Border', washable: true, featured: false, newArrival: false, rating: 4.4, reviews: 67, tags: ['dhoti', 'festive'] },
  { name: 'Handloom Lungi — Erode Special', slug: 'handloom-lungi-erode', category: 'lungis', subcategory: 'Handloom Lungi', images: ['https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80'], description: 'Authentic handloom lungi woven by master weavers from the Erode-Karur belt.', clothType: 'Handloom Cotton', colors: ['White', 'Off-White', 'Beige'], sizes: ['2 Metre', '2.25 Metre'], stock: 75, offerPrice: 499, originalPrice: 699, material: 'Handloom Cotton', pattern: 'Border', washable: true, featured: true, newArrival: false, rating: 4.8, reviews: 92, tags: ['handloom', 'lungi', 'premium'] },
  { name: 'Home Made Lungi — Soft Weave', slug: 'home-made-lungi-soft', category: 'lungis', subcategory: 'Home Made Lungi', images: ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80'], description: 'Soft, broken-in feel from day one. A lighter weave designed for home wear and night use.', clothType: 'Cotton', colors: ['Assorted Pastels'], sizes: ['2 Metre'], stock: 200, offerPrice: 229, originalPrice: 319, material: 'Soft Cotton', pattern: 'Solid', washable: true, featured: false, newArrival: true, rating: 4.3, reviews: 41, tags: ['lungi', 'home-wear'] },

  // Towels
  { name: 'Cotton Bath Towel — Premium', slug: 'cotton-bath-towel-premium', category: 'towels', subcategory: 'Cotton Bath Towel', images: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&auto=format&fit=crop&q=80'], description: 'Plush 100% cotton bath towel — high absorbency, soft on skin and built to last hundreds of washes.', clothType: 'Terry Cotton', colors: ['White', 'Maroon', 'Navy', 'Sea Green', 'Beige'], sizes: ['27"x54"', '30"x60"'], stock: 280, offerPrice: 349, originalPrice: 499, material: '100% Cotton Terry', gsm: '450 GSM', pattern: 'Solid', washable: true, featured: true, newArrival: false, rating: 4.7, reviews: 256, tags: ['towel', 'bath', 'premium'] },
  { name: 'Cotton Bath Towel Set (Pack of 2)', slug: 'cotton-bath-towel-set', category: 'towels', subcategory: 'Cotton Bath Towels', images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80'], description: 'Pack of two everyday bath towels — soft, absorbent and great value.', clothType: 'Terry Cotton', colors: ['Assorted'], sizes: ['27"x54"'], stock: 150, offerPrice: 549, originalPrice: 799, material: 'Cotton Terry', gsm: '380 GSM', pattern: 'Solid', washable: true, featured: false, newArrival: true, rating: 4.5, reviews: 78, tags: ['towel', 'pack', 'value'] },

  // Gamcha
  { name: 'Cotton Gamcha — Traditional Check', slug: 'cotton-gamcha-traditional', category: 'gamcha', subcategory: 'Cotton Gamcha', images: ['https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80'], description: 'Lightweight cotton gamcha in classic red and white check — quick-drying and multipurpose.', clothType: 'Cotton', colors: ['Red Check', 'Green Check', 'Blue Check'], sizes: ['30"x60"'], stock: 500, offerPrice: 99, originalPrice: 149, material: 'Pure Cotton', gsm: '120 GSM', pattern: 'Checks', washable: true, featured: true, newArrival: false, rating: 4.6, reviews: 412, tags: ['gamcha', 'cotton', 'everyday'] },
  { name: 'Gumcha — Premium Cotton', slug: 'gumcha-premium-cotton', category: 'gamcha', subcategory: 'Gumcha', images: ['https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80'], description: 'A finer, softer take on the everyday gumcha — thicker weave and brighter colours.', clothType: 'Cotton', colors: ['Red', 'Yellow', 'Orange'], sizes: ['32"x65"'], stock: 220, offerPrice: 149, originalPrice: 199, material: 'Premium Cotton', pattern: 'Border', washable: true, featured: false, newArrival: true, rating: 4.5, reviews: 67, tags: ['gumcha', 'cotton'] },
  { name: 'Gamcha Bulk Pack — Wholesale', slug: 'gamcha-bulk-pack', category: 'gamcha', subcategory: 'Gamcha', images: ['https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80'], description: 'Pack of 12 traditional cotton gamcha pieces — built for wholesale buyers and gift packs.', clothType: 'Cotton', colors: ['Assorted Checks'], sizes: ['30"x60"'], stock: 60, offerPrice: 999, originalPrice: 1499, material: 'Pure Cotton', pattern: 'Checks', washable: true, featured: false, newArrival: false, rating: 4.7, reviews: 34, tags: ['gamcha', 'wholesale', 'bulk'] },

  // Bed Sheets
  { name: 'Pure Cotton Bed Sheet — Double', slug: 'pure-cotton-bed-sheet-double', category: 'bed-sheets', subcategory: 'Bed Sheets', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop&q=80'], description: 'Pure cotton double bed sheet with two matching pillow covers.', clothType: 'Cotton', colors: ['Floral Maroon', 'Geometric Blue', 'Pastel Pink', 'Solid Cream'], sizes: ['Double 90x100', 'Queen 90x108', 'King 108x108'], stock: 130, offerPrice: 899, originalPrice: 1399, material: '100% Pure Cotton', gsm: '180 GSM', pattern: 'Printed', washable: true, featured: true, newArrival: true, rating: 4.7, reviews: 189, tags: ['bedsheet', 'double', 'cotton'] },
  { name: 'Single Bed Sheet — Cotton Print', slug: 'single-bed-sheet-cotton-print', category: 'bed-sheets', subcategory: 'Bedsheet', images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop&q=80'], description: 'Single cotton bed sheet with one pillow cover — perfect for hostels and single beds.', clothType: 'Cotton', colors: ['Floral', 'Geometric', 'Stripes'], sizes: ['Single 60x90'], stock: 180, offerPrice: 549, originalPrice: 799, material: 'Cotton', pattern: 'Printed', washable: true, featured: false, newArrival: false, rating: 4.4, reviews: 96, tags: ['bedsheet', 'single'] },

  // Handloom
  { name: 'Handloom Cotton Saree Petticoat', slug: 'handloom-cotton-petticoat', category: 'handloom', images: ['https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80'], description: 'Heritage handloom petticoat — slightly heavier weave with authentic Erode feel.', clothType: 'Handloom Cotton', colors: ['White', 'Off-White', 'Beige', 'Maroon'], sizes: ['S', 'M', 'L', 'XL'], stock: 90, offerPrice: 449, originalPrice: 599, material: 'Handloom Cotton', pattern: 'Solid', washable: true, featured: false, newArrival: false, rating: 4.6, reviews: 53, tags: ['handloom', 'petticoat'] },
  { name: 'Handloom Cotton Stole', slug: 'handloom-cotton-stole', category: 'handloom', images: ['https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80'], description: 'Hand-woven cotton stole with subtle gold borders.', clothType: 'Handloom Cotton', colors: ['Maroon', 'Mustard', 'Indigo', 'Bottle Green'], sizes: ['Free Size'], stock: 65, offerPrice: 599, originalPrice: 899, material: 'Handloom Cotton with gold border', pattern: 'Border', washable: true, featured: true, newArrival: true, rating: 4.8, reviews: 47, tags: ['handloom', 'stole', 'premium'] },

  // Dhoti
  { name: 'Classic White Cotton Dhoti', slug: 'classic-white-cotton-dhoti', category: 'dhoti', images: ['https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=1200&auto=format&fit=crop&q=80'], description: 'Traditional white cotton dhoti with a fine gold border — the timeless choice for weddings and temple visits.', clothType: 'Cotton', colors: ['White with Gold Border', 'White with Maroon Border'], sizes: ['4 Metre', '8 Metre'], stock: 110, offerPrice: 699, originalPrice: 999, material: 'Pure Cotton', pattern: 'Bordered', washable: true, featured: true, newArrival: false, rating: 4.8, reviews: 218, tags: ['dhoti', 'white', 'traditional'] },
  { name: 'Daily Wear Cotton Dhoti', slug: 'daily-wear-cotton-dhoti', category: 'dhoti', images: ['https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=1200&auto=format&fit=crop&q=80'], description: 'Comfortable everyday dhoti — soft cotton weave, easy to wash.', clothType: 'Cotton', colors: ['White', 'Cream'], sizes: ['4 Metre'], stock: 200, offerPrice: 449, originalPrice: 649, material: 'Cotton', pattern: 'Solid', washable: true, featured: false, newArrival: false, rating: 4.5, reviews: 89, tags: ['dhoti', 'daily-wear'] },
];

const blogs = [
  { title: 'Why Erode is the Heart of South Indian Textile Manufacturing', slug: 'erode-textile-manufacturing-hub', excerpt: "From the banks of the Cauvery to thousands of looms — how Erode quietly became the backbone of India's textile industry.", content: "Erode's textile story goes back generations. Sitting at the confluence of the Cauvery and Bhavani rivers, the region had natural advantages.\n\nToday, Erode supplies fabrics and finished textiles to every state in India.", coverImage: 'https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1600&auto=format&fit=crop&q=80', author: 'Thangavel S', publishedAt: new Date('2026-05-12'), category: 'Industry', tags: ['erode', 'textile', 'manufacturing'], readTime: 6, featured: true, published: true },
  { title: "Handloom vs Powerloom: What's the Real Difference?", slug: 'handloom-vs-powerloom', excerpt: 'A practical guide to telling the two apart — and why your end-use should decide which one you buy.', content: 'Handloom and powerloom both produce cotton fabric, but the process, feel and price tell two very different stories.\n\nFor daily-wear products, powerloom often makes more practical sense.', coverImage: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1600&auto=format&fit=crop&q=80', author: 'Thangavel S', publishedAt: new Date('2026-04-28'), category: 'Guides', tags: ['handloom', 'powerloom', 'weaving'], readTime: 5, published: true },
  { title: 'How to Care for Your Cotton Petticoat (and Make it Last Years)', slug: 'cotton-petticoat-care-guide', excerpt: 'Simple, time-tested advice from our team to extend the life of your everyday cotton wear.', content: 'A good cotton petticoat should last you 3–4 years of regular wear. The trick is in the first wash.\n\nAvoid wringing — squeeze gently and line-dry in the shade.', coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80', author: 'Lakshmi T', publishedAt: new Date('2026-04-15'), category: 'Care Guide', tags: ['petticoat', 'care', 'wash'], readTime: 4, published: true },
  { title: 'Understanding GSM: What Those Numbers on Your Towel Actually Mean', slug: 'understanding-gsm-towels', excerpt: 'GSM is the most over-used and under-explained spec in textiles. Here\'s a no-nonsense breakdown.', content: 'GSM — grams per square metre — is simply how much a square metre of the fabric weighs.\n\nA 450 GSM towel hits the perfect balance of absorbency and quick drying for Indian humidity.', coverImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&auto=format&fit=crop&q=80', author: 'Thangavel S', publishedAt: new Date('2026-03-30'), category: 'Guides', tags: ['gsm', 'towel', 'fabric'], readTime: 5, published: true },
];

const heroBanners = [
  { kind: BannerKind.HERO, eyebrow: 'Erode • Since 2017', title: 'Woven with care.', highlight: 'Worn across India.', description: 'Premium cotton, authentic handloom and honest pricing — from one of Tamil Nadu\'s most trusted textile manufacturers.', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&auto=format&fit=crop&q=80', ctaLabel: 'Explore Collection', ctaHref: '/products', secondaryLabel: 'Wholesale Enquiry', secondaryHref: '/contact', order: 1 },
  { kind: BannerKind.HERO, eyebrow: 'New Collection', title: 'The Handloom Edit.', highlight: 'Heritage, hand-woven.', description: 'Authentic Erode-Karur handloom lungis, stoles and petticoats — woven by master craftsmen, finished by us.', image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1920&auto=format&fit=crop&q=80', ctaLabel: 'Shop Handloom', ctaHref: '/collections/handloom', secondaryLabel: 'View Products', secondaryHref: '/products', order: 2 },
  { kind: BannerKind.HERO, eyebrow: 'Wholesale Ready', title: 'Bulk orders.', highlight: 'Honest pricing.', description: 'From single-piece retail to thousand-piece wholesale — Pan-India despatch with the same care, every time.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&auto=format&fit=crop&q=80', ctaLabel: 'Talk on WhatsApp', ctaHref: 'https://wa.me/919876543210', secondaryLabel: 'View Catalogue', secondaryHref: '/products', order: 3 },
];

const openingCardBanner = {
  kind: BannerKind.OPENING_CARD,
  title: 'Festival Sale is Live',
  subtitle: 'Flat 25% Off',
  description: 'On bed sheets, dhotis and the handloom range. Use code FESTIVE25 on your WhatsApp order.',
  image: 'https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=900&auto=format&fit=crop&q=80',
  ctaLabel: 'Browse Festival Range',
  ctaHref: '/collections/festival',
  expiresAt: new Date('2026-06-30T23:59:59Z'),
  badge: 'Limited Time',
  order: 1,
};

const offers = [
  { title: 'Festival Special — Flat 25% Off', description: 'Across our entire bed sheet and dhoti range. Limited stock.', code: 'FESTIVE25', discountPercent: 25, expiresAt: new Date('2026-06-30T23:59:59Z'), ctaLabel: 'Shop Now', ctaHref: '/products', order: 1 },
  { title: 'Wholesale Pricing — Bulk Orders', description: 'Special rates for orders above 50 pieces. Talk to us on WhatsApp.', discountPercent: 15, expiresAt: new Date('2026-12-31T23:59:59Z'), ctaLabel: 'Enquire', ctaHref: '/contact', order: 2 },
  { title: 'First Order — ₹50 Off', description: 'New customers get ₹50 off on their first WhatsApp order.', code: 'FIRST50', discountPercent: 0, expiresAt: new Date('2026-12-31T23:59:59Z'), ctaLabel: 'Order Now', ctaHref: '/products', order: 3 },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Retail Owner', company: 'Kumar Textiles', location: 'Madurai, TN', rating: 5, review: "I've been ordering wholesale petticoats and lungis from Thangavel Textile for two years now. Quality is consistent, pricing is fair and they always despatch on time.", productPurchased: 'Wholesale Petticoats', featured: true, order: 1 },
  { name: 'Lakshmi Subramanian', role: 'Boutique Owner', location: 'Chennai, TN', rating: 5, review: 'Their handloom range is exceptional. The stoles especially — beautifully woven, soft on skin, and our customers love the colours.', productPurchased: 'Handloom Stoles', featured: true, order: 2 },
  { name: 'Mohammed Ali', role: 'Hotel Procurement', company: 'Sunrise Resorts', location: 'Coimbatore, TN', rating: 5, review: 'We needed bath towels and bed sheets in bulk for our three properties. Thangavel Textile delivered exactly to spec.', productPurchased: 'Bath Towels & Bed Sheets', order: 3 },
  { name: 'Priya Venkatesh', role: 'Home Customer', location: 'Bangalore, KA', rating: 4, review: 'Ordered the cotton bath towel set and bed sheets through WhatsApp. Easy process, packed well, and the cotton is genuinely soft.', productPurchased: 'Bath Towel Set', order: 4 },
  { name: 'Karthik Raja', role: 'Wholesale Buyer', company: 'Raja Cloth Stores', location: 'Salem, TN', rating: 5, review: "Honest pricing and no surprises on stock. I've expanded my lungi and gamcha range across all three of my shops thanks to their consistent supply.", productPurchased: 'Lungis & Gamcha', order: 5 },
  { name: 'Anita Reddy', role: 'Saree Boutique', company: "Anita's Collection", location: 'Hyderabad, TS', rating: 5, review: 'Their petticoats are colour-matched well to popular saree shades. Customers come back for the same petticoats — the highest compliment I can give.', productPurchased: 'Cotton Petticoats', order: 6 },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn', 'log'] });

  const categoryModel = app.get<Model<any>>(getModelToken(Category.name));
  const productModel = app.get<Model<any>>(getModelToken(Product.name));
  const blogModel = app.get<Model<any>>(getModelToken(Blog.name));
  const bannerModel = app.get<Model<any>>(getModelToken(Banner.name));
  const offerModel = app.get<Model<any>>(getModelToken(Offer.name));
  const testimonialModel = app.get<Model<any>>(getModelToken(Testimonial.name));

  logger.log('Clearing existing collections (except users)...');
  await Promise.all([
    categoryModel.deleteMany({}),
    productModel.deleteMany({}),
    blogModel.deleteMany({}),
    bannerModel.deleteMany({}),
    offerModel.deleteMany({}),
    testimonialModel.deleteMany({}),
  ]);

  logger.log(`Inserting ${categories.length} categories...`);
  await categoryModel.insertMany(categories);

  logger.log(`Inserting ${products.length} products...`);
  await productModel.insertMany(products);

  logger.log(`Inserting ${blogs.length} blog posts...`);
  await blogModel.insertMany(blogs);

  logger.log(`Inserting ${heroBanners.length + 1} banners (hero + opening card)...`);
  await bannerModel.insertMany([...heroBanners, openingCardBanner]);

  logger.log(`Inserting ${offers.length} offers...`);
  await offerModel.insertMany(offers);

  logger.log(`Inserting ${testimonials.length} testimonials...`);
  await testimonialModel.insertMany(testimonials);

  logger.log('✅  Seed complete.');
  await app.close();
  process.exit(0);
}

seed().catch((err) => {
  logger.error('Seed failed', err);
  process.exit(1);
});
