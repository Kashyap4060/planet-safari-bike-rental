export interface Review {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

export const reviews: Review[] = [
  {
    name: 'Aditya',
    location: 'Bengaluru',
    rating: 5,
    text: 'Picked up a Classic 350 for a coast-to-Ghats weekend. Bike was spotless, paperwork took five minutes, and the deposit came straight back. Faultless.',
    date: 'March 2025',
  },
  {
    name: 'Sneha',
    location: 'Mumbai',
    rating: 5,
    text: 'Rented an Activa for three days around Panambur and Tannirbhavi. Booking over WhatsApp was so easy and the price was exactly what they quoted.',
    date: 'February 2025',
  },
  {
    name: 'Rahul',
    location: 'Hyderabad',
    rating: 5,
    text: 'The Duke 200 was an absolute blast on the Ghat roads. Helmet included, fuel was full, and they even shared a route map. Will rent again.',
    date: 'January 2025',
  },
  {
    name: 'Priya',
    location: 'Pune',
    rating: 4,
    text: 'Smooth Access 125 and friendly team at Hampankatta. Easy to find, no hidden charges. Wished pickup was a touch earlier but otherwise great.',
    date: 'December 2024',
  },
  {
    name: 'Karan',
    location: 'Delhi',
    rating: 5,
    text: 'Did a month-long rental on a Jupiter while working in Mangaluru. Monthly rate was very fair and the scooter never gave me a single issue.',
    date: 'November 2024',
  },
  {
    name: 'Meghana',
    location: 'Udupi',
    rating: 5,
    text: 'Local rider here — I still rent from Planet Safari when guests visit. Honest people, well-kept fleet, and they actually pick up the phone.',
    date: 'October 2024',
  },
  {
    name: 'Thomas',
    location: 'Kochi',
    rating: 5,
    text: 'Solo coastal trip on a Pulsar 220. Strong on the highway, comfortable for hours. Roadside assistance number was reassuring to have.',
    date: 'September 2024',
  },
  {
    name: 'Anjali',
    location: 'Goa',
    rating: 4,
    text: 'Clean scooty, transparent deposit, quick WhatsApp replies. Mangaluru is so much better explored on two wheels — this made it simple.',
    date: 'August 2024',
  },
]
