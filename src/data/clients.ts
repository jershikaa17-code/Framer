export interface ClientLogo {
  name: string
  image?: string
}

export const partnerLogos: ClientLogo[] = [
  { name: 'Aurelis', image: 'assets/clients/aurelis.svg' },
  { name: 'Lindholm', image: 'assets/clients/lindholm.svg' },
  { name: 'Taho', image: 'assets/clients/taho.svg' },
  { name: 'Wendrich', image: 'assets/clients/wendrich.svg' },
  { name: 'Obliqon', image: 'assets/clients/obliqon.svg' },
  { name: 'Logisync', image: 'assets/clients/logisync.svg' },
  { name: 'Monolith', image: 'assets/clients/monolith.svg' },
  { name: 'Numeriq', image: 'assets/clients/numeriq.svg' },
  { name: 'Vornberg', image: 'assets/clients/vornberg.svg' },
]

export const clientLogos: ClientLogo[] = partnerLogos
