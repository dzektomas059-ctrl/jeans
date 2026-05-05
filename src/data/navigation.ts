export interface MegaColumn {
  title: string;
  /** Use color="muted" for "Guides & collections" style headings (gray, not bold red) */
  color?: 'brand' | 'muted' | 'default';
  links: { label: string; href: string; accent?: boolean }[];
}

export interface MegaPromo {
  title: string;
  eyebrow?: string;
  href: string;
  image: string;
  variant?: 'dark' | 'light';
}

export interface NavItem {
  label: string;
  href: string;
  accent?: boolean;
  mega?: {
    cols: MegaColumn[];
    promos?: MegaPromo[];
  };
}

export const navItems: NavItem[] = [
  {
    label: 'Women',
    href: '/women',
    mega: {
      cols: [
        {
          title: 'New',
          links: [
            { label: 'Jeans', href: '/jeans?new=1' },
            { label: 'Lingerie', href: '/women/new/lingerie' },
            { label: 'Socks', href: '/women/new/socks' },
            { label: 'Face masks', href: '/women/new/masks' },
          ],
        },
        {
          title: 'Tights',
          links: [
            { label: 'Classic', href: '/women/tights/classic' },
            { label: 'Corrective', href: '/women/tights/corrective' },
            { label: 'Fantasy', href: '/women/tights/fantasy' },
            { label: 'Tattoo', href: '/women/tights/tattoo' },
            { label: 'Openwork', href: '/women/tights/openwork' },
            { label: 'Wedding', href: '/women/tights/wedding' },
            { label: 'For expectant mothers', href: '/women/tights/maternity' },
            { label: 'Thin', href: '/women/tights/thin' },
            { label: 'Warm', href: '/women/tights/warm' },
            { label: 'Stockings', href: '/women/tights/stockings' },
            { label: 'Slimming shorts', href: '/women/tights/slimming' },
            { label: 'Limited collection', href: '/women/tights/limited' },
          ],
        },
        {
          title: 'Socks',
          links: [
            { label: 'Classic', href: '/women/socks/classic' },
            { label: 'Fantasy', href: '/women/socks/fantasy' },
            { label: 'Thin', href: '/women/socks/thin' },
            { label: 'Warm', href: '/women/socks/warm' },
            { label: 'New Year', href: '/women/socks/new-year' },
            { label: 'Knee-highs', href: '/women/socks/knee-highs' },
            { label: 'Elongated', href: '/women/socks/elongated' },
            { label: 'Short', href: '/women/socks/short' },
            { label: 'Footlets', href: '/women/socks/footlets' },
            { label: 'Sets of socks', href: '/women/socks/sets' },
            { label: 'Limited collection', href: '/women/socks/limited' },
          ],
        },
        {
          title: 'Lingerie',
          links: [
            { label: 'Bras', href: '/women/lingerie/bras' },
            { label: 'Cup F G H I J', href: '/women/lingerie/cups' },
            { label: 'Bustier', href: '/women/lingerie/bustier' },
            { label: 'Panties', href: '/women/lingerie/panties' },
            { label: 'Shirts', href: '/women/lingerie/shirts' },
            { label: 'Body', href: '/women/lingerie/body' },
            { label: 'Thermo underwear', href: '/women/lingerie/thermo' },
          ],
        },
        {
          title: 'Clothes for home and sleep',
          links: [
            { label: 'T-shirts and tops', href: '/women/home/tops' },
            { label: 'Peignoirs', href: '/women/home/peignoirs' },
          ],
        },
        {
          title: 'Clothing',
          links: [
            { label: 'Pullovers', href: '/women/clothing/pullovers' },
            { label: 'Blouses', href: '/women/clothing/blouses' },
            { label: 'T-shirts', href: '/women/clothing/tshirts' },
            { label: 'Dresses', href: '/women/clothing/dresses' },
            { label: 'Jumpsuits', href: '/women/clothing/jumpsuits' },
            { label: 'Bodies', href: '/women/clothing/bodies' },
            { label: 'Trousers', href: '/women/clothing/trousers' },
            { label: 'Footer clothing', href: '/women/clothing/footer' },
          ],
        },
        {
          title: 'Leggings',
          links: [
            { label: 'Classic', href: '/women/leggings/classic' },
            { label: 'Modeling', href: '/women/leggings/modeling' },
            { label: 'Sports', href: '/women/leggings/sports' },
            { label: 'Warm', href: '/women/leggings/warm' },
            { label: 'Trousers', href: '/women/leggings/trousers' },
            { label: 'Under the skin', href: '/women/leggings/under-skin' },
          ],
        },
        {
          title: 'Jeans',
          links: [
            { label: 'Straight Cut', href: '/jeans?fit=Straight' },
            { label: 'Mom Fit', href: '/jeans?fit=Mom' },
            { label: 'High rise', href: '/jeans?rise=high' },
            { label: 'Plus Size', href: '/jeans?design=Plus%20Size' },
            { label: 'Colored', href: '/jeans?colored=1' },
            { label: 'Push Up', href: '/jeans?fit=Skinny' },
            { label: 'Mid rise', href: '/jeans?rise=mid' },
            { label: 'Wide leg', href: '/jeans?fit=Wide%20leg' },
            { label: 'Flared', href: '/jeans?fit=Flared' },
            { label: 'Loose', href: '/jeans?fit=Loose' },
          ],
        },
        {
          title: 'Sale',
          color: 'brand',
          links: [
            { label: 'Clothing', href: '/sale/women/clothing' },
            { label: 'Jeans', href: '/jeans?sale=1' },
            { label: 'Leggings', href: '/sale/women/leggings' },
            { label: 'Lingerie', href: '/sale/women/lingerie' },
            { label: 'Tights', href: '/sale/women/tights' },
            { label: 'Socks', href: '/sale/women/socks' },
            { label: 'Clothes for home and sleep', href: '/sale/women/home' },
          ],
        },
        {
          title: 'Guides & Collections',
          color: 'muted',
          links: [
            { label: 'Wedding Day', href: '/guides/wedding' },
            { label: 'ContexLycra', href: '/guides/contexlycra' },
            { label: '#justtights', href: '/guides/justtights' },
            { label: 'Lingerie Guide', href: '/guides/lingerie' },
            { label: 'Tights Guide', href: '/guides/tights' },
            { label: 'LYCRA® Guide', href: '/guides/lycra' },
            { label: 'Limited Collection', href: '/guides/limited' },
            { label: 'Sport Collection', href: '/guides/sport' },
          ],
        },
      ],
      promos: [
        {
          eyebrow: 'Romance Collection',
          title: 'Spring in the Air',
          image: '/images/cat2.jpg',
          href: '/collections/romance',
          variant: 'light',
        },
        {
          eyebrow: 'Best socks',
          title: 'Best Friends, <em>Best Socks</em>',
          image: '/images/cat6.jpg',
          href: '/collections/best-socks',
          variant: 'dark',
        },
      ],
    },
  },
  {
    label: 'Men',
    href: '/men',
    mega: {
      cols: [
        {
          title: 'New',
          links: [
            { label: 'Jeans', href: '/jeans?cat=men' },
            { label: 'Pants', href: '/men/new/pants' },
          ],
        },
        {
          title: 'Socks',
          links: [
            { label: 'Footlets', href: '/men/socks/footlets' },
            { label: 'Short', href: '/men/socks/short' },
            { label: 'Classic', href: '/men/socks/classic' },
            { label: 'Colored', href: '/men/socks/colored' },
            { label: 'Thin', href: '/men/socks/thin' },
            { label: 'Warm', href: '/men/socks/warm' },
            { label: 'New Year', href: '/men/socks/new-year' },
            { label: 'Elongated', href: '/men/socks/elongated' },
            { label: 'Patterned', href: '/men/socks/patterned' },
          ],
        },
        {
          title: 'Pants',
          links: [
            { label: 'Boxer', href: '/men/pants/boxer' },
            { label: 'Trunks', href: '/men/pants/trunks' },
            { label: 'Slip', href: '/men/pants/slip', accent: true },
          ],
        },
        {
          title: 'Thermo underwear',
          links: [
            { label: 'Pantaloon', href: '/men/thermo/pantaloon' },
            { label: 'Singlet', href: '/men/thermo/singlet' },
          ],
        },
        {
          title: 'Shirts',
          links: [{ label: 'T-shirts', href: '/men/shirts/tshirts' }],
        },
        {
          title: 'Sale',
          color: 'brand',
          links: [
            { label: 'Jeans', href: '/jeans?cat=men&sale=1' },
            { label: 'Socks', href: '/sale/men/socks' },
            { label: 'Pants', href: '/sale/men/pants' },
            { label: 'Thermo underwear', href: '/sale/men/thermo' },
          ],
        },
      ],
      promos: [
        {
          eyebrow: 'Lifestyle',
          title: 'For any <em>occasion</em>',
          image: '/images/cat5.jpg',
          href: '/collections/men-lifestyle',
          variant: 'light',
        },
        {
          eyebrow: 'Underwear',
          title: 'Confident <em>choice</em>',
          image: '/images/cat3.jpg',
          href: '/collections/men-underwear',
          variant: 'dark',
        },
      ],
    },
  },
  {
    label: 'Girls',
    href: '/girls',
    mega: {
      cols: [
        {
          title: 'Tights',
          links: [
            { label: 'Classic', href: '/girls/tights/classic' },
            { label: 'Elegant', href: '/girls/tights/elegant' },
            { label: 'Thin', href: '/girls/tights/thin' },
            { label: 'Warm', href: '/girls/tights/warm' },
            { label: 'Funny legs', href: '/girls/tights/funny-legs' },
          ],
        },
        {
          title: 'Socks',
          links: [
            { label: 'Short', href: '/girls/socks/short' },
            { label: 'Classic', href: '/girls/socks/classic' },
            { label: 'Elegant', href: '/girls/socks/elegant' },
            { label: 'Warm', href: '/girls/socks/warm' },
            { label: 'New Year', href: '/girls/socks/new-year' },
            { label: 'Antislip', href: '/girls/socks/antislip' },
            { label: 'Funny legs', href: '/girls/socks/funny-legs' },
            { label: 'Knee-highs', href: '/girls/socks/knee-highs' },
          ],
        },
        {
          title: 'Leggings',
          links: [
            { label: 'Leggings', href: '/girls/leggings/all' },
            { label: 'Jeggings', href: '/girls/leggings/jeggings' },
            { label: 'Warm', href: '/girls/leggings/warm' },
          ],
        },
        {
          title: 'Clothing',
          links: [
            { label: 'Jumpers', href: '/girls/clothing/jumpers' },
            { label: 'Pants', href: '/girls/clothing/pants' },
          ],
        },
        {
          title: 'Sale',
          color: 'brand',
          links: [
            { label: 'Tights', href: '/sale/girls/tights' },
            { label: 'Socks', href: '/sale/girls/socks' },
          ],
        },
        {
          title: 'Guides',
          color: 'muted',
          links: [
            { label: 'Lookbook "Colour"', href: '/guides/girls-colour' },
            { label: 'All for School', href: '/guides/all-for-school' },
          ],
        },
      ],
    },
  },
  {
    label: 'Boys',
    href: '/boys',
    mega: {
      cols: [
        {
          title: 'Socks',
          links: [
            { label: 'Classic', href: '/boys/socks/classic' },
            { label: 'Sport', href: '/boys/socks/sport' },
            { label: 'Warm', href: '/boys/socks/warm' },
            { label: 'Funny legs', href: '/boys/socks/funny-legs' },
            { label: 'Antislip', href: '/boys/socks/antislip' },
          ],
        },
        {
          title: 'Pants',
          links: [
            { label: 'Boxer', href: '/boys/pants/boxer' },
            { label: 'Slip', href: '/boys/pants/slip' },
            { label: 'Sets', href: '/boys/pants/sets' },
          ],
        },
        {
          title: 'Thermo underwear',
          links: [
            { label: 'Pantaloon', href: '/boys/thermo/pantaloon' },
            { label: 'Singlet', href: '/boys/thermo/singlet' },
          ],
        },
        {
          title: 'Sale',
          color: 'brand',
          links: [
            { label: 'Socks', href: '/sale/boys/socks' },
            { label: 'Pants', href: '/sale/boys/pants' },
          ],
        },
      ],
    },
  },
  { label: 'Sale', href: '/sale', accent: true },
  { label: 'Promotions', href: '/promotions' },
];
