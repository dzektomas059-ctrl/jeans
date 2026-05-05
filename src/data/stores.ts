export interface Store {
  city: string;
  count: number;
  address: string;
  hours: string;
}

export const stores: Store[] = [
  {
    city: 'Warsaw',
    count: 7,
    address: 'CH Galeria Mokotów, ul. Wołoska 12',
    hours: 'Mon–Sat 10:00–22:00 · Sun 10:00–21:00',
  },
  {
    city: 'Kraków',
    count: 4,
    address: 'Galeria Krakowska, ul. Pawia 5',
    hours: 'Mon–Sat 9:00–22:00 · Sun 10:00–21:00',
  },
  {
    city: 'Gdańsk',
    count: 3,
    address: 'Forum Gdańsk, ul. Targ Sienny 7',
    hours: 'Mon–Sat 10:00–22:00 · Sun 10:00–21:00',
  },
  {
    city: 'Wrocław',
    count: 3,
    address: 'Wroclavia, ul. Sucha 1',
    hours: 'Mon–Sat 10:00–22:00 · Sun 10:00–21:00',
  },
];
