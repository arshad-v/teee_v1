import Image from 'next/image'
import { ArrowUpRight, Asterisk, Plus } from 'lucide-react'

const categories = [
  {
    number: '01',
    title: 'BIG ON BITES.',
    tag: 'BURGERS & MEALS',
    image: '/images/burgers.png',
    alt: 'A juicy gourmet burger with a sesame bun, fresh lettuce and melted cheese',
    description: 'Big cravings, meet your match. Zinger Supreme, Khaleej Double, and Angus Beef grilled burgers cooked to perfection.',
    selection: 'Explore our Zinger Supreme, Mathafi, Khaleej Double, and Angus Beef Burgers in-store.',
    color: 'orange'
  },
  {
    number: '02',
    title: 'FLAKY & WRAPPED.',
    tag: 'PORATTA SANDWICHES',
    image: '/images/poratta.jpg',
    alt: 'Golden flaky Kerala parotta roll filled with crispy chicken zinger, melted cheese and Oman chips',
    description: 'The legendary UAE cafeteria signature. Golden flaky parottas rolled with crispy chicken, melted cheddar, and crunchy Oman chips.',
    selection: 'Try our Mathafi Poratta, Francisco, Chilli Cheetos, and Egg Cheese Poratta rolls.',
    color: 'yellow'
  },
  {
    number: '03',
    title: 'ICONIC CLUBS.',
    tag: 'CLUB SANDWICHES',
    image: '/images/club-sandwich.jpg',
    alt: 'Triple-decker toasted club sandwich with crispy golden fries and dipping sauce',
    description: 'Layers of sheer comfort. Triple-decker toasted bread stacked with savory grilled chicken, egg, cheese, and seasoned fries.',
    selection: 'Discover Majlis Club, Arabian Club, Zinger Club, and Emirates Club sandwiches.',
    color: 'green'
  },
  {
    number: '04',
    title: 'CRISP & CRUNCH.',
    tag: 'BROASTED & CRISPY',
    image: '/images/broasted.jpg',
    alt: 'Golden crispy broasted fried chicken pieces with french fries and garlic toum dip',
    description: 'Golden, crackling crisp on the outside and tender inside. Served with seasoned french fries and creamy garlic toum sauce.',
    selection: 'Enjoy our Family Buckets, Chicken Strips, Samosas, and Loaded Cheesy Fries.',
    color: 'orange'
  },
  {
    number: '05',
    title: 'CREAMY & CHEESY.',
    tag: 'PASTA CORNER',
    image: '/images/pasta.jpg',
    alt: 'Creamy pink sauce penne pasta with melted cheese, tender chicken, and crushed Cheetos',
    description: 'Comfort in every forkful. Sizzling pink and Alfredo penne pasta with tender chicken, bubbling mozzarella, and crunchy Cheetos toppings.',
    selection: 'Try Penne Cheetos Pasta, Oman Chips Pasta, Penne Hot Sauce, and Spaghetti Aglio Olio.',
    color: 'orange'
  },
  {
    number: '06',
    title: 'FRESH ON SIPS.',
    tag: 'JUICES & SHAKES',
    image: '/images/juices.png',
    alt: 'Fresh mango and watermelon juices with ice, mint and fruit',
    description: 'A little sunshine in every sip. Refreshing freshly blended avocado, mango, strawberry, and exotic specialty mocktails.',
    selection: 'Taste our Avocado, Mango, Passionfruit Mojitos, and Lotus Milkshakes.',
    color: 'yellow'
  },
  {
    number: '07',
    title: 'ROYAL FALOODA.',
    tag: 'DESSERT SPECIALS',
    image: '/images/falooda.jpg',
    alt: 'Layered royal falooda dessert with rose syrup, vermicelli, basil seeds, kulfi ice cream and pistachios',
    description: 'The ultimate chilled indulgence. Layered rose syrup, sweet vermicelli, soaked sabja seeds, rich kulfi ice cream, and roasted nuts.',
    selection: 'Taste our Tea Time Special Falooda, Kulfi Falooda, Mango Falooda, and Fruit Salad with Ice Cream.',
    color: 'green'
  },
  {
    number: '08',
    title: 'ALWAYS TEA TIME.',
    tag: 'THE ORIGINAL CHAI',
    image: '/images/karak.png',
    alt: 'A steaming glass of creamy karak tea with golden samosas',
    description: 'The cup that started our journey in 1988. Authentic slow-brewed karak tea, fresh milk saffron, and warm cardamom chai.',
    selection: 'Order our Signature Karak Tea, Fresh Milk Zaffran, Horlicks, or Flask Tea for sharing.',
    color: 'orange'
  },
]

export function MenuShowcase() {
  return <section id="menu" className="menu-section section-wrap">
    <div className="section-eyebrow"><Asterisk className="tiny-star" size={19} aria-hidden="true" /> SOMETHING FOR EVERY CRAVING</div>
    <div className="section-heading-row"><h2>WHAT ARE YOU<br />IN THE <span className="outline-text">MOOD FOR?</span></h2><p>From the first sip to the last bite.<br />Your favourites, all in one happy place.</p></div>
    <div className="menu-grid">{categories.map(category => <article className="food-card" key={category.number}>
      <div className={`food-image ${category.color}`}><Image src={category.image} alt={category.alt} width={640} height={640} sizes="(max-width: 580px) 100vw, (max-width: 1120px) 50vw, 25vw" /><span className="food-tag">{category.tag}</span><span className="food-number">{category.number}</span></div>
      <div className="food-title-row"><h3>{category.title}</h3><ArrowUpRight aria-hidden="true" size={22} /></div>
      <p>{category.description}</p>
      <details className="food-details"><summary>Explore the selection <Plus size={17} aria-hidden="true" /></summary><p>{category.selection} <a href="#visit">Find a branch <ArrowUpRight size={14} aria-hidden="true" /></a></p></details>
    </article>)}</div>
    <p className="menu-note">A taste of what we do. Selection may vary by branch. Food photography is illustrative.</p>
  </section>
}
