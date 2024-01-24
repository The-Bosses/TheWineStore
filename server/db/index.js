const client = require('./client')

const {
  fetchProducts,
  createProduct,
  editProduct
} = require('./products');

const {
  fetchReviews,
  createReview
} = require('./reviews');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS wish_list;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      birth_date VARCHAR(50) NOT NULL,
      address_1 VARCHAR(120) NOT NULL,
      address_2 VARCHAR(120),
      city VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      country VARCHAR(50) NOT NULL,
      postal_code VARCHAR(16) NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      type VARCHAR(50) NOT NULL,
      location VARCHAR(50),
      alcohol_percent DECIMAL(3,1), 
      description TEXT,
      price DECIMAL(4,2),
      is_vip BOOLEAN DEFAULT false NOT NULL,
      image VARCHAR(255)
    );

    CREATE TABLE reviews (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id VARCHAR(100),
      user_id VARCHAR(10)  ,
      rating INTEGER,
      comment VARCHAR(50) 
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL,
      total_cost DECIMAL(10,2),
      address VARCHAR(255)
    );

    CREATE TABLE wish_list(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id)NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);


  const [ben, parker, sam, robert, test] = await Promise.all([
    createUser({ username: 'ben', password: 'bboss', name: 'Ben Boss', email: 'bb@icloud.com', birth_date:'1998-03-09', address_1: '123 Ypsilanti Dr', address_2: '', city: 'Ypsilanti', state: 'Michigan', country: 'United States', postal_code: '48197', is_vip: true, is_admin: true }),
    createUser({ username: 'parker', password: '1234', name: 'Parker', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true}),
    createUser({ username: 'sam', password: '1234', name: 'Sam', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true}),
    createUser({ username: 'robert', password: '1234', name: 'Robert', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: true, is_admin: true}),
    createUser({ username: 'test', password: '1234', name: 'test', email: 'e@me.com', birth_date: '1900-01-01', address_1: '234 Lane', address_2:'', city: 'Detroit', state: 'Michigan', country: "United States", postal_code: '12345', is_vip: false, is_admin: false})

  ]);
  const [oh_schist, enchanted_garden, anthony_road, santa, voga, ecco, hayes, fog_bank, kim_craw, oyster, invivo, unshackled_by, sun_goddess, river_road, oak_grove, la_crema, j_lohr, ferrari, decoy_cali, tuli, caliveda, le_colline, la_belle, prototype, double_black, gnarled, oak_ridge, sobon, bread_butter, nineteen_crimes, chateau, eccentric, unshackled, la_vostra, la_marca, cupcake, naveran, rondel, lini, le_grand, le_marca_rose ] = await Promise.all([

    createProduct({ name: 'Oh Schist', type: 'Riesling', location: 'Germany', alcohol_percent: 9.5, description: 'Overflowing with lively citrus aromas and a tantalizing hint of white florals. Its zesty acidity intertwines seamlessly with juicy peach and tangy lemon notes, balanced by a subtle sweetness. This White Riesling is a vibrant, versatile delight that harmonizes beautifully with any occasion. It pairs well with Asian food.', price: 8.99, reviews: 'Light, crisp, high acidity, with a flowery bouquet,The palate is far more generous delivering waves of white peach,apricot, apple, and subtle tropical', is_vip: false, image:'../../public/winePics/oh_schist.jpg' }),
    createProduct({ name: 'Echanted Garden of the Eden Valley', type: 'Riesling', location: 'Australia', alcohol_percent: 11.8, description: 'The “Enchanted Garden” was planted in 1910 and thrives to this day, a seven-acre Eden Valley Vine Garden lovingly tended by Sue and Stuart Woodman. The “La Niña” year in 2022 brought cooler, more mild temperatures, particularly at night, which helped to retain acidity since the respiration of acids occurs to a greater degree when temperatures are warmer. The main notes are honetsuckle, sherbet, and citrus. Pairs very well with deep fruit flavors.', price: 21.99, reviews: 'The harmonious palate makes this wine a joy to sip on its own.', is_vip: false, image:'../../public/winePics/Enchanted-Garden.jpg' }),
    createProduct({ name: 'Anthony Road Dry', type: 'Riesling', location: 'United States', alcohol_percent: 12, description: "John and Ann Martini ventured from city life to establish a winery in the challenging Finger Lakes region. Their Riesling, a testament to their perseverance, boasts honey, petrol, waxy apple, and pear aromas. With an electric, grippy palate and green tea hints, it's complex, concentrated, and finishes beautifully showcasing the region's winemaking prowess. It pairs well with spicy food as well as pork dishes.", price: 21.99, reviews: 'The palate is electric and grippy with some added green tea vibes.', is_vip: false, image:'../../public/winePics/Anthony.jpg' }),
    createProduct({ name: 'Santa Margherita', type: 'Pinot Grigio', location: 'Italy', alcohol_percent: 12.7, description: "Alto Adige, Italy- This dry white wine has a straw yellow color. Its clean, intense aroma and bone-dry taste (with an appealing flavor of Golden Delicious apples) make Santa Margherita's Pinot Grigio a wine of great personality and versatility. Apple notes shine through the most with this dry wine. It pairs well with chicken, grilled fish, and soft cheese.", price: 19.99, reviews: 'The wine boasts a fresh, clean fragrance that is followed by a crisp, refreshing flavour with hints of citrus fruits', is_vip: false, image:'../../public/winePics/santa.webp' }),
    createProduct({ name: 'Voga', type: 'Pinot Grigio', location: 'Italy', alcohol_percent: 12, description: "Boldly innovative, elegantly unapologetic and tastefully confident, VOGA Italia is a contemporary wine for the modern consumer. Rich in flavor and full of character the wines are styled to deliver the taste profiles most desired by today's wine drinkers. There are wildflower honey notes, as well as peach and citrus. It pairs well with seafood, chicken, and creamy pastas.", price: 8.99, reviews: 'Great taste and body for the money!', is_vip: false, image:'../../public/winePics/voga.webp' }),
    createProduct({ name: 'Ecco Domani', type: 'Pinot Grigio', location: 'Italy', alcohol_percent: 11.2, description: "Notes of light citrus and delicate floral aromas are complemented by hints of tropical fruit flavors. The wine is medium-bodied, with a pleasantly soft palate and crisp, refreshing finish. Pairs well with grilled fish, chicken, and soft cheeses. ", price: 11.99, reviews: 'This wine paired great with our grilled salmon dinner last night', is_vip: false, image:'../../public/winePics/ecco.webp' }),
    createProduct({ name: 'Hayes Ranch', type: 'Pinot Grigio', location: 'United States', alcohol_percent: 13, description: "Notes of light citrus and delicate floral aromas are complemented by hints of tropical fruit flavors. The wine is medium-bodied, with a pleasantly soft palate and crisp, refreshing finish. ", price: 12.99, reviews: 'This wine is full bodied yet light and crisp, perfect for any evening.', is_vip: false, image:'../../public/winePics/hayes.jpg' }),
    createProduct({ name: 'Fog Bank Vineyards', type: 'Pinot Grigio', location: 'United States', alcohol_percent: 13.5, description: "Fog Bank Vineyards' Pinot Grigio offers an intensely rich flavor profile complemented by subtle floral notes. Best enjoyed alongside lobster and lemon butter, this wine promises a delightful pairing experience. ", price: 11.99, reviews: 'amazing rich flavor that paired perfectly with our baked code.', is_vip: false, image:'../../public/winePics/fog_bank.jpg' }),
    createProduct({ name: 'Kim Crawford Malborough', type: 'Sauvignon Blanc', location: 'New Zealand', alcohol_percent: 13, description: "Very pale yellow with classic Marlborough Sauvignon Blanc aromas of lifted citrus, tropical fruit, and crushed herbs. A fresh, juicy wine with vibrant acidity and plenty of weight and length on the palate. Ripe, tropical fruit flavor with passion fruit, melon, and grapefruit. Pairs brilliantly with fresh oysters, asparagus, lobster, or summer salads.", price: 19.99, reviews: 'Such an amazing light wine that paired perfectly with my garden fresh salad.', is_vip: false, image:'../../public/winePics/kim.webp' }),
    createProduct({ name: 'Oyster Bay', type: 'Sauvignon Blanc', location: 'New Zealand', alcohol_percent: 12.5, description: "Oyster Bay Marlborough Sauvignon Blanc takes on the magical flavours of passion fruit, bright citrus and gooseberry, with a zesty finish. Throughout harvest, fruit is selected from progressively later ripening vineyard blocks, commencing with the stonier free-draining sites.", price: 18.99, reviews: 'As the name reflects it paired amazing with our oyster plate last night', is_vip: false, image:'../../public/winePics/oyster.webp' }),
    createProduct({ name: 'Invivo X Sarah Jessica Parker', type: 'Sauvignon Blanc', location: 'New Zealand', alcohol_percent: 13, description: "Abundant notes of grapefruit, honeysuckle, passionfruit, and citrus zest evolve from the glass. At first, the palate is expansive and leads with a wall of sweet-scented fruits and a soft- but balanced- acid spine. The mid-palate grows to another level, where supple phenolics offer a framework to further lift the fruit. The wine continues to unfold and is very long and persistent. ", price: 20.99, reviews: '', is_vip: true, image:'../../public/winePics/invivo.webp' }),
    createProduct({ name: 'Unshackled by The Prisoner', type: 'Sauvignon Blanc', location: 'United States', alcohol_percent: 14.6, description: "The 2021 Unshackled Sauvignon Blanc displays notes of melon, peach, fresh citrus, lime and topical fruit. The addition of Chenin Blanc and Roussanne adds brightness and texture to the mouthfeel. ", price: 24.50, reviews: '', is_vip: false, image:'../../public/winePics/unshackled.webp' }),
    createProduct({ name: 'Sun Goddess by Mary J Blige', type: 'Sauvignon Blanc', location: 'Italy', alcohol_percent: 12.5, description: "Straw-yellow with lively greenish tinges. Intensely aromatic, with tropical notes of passion fruit, banana, and melon and hints of spice. Particularly structured with a balance between an intense acidity and smoothness with a long finish. ", price: 20.99, reviews: '', is_vip: true, image:'../../public/winePics/sun.webp' }),
    createProduct({ name: 'River Road', type: 'Chardonnay', location: 'United States', alcohol_percent: 13.5, description: "The 2019 Chardonnay Sonoma Cty showed nicely, with a lean, pure, yet also rich style offering plenty of stone fruits, wood smoke, hints of white flowers, & a touch of toasted nuts. Soft, supple, & nicely textured on the palate with a clean, elegant, drinkable style. ", price: 25.99, reviews: '', is_vip: false, image:'../../public/winePics/river_road.webp' }),
    createProduct({ name: 'Oak Grove Reserve', type: 'Chardonnay', location: 'United States', alcohol_percent: 13, description: "Full of ripe fruit flavors, with a smooth, lengthy finish. Oak Grove believes that the best wines are made in the vineyard, so they seek out the finest grapes from the cool appellations of California. A company-wide top seller. ", price: 14.99, reviews: '', is_vip: false, image:'../../public/winePics/oak_grove.webp' }),
    createProduct({ name: 'La Crema', type: 'Chardonnay', location: 'United States', alcohol_percent: 13.1, description: "Hints of almonds and savory herbs in the aroma accompany Bosc pears and vanilla on the palate as this handsome, toasty wine balances fruitiness and an oak-aged spiciness for a complex and complete expression. ", price: 14.99, reviews: '', is_vip: false, image:'../../public/winePics/la_crema.webp' }),
    createProduct({ name: "J. Lohr Estates Riverstone", type: 'Chardonnay', location: 'United States', alcohol_percent: 13.2, description: "The fresh aromas of lime zest, nectarine, peach and apple combined with the perfumed vanilla and toasted oak bouquet leading to flavors of peach, nectarine and citrus on the palate with subtle butter and vanilla toastiness.", price: 13.99, reviews: '', is_vip: false, image:'../../public/winePics/j_lohr.webp' }),
    createProduct({ name: 'Ferrari Carano', type: 'Chardonnay', location: 'United States', alcohol_percent: 12., description: "This Alexander Valley Chardonnay is a delicious wine with floral and fruit aromas of orange blossom, citrus, pear, figs, green apple, and a hint of toasted marshmallow and caramel. Generous on the palate, creamy vanilla undertones balance layers of toast and spice. ", price: 15.99, reviews: '', is_vip: false, image:'../../public/winePics/ferrari.webp' }),
    createProduct({ name: 'Decoy California', type: 'Pinot Noir', location: 'United States', alcohol_percent: 14.1, description: "This alluring Pinot Noir offers beautiful layers of black cherry, currant and strawberry, with subtle notes of rustic forest floor and spice. On the palate, it is soft and silky, with balanced acidity framing the vibrant berry flavors and carrying the wine to long, lush finish. ", price: 22.99, reviews: '', is_vip: false, image:'../../public/winePics/decoy.jpeg' }),
    createProduct({ name: 'TULI Sonoma County', type: 'Pinot Noir', location: 'United States', alcohol_percent: 13.8, description: "This medium-bodied wine is nicely fruity, nicely dry, showing moderate tannins and good acid balance. The wine will be a great dinner pour, easily pairing with a wide variety of dishes without overwhelming them. ", price: 32.99, reviews: '', is_vip: false, image:'../../public/winePics/tuli.jpeg' }),
    createProduct({ name: 'Caliveda', type: 'Pinot Noir', location: 'United States', alcohol_percent: 13.5, description: "California- Light aromas of raspberry jam, black currant and toasted oak are followed by luscious cherry, juicy plum, and vanilla flavors making this wine rich in unforgettable flavor and finesse. ", price: 16.50, reviews: '', is_vip: false, image:'../public/winePics/caliveda.webp' }),
    createProduct({ name: 'Le Colline', type: 'Pinot Noir', location: 'Italy', alcohol_percent: 12, description: "This silky smooth Pinot Noir has prominent fruit flavors of red berries and cherries. Medium-bodied with soft tannins, this pleasant wine is the perfect accompaniment to not only fish but grilled or roasted chicken or pork. ", price: 8.99, reviews: '', is_vip: false, image:'../../public/winePics/leColline.webp' }),
    createProduct({ name: 'La Belle Angele', type: 'Pinot Noir', location: '', alcohol_percent: 13, description: "This wine has a lovely red color. It is fine, delicate, subtle but still vivid. Tannins are delicate with a soft mouthful. Aromas and palate of morello cherry and mixed red fruits. ", price: 11.99, reviews: '', is_vip: false, image:'../../public/winePics/laBelle.jpeg' }),
    createProduct({ name: 'Protoype Zinfandel Lodi', type: 'Zinfandel', location: 'United States', alcohol_percent: 14.5, description: "Aromas of bright red cherries and blackberries jump out of the glass. Jammy flavors of raspberry and blackberry open the palate. Finishing out with oak and spice notes, this medium-bodied Zinfandel pairs wonderfully with barbecue, pizza, or roasted meats. ", price: 9.99, reviews: '', is_vip: false, image:'../../public/winePics/prototype.webp' }),
    createProduct({ name: 'Double Black Paso Robles', type: 'Zinfandel', location: 'United States', alcohol_percent: 14.5, description: "Raspberry jam and wet rock aromas make for a clean and focused nose on this bottling. Rich strawberry and boysenberry flavors entertain the palate, which shows a cocoa dust element on the finish. ", price: 13.99, reviews: '', is_vip: false, image:'../../public/winePics/double.webp' }),
    createProduct({ name: 'Gnarled Vine Estate Grown', type: 'Zinfandel', location: 'United States', alcohol_percent: 13.5, description: "A smooth, elegant wine, with subtle blackberry, licorice and chocolate notes. It serves up an almost creamy finish. Big, ripe and yet it is refined. Herb notes add complexity and character. ", price: 12.99, reviews: '', is_vip: false, image:'../../public/winePics/gnarled.webp' }),
    createProduct({ name: 'Oak Ridge Ancient Vine', type: 'Zinfandel', location: 'United States', alcohol_percent: 14, description: "Made from a blend of old vines from different Lodi vineyards, this zin is toned down with red fruits complemented by nice floral notes. Fresh and vibrant, this is easy to drink. ", price: 17.99, reviews: '', is_vip: false, image:'../../public/winePics/oakRidge.webp' }),
    createProduct({ name: 'Sobon Estate Hillside Amador', type: 'Zinfandel', location: 'United States', alcohol_percent: 14.5, description: "Notes of cherry cordial dominate this lighter style Zinfandel. Intensely ripe strawberries lead into expressive tannins that lend to its longer finish. ", price: 14.99, reviews: '', is_vip: false, image:'../../public/winePics/sobon.webp' }),
    createProduct({ name: 'Bread and Butter', type: 'Cabernet Sauvignon', location: 'United States', alcohol_percent: 13.5, description: "Expresses captivating aromas of mocha, ripe berries, violets, and blackcurrant with intertwining layers of subtle black pepper, toasted oak and rich vanilla. It enters the palate with layers of ripe blackberry. The round and luscious mouthfeel is accented by soft tannins. ", price: 10.50, reviews: '', is_vip: false, image:'../../public/winePics/bread.webp' }),
    createProduct({ name: 'Nineteen Crimes', type: 'Cabernet Sauvignon', location: 'Australia', alcohol_percent: 13.5, description: "Firm & full on the palate with a subtle sweetness giving a rich mouth feel. The vanilla aromatics carry through on the palate & compliment subtle flavors of red currants, dark cherries, & chocolate. The palate is filled with dark berry fruit & soft tannins. ", price: 8.99, reviews: '', is_vip: false, image:'../../public/winePics/nineteen.webp' }),
    createProduct({ name: 'Chateau Ste Michelle', type: 'Cabernet Sauvignon', location: 'United States', alcohol_percent: 12.4, description: "An inviting Cab with plenty of complexity and structure with silky tannins. It is also very versatile with food; pair it with beef, pork, or pasta. ", price: 11.99, reviews: '', is_vip: false, image:'../../public/winePics/chateau.webp' }),
    createProduct({ name: 'Eccentric', type: 'Cabernet Sauvignon', location: 'Argentina', alcohol_percent: 13.5, description: "Aromas and flavors of fresh black cherry pie, currant, heath bar, and leather with a round, crisp, medium body finish. Lush, concentrated fruits make for a simple and straight forward but eminently enjoyable wine. ", price: 10.99, reviews: '', is_vip: false, image:'../../public/winePics/eccentric.webp' }),
    createProduct({ name: 'Unshackled', type: 'Cabernet Sauvignon', location: 'United States', alcohol_percent: 14.5, description: "Aromas of plum and blackberry with a hint of olive. Vibrant flavors of black stone fruit and dried herbs with solid tannin structure result in a flavor-forward Cabernet Sauvignon with balanced acidity. ", price: 19.99, reviews: '', is_vip: false, image:'../../public/winePics/unshackledtwo.webp' }),
    createProduct({ name: 'La Vostra', type: 'Prosecco', location: 'Italy', alcohol_percent: 11, description: "Veneto, Italy - Immerse yourself in the juicy, irresistible flavors of apple, white peach and fragrant honeysuckle with La Vostra Prosecco. This inviting, bubbly sipper appeals to even the most selective sparkling enthusiast. Enjoy at all special occasions or casual gatherings alike! ", price: 11.99, reviews: '', is_vip: false, image:'../../public/winePics/vostra.webp' }),
    createProduct({ name: 'La Marca', type: 'Prosecco', location: 'Italy', alcohol_percent: 11.5, description: "La Marca Prosecco has the charm to stand alone as an aperitif, but it also has the body and the acidity to pair well with a range of foods, from seafood and mild cheeses to rich pasta dishes and decadent desserts. ", price: 18.99, reviews: '', is_vip: false, image:'../../public/winePics/marca.webp' }),
    createProduct({ name: 'CupCake', type: 'Prosecco', location: 'Italy', alcohol_percent: 11.5, description: "Aromas of white peach, grapefruit and honeydew melon lead to flavors of creamy ripe lemon, refined citrus and a toasted brioche finish. ", price: 12.99, reviews: '', is_vip: false, image:'../../public/winePics/cupcake.webp' }),
    createProduct({ name: 'Naveran', type: 'Cava', location: 'Spain', alcohol_percent: 11.5, description: "This estate-bottled Brut Vintage is crafted entirely from organic fruit and spends 12 months on the lees aging in bottle prior to release. Fresh, elegant, and versatile, the wine shows flavors of apple skin, lemon, baked bread, and hints of ginger. Pair with everything from cheese boards to fried chicken to fresh seafood and beyond. ", price: 19.99, reviews: '', is_vip: false, image:'../../public/winePics/naverna.png' }),
    createProduct({ name: 'Rondel Gold Brut', type: 'Cava', location: 'Spain', alcohol_percent: 11.5, description: "More fruity than dry, this 'extreme brut' is filled with soft peach and nut flavors, their fragrance lifted by floral tones of white lilies. Briny and fresh, the flavors last. ", price: 12.99, reviews: '', is_vip: false, image:'../../public/winePics/rondel.webp' }),
    createProduct({ name: 'Lini 910 Labrusca', type: 'Sparkling Rose', location: 'Italy', alcohol_percent: 11, description: "Produced from a blend of 50 percent salamino and 50 percent sorbara, this bone-dry rosé is marked by flavors of white cherry, cranberry, and dried herbs. The wine pairs beautifully with a variety of cuisines, from brunch favorites to savory happy hour snacks and beyond. ", price: 17.99, reviews: '', is_vip: false, image:'../../public/winePics/labrusca.jpg' }),
    createProduct({ name: 'Le Grand Courtage Rose', type: 'Sparkling Rose', location: 'France', alcohol_percent: 12, description: "This rosé compliments an array of foods. Try it with spicy Asian dishes, risotto, BBQ, beef, lamb, duck, game, chicken, prosciutto, seafood, pizza or soft cheese (like brie or goat). ", price: 17.99, reviews: '', is_vip: false, image:'../../public/winePics/courtage.webp' }),  
    createProduct({ name: 'Le Marca Prosecco Rose', type: 'Sparkling Rose', location: 'Italy', alcohol_percent: 11, description: "Shining from the first toast to the last sip, our playful pop of pink is an effervescent new way to enjoy Rosé. A balance of our traditional Prosecco and the delicate elegance of Pinot Noir, La Marca Prosecco Rosé sparkles with our classic aromas of white flowers, peach and pear, blending with hints of ripe red cherry, raspberry and wild strawberry. Vibrant and refreshing, this bubbly is perfect for both lively occasions and spontaneous celebrations. ", price: 14.99, reviews: '', is_vip: false, image:'../../public/winePics/marcaProsecco.webp' }),   
  ]);
    const [] = await Promise.all([])
    createReview({product_id:'Oh Schist', user_id:'robert', rating: 6, comment:'Light, crisp, citrus'}),
    createReview({product_id: 'voga', user_id:'robert', rating: 7, comment:'light but prolonged bitter-sweet finish'}),
    createReview({product_id: 'caliveda', user_id:'robert', rating: 6, comment:'Very strong nose and full body'})
  
  
  let orders = await fetchOrders(parker.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: oh_schist.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: voga.id});
  cart.is_cart = false;
  await updateOrder(cart);
  //let reviews = await fetchReviews();
  //let review = await createReview();
  //review.quantity++;
  //await createReview(review)
  //console.log(reviews)
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchReviews,
  createReview,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  editProduct,
  authenticate,
  findUserByToken,
  seed,
  client
};
